@echo off
echo ==============================================
echo   WeyBee-AI Setup Script (Install Only)
echo ==============================================
echo.

echo [1/2] Installing Backend Dependencies...
cd ..\backend
call npm install
cd ..\cmd_scripts

echo [2/2] Installing Frontend Dependencies...
cd ..\frontend
call npm install
cd ..\cmd_scripts

echo.
echo ==============================================
echo   Setup Complete! All dependencies installed.
echo   You can now run 'run.bat' to start the app.
echo ==============================================
pause
