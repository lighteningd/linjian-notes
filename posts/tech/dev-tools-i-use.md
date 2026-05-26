---
title: 给自己的工具箱：那些真正提高效率的工具
date: 2025-07-20
category: tech
tags: [工具, 效率, 开发环境, 推荐]
cover: 🛠️
readTime: 6
excerpt: 工具很多，但真正用得上的没几个。这是我日常开发里真正在用、用了觉得「离不开」的那些……
---

# 给自己的工具箱：那些真正提高效率的工具

这篇文章不推荐大而全的「工具合集」，只推荐我**真正在用**、**觉得离不开**的工具。

## 编辑器 & IDE

### IntelliJ IDEA

Java 开发的不二之选，不多说。

几个我常用但不常见的功能：

- **`Alt+F7`（Find Usages）**：找到某个方法、字段的所有引用，重构前必用
- **`Shift+Shift`（Search Everywhere）**：全局搜索一切
- **Database 工具**：直接连数据库，执行 SQL，不用切换到其他工具
- **HTTP Client**：写 `.http` 文件，直接在 IDEA 里发请求，比 Postman 轻量很多

### VS Code / Trae

非 Java 项目用 VS Code/Trae，搭配：
- `GitLens`：代码行内显示最后一次提交信息，追踪历史非常方便
- `REST Client`：类似 IDEA HTTP Client，直接写请求文件

## 命令行工具

### ripgrep（rg）

比 grep 快很多的搜索工具。

```bash
# 在当前目录搜索包含 "PDType0Font" 的文件
rg PDType0Font

# 只搜索 Java 文件
rg PDType0Font --type java

# 输出文件名
rg -l PDType0Font
```

### fzf

模糊搜索神器，可以搜历史命令、搜文件。

```bash
# 历史命令搜索
Ctrl+R  # 配置后变成模糊搜索

# 文件搜索
vim $(fzf)
```

### jq

命令行解析 JSON，调试接口返回数据必备。

```bash
# 格式化输出
curl https://api.example.com/user/1 | jq .

# 提取某个字段
curl https://api.example.com/users | jq '.[].name'
```

## 接口测试

### Postman → Insomnia / IDEA HTTP Client

Postman 越来越重，越来越需要账号登录。

我现在主要用两个替代方案：

1. **IDEA 内置 HTTP Client**：写 `.http` 文件，可以提交到 Git，团队共享
2. **Insomnia**：比 Postman 轻量，界面清爽

### 示例 `.http` 文件

```http
### 登录获取 Token
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

### 获取用户信息（使用上一步的 token）
GET http://localhost:8080/api/users/me
Authorization: Bearer {{token}}
```

## 数据库

### DBeaver

免费的数据库客户端，支持几乎所有数据库。

比 Navicat 便宜（免费），比 DataGrip 轻量。

## 笔记 & 知识管理

### Obsidian

本地 Markdown 笔记，双链知识图谱。

我用它记：
- 踩坑记录
- 技术决策背景（为什么选了某个方案）
- 读书笔记
- 项目 FAQ

核心优势：文件在本地，不依赖任何服务，10 年后还能打开。

---

工具没有最好，只有最适合。

**找到适合自己工作方式的工具，然后真正掌握它——这比收藏 100 篇「最佳工具合集」有用得多。**
