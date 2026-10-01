# PlantCare AI - PowerShell Launcher
Write-Host "=======================================================" -ForegroundColor Green
Write-Host "          PlantCare AI - Launching Application         " -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Green

$env:PATH = "C:\Program Files\nodejs;$env:LOCALAPPDATA\Programs\Python\Python314;$env:LOCALAPPDATA\Programs\Python\Python314\Scripts;" + $env:PATH
$env:PYTHONPATH = "backend"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "`n[1/2] Starting FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root'; `$env:PYTHONPATH='backend'; py -3.14 -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

Start-Sleep -Seconds 3

Write-Host "[2/2] Starting React Vite Frontend on http://localhost:5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; `$env:PATH = 'C:\Program Files\nodejs;' + `$env:PATH; & 'C:\Program Files\nodejs\npm.cmd' run dev -- --open"

Write-Host "`nPlantCare AI is running!" -ForegroundColor Green
Write-Host "Frontend URL: http://localhost:5173" -ForegroundColor White
Write-Host "Backend Docs: http://127.0.0.1:8000/docs" -ForegroundColor White
