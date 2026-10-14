param(
    [int]$Port = 5173,
    [switch]$NoBrowser
)

$Root = $PSScriptRoot
if (-not $Root) { $Root = Get-Location }

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Warning "Port $Port could not be bound ($($_.Exception.Message)). Trying port 8080..."
    $Port = 8080
    $listener = New-Object System.Net.HttpListener
    $prefix = "http://localhost:$Port/"
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

$url = "http://localhost:$Port/"
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   Abhinav AV | AI & Data Science Portfolio" -ForegroundColor Green
Write-Host "   Server running at: $url" -ForegroundColor Yellow
Write-Host "   Press Ctrl+C to stop the server." -ForegroundColor Gray
Write-Host "==================================================" -ForegroundColor Cyan

if (-not $NoBrowser) {
    Start-Process $url
}

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".mjs"   = "application/javascript; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".webp"  = "image/webp"
    ".glb"   = "model/gltf-binary"
    ".gltf"  = "model/gltf+json"
    ".bin"   = "application/octet-stream"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($path)) {
            $path = "index.html"
        }

        $decodedPath = [System.Uri]::UnescapeDataString($path)
        $filePath = Join-Path $Root $decodedPath

        if (-not (Test-Path $filePath -PathType Leaf)) {
            $ext = [System.IO.Path]::GetExtension($decodedPath)
            if ([string]::IsNullOrEmpty($ext)) {
                $filePath = Join-Path $Root "index.html"
            }
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $contentType = $mimeTypes[$ext]
            }

            $response.ContentType = $contentType
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")

            try {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.StatusCode = 200
            } catch {
                $response.StatusCode = 500
            }
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $decodedPath")
            $response.ContentType = "text/plain"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }

        try {
            $response.OutputStream.Close()
        } catch {}
    }
} finally {
    $listener.Stop()
}
