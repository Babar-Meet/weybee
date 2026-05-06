@echo off
echo ==============================================
echo   WeyBee-AI Full Stack Application Starter
echo ==============================================
echo.

echo [1/3] Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo [2/3] Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo [3/3] Starting Servers...
echo.
echo Starting Backend API on http://localhost:5000 ...
start "WeyBee Backend (Port 5000)" cmd /c "cd backend && node server.js"

timeout /t 3 /nobreak > nul

echo Starting Frontend on http://localhost:5173 ...
start "WeyBee Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo ==============================================
echo   Both servers are booting up!
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:5173
echo.
echo   Default Admin Login:
echo   Email: admin@weybee.com
echo   Password: admin123
echo ==============================================
echo.
pause
