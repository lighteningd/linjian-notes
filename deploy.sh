#!/usr/bin/env bash
# ╔══════════════════════════════════════════════════════════╗
# ║  林间笔记 - 一键部署脚本                                 ║
# ║  用法: bash deploy.sh [commit message]                   ║
# ║  例如: bash deploy.sh "新增：日本旅行记"                  ║
# ╚══════════════════════════════════════════════════════════╝

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMIT_MSG="${1:-deploy: update content}"

cd "$PROJECT_DIR"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌲 林间笔记 一键部署"
echo "  📁 项目目录: $PROJECT_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── 1. 检查当前分支 ───────────────────────────────────────
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  当前分支为 $CURRENT_BRANCH，切换到 main..."
  git checkout main
fi

# ── 2. 检查 node_modules ─────────────────────────────────
if [ ! -d "node_modules" ]; then
  echo "📦 安装依赖..."
  npm install
fi

# ── 3. 构建 ──────────────────────────────────────────────
echo ""
echo "🔨 构建中..."
npm run build
echo "✅ 构建完成"

# ── 4. 提交 main 分支 ─────────────────────────────────────
echo ""
echo "📤 提交源码到 main..."
git add -A
if git diff --cached --quiet; then
  echo "  （无变更，跳过提交）"
else
  git commit -m "$COMMIT_MSG"
fi

GIT_SSL_NO_VERIFY=1 git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push origin main
echo "✅ main 推送完成"

# ── 5. 部署到 gh-pages ────────────────────────────────────
echo ""
echo "🚀 部署到 gh-pages..."

# 把 dist 内容暂存到临时目录
DEPLOY_TMP="/tmp/linjian-deploy-$$"
rm -rf "$DEPLOY_TMP"
mkdir -p "$DEPLOY_TMP"
cp -r dist/. "$DEPLOY_TMP/"

# 切换到 gh-pages，清空，复制新内容
git checkout gh-pages
git rm -rf . > /dev/null 2>&1 || true

cp -r "$DEPLOY_TMP"/. .
rm -rf dist node_modules "$DEPLOY_TMP"

# 确保 .nojekyll 和 .gitignore 存在
touch .nojekyll
cat > .gitignore << 'EOF'
node_modules/
dist/
.DS_Store
EOF

git add -A
git commit -m "deploy: $COMMIT_MSG"

GIT_SSL_NO_VERIFY=1 git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 push origin gh-pages
echo "✅ gh-pages 推送完成"

# ── 6. 切回 main ──────────────────────────────────────────
git checkout main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎉 部署完成！"
echo "  🌐 https://lighteningd.github.io/linjian-notes/"
echo "  ⏳ GitHub Pages CDN 刷新需 1-5 分钟"
echo "  💡 刷新页面: Ctrl+Shift+R"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
