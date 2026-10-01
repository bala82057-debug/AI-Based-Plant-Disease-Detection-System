@echo off
title PlantCare AI - Full Stack Launcher
echo =======================================================
echo          PlantCare AI - Launching Application
echo =======================================================
echo.

set PATH=C:\Program Files\nodejs;%LOCALAPPDATA%\Programs\Python\Python314;%LOCALAPPDATA%\Programs\Python\Python314\Scripts;%PATH%

echo [1/3] Setting up Python environment...
cd /d "%~dp0"
set PYTHONPATH=backend

echo [2/3] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "PlantCare AI Backend" cmd /k "py -3.14 -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 /nobreak >nul

echo [3/3] Starting React Vite Frontend on http://localhost:5173 ...
cd frontend
start "PlantCare AI Frontend" cmd /k "npm run dev -- --open"

echo.
echo Application started!
echo Frontend: http://localhost:5173
echo Backend API Docs: http://127.0.0.1:8000/docs
echo.
pause
