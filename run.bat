@echo off
title Abhinav AV Portfolio
echo ==============================================
echo Starting Abhinav AV Portfolio Server...
echo ==============================================
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
