@echo off
echo ==============================================
echo   WeyBee-AI Full Stack Application Starter
echo ==============================================
echo.

echo Starting Servers...
echo.
echo Starting Backend API on http://localhost:5000 ...
start "WeyBee Backend (Port 5000)" cmd /c "cd ..\backend && node server.js"

timeout /t 3 /nobreak > nul

echo Starting Frontend on http://localhost:5173 ...
start "WeyBee Frontend (Vite)" cmd /k "cd ..\frontend && npm run dev"

echo.
echo ==============================================
echo   Both servers are booting up!
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:5173
echo.
echo ==============================================
pause
