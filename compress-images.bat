@echo off
echo ========================================================
echo       Silence7c Image Compressor Tool
echo ========================================================
echo.
echo This tool scans your photography folder and automatically 
echo compresses any image larger than 2MB.
echo.

cd /d "%~dp0"
echo Running compression script...
node scripts/compress-images.cjs

echo.
echo Done.
pause
