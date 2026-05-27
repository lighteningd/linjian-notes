@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: ╔══════════════════════════════════════════════════════════╗
:: ║  林间笔记 - 一键部署脚本 (Windows)                      ║
:: ║  用法: deploy.bat [commit message]                       ║
:: ║  例如: deploy.bat 新增：日本旅行记                       ║
:: ╚══════════════════════════════════════════════════════════╝

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

:: 提交信息：有参数用参数，否则用默认值
if "%~1"=="" (
    set "COMMIT_MSG=deploy: update content"
) else (
    set "COMMIT_MSG=%~1"
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   🌲 林间笔记 一键部署
echo   📁 %PROJECT_DIR%
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

:: ── 1. 确保在 main 分支 ──────────────────────────────────
for /f %%i in ('git branch --show-current') do set "CURRENT_BRANCH=%%i"
if /i not "%CURRENT_BRANCH%"=="main" (
    echo [INFO] 当前分支为 %CURRENT_BRANCH%，切换到 main...
    git checkout main
    if errorlevel 1 goto :error
)

:: ── 2. 检查 node_modules ─────────────────────────────────
if not exist "node_modules\" (
    echo [INFO] 安装依赖...
    call npm install
    if errorlevel 1 goto :error
)

:: ── 3. 构建 ──────────────────────────────────────────────
echo.
echo [BUILD] 构建中...
call npm run build
if errorlevel 1 goto :error
echo [BUILD] ✅ 构建完成

:: ── 4. 提交 main 分支 ─────────────────────────────────────
echo.
echo [GIT] 提交源码到 main...
git add -A
git diff --cached --quiet
if errorlevel 1 (
    git commit -m "%COMMIT_MSG%"
    if errorlevel 1 goto :error
) else (
    echo [GIT] 无变更，跳过提交
)

git -c http.sslVerify=false -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push origin main
if errorlevel 1 goto :error
echo [GIT] ✅ main 推送完成

:: ── 5. 把 dist 复制到临时目录 ─────────────────────────────
echo.
echo [DEPLOY] 准备部署文件...
set "DEPLOY_TMP=%TEMP%\linjian-deploy-%RANDOM%"
if exist "%DEPLOY_TMP%" rmdir /s /q "%DEPLOY_TMP%"
mkdir "%DEPLOY_TMP%"
xcopy /e /i /h /y "dist\*" "%DEPLOY_TMP%\" >nul
echo [DEPLOY] 文件暂存完成

:: ── 6. 切换到 gh-pages，清空，复制新内容 ──────────────────
git checkout gh-pages
if errorlevel 1 goto :error

git rm -rf . >nul 2>&1

xcopy /e /i /h /y "%DEPLOY_TMP%\*" "." >nul
rmdir /s /q "%DEPLOY_TMP%" 2>nul

:: 清理不需要上传的目录
if exist "dist\" rmdir /s /q "dist\"
if exist "node_modules\" rmdir /s /q "node_modules\"

:: 确保 .nojekyll 存在
if not exist ".nojekyll" type nul > ".nojekyll"

:: 写入 .gitignore
(
echo node_modules/
echo dist/
echo .DS_Store
) > .gitignore

git add -A
git commit -m "deploy: %COMMIT_MSG%"
if errorlevel 1 goto :error

git -c http.sslVerify=false -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push origin gh-pages
if errorlevel 1 goto :error
echo [DEPLOY] ✅ gh-pages 推送完成

:: ── 7. 切回 main ──────────────────────────────────────────
git checkout main

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   🎉 部署完成！
echo   🌐 https://lighteningd.github.io/linjian-notes/
echo   ⏳ GitHub Pages CDN 刷新需 1-5 分钟
echo   💡 刷新页面: Ctrl+Shift+R
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
goto :end

:error
echo.
echo ❌ 部署失败，请查看上方错误信息
echo    当前分支: 
git branch --show-current
exit /b 1

:end
endlocal
