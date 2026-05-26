---
title: 用 PDFBox 3.0 踩坑记：字体加载的前世今生
date: 2026-05-05
category: tech
tags: [Java, PDFBox, K8s, 字体]
cover: ⚙️
readTime: 10
excerpt: K8s 容器里的字体路径问题折腾了我两天，最后发现是 ClassLoader 的锅。记录下来，希望搜到这篇文章的你少走弯路……
---

# 用 PDFBox 3.0 踩坑记：字体加载的前世今生

这篇文章写于一次大约折腾了两天的 Bug 排查之后。

事情起因是：PRD 导出 PDF 功能，本地测试完全正常，部署到 K8s 容器之后，中文字体渲染全部失败——空白一片，或者显示为乱码方块。

## 表象

日志里的错误信息大概是这样的：

```
IOException: Font file not found: /app/fonts/simsun.ttc
```

但是我明明把字体文件打进了 JAR 包，也配置了挂载路径。

`ls /app/fonts/` 显示文件是存在的。

**文件存在，但程序说找不到——这就是问题的开始。**

## 排查过程

### 第一步：确认文件存在

```bash
kubectl exec -it <pod-name> -- ls -la /app/fonts/
```

输出显示 `simsun.ttc` 确实在，权限也没有问题（644）。

这排除了「文件不存在」的可能。

### 第二步：确认路径配置

我的字体加载代码大致是：

```java
String fontPath = config.getFontPath(); // 从配置读取
PDFont font = PDType0Font.load(document, new File(fontPath));
```

本地的 `fontPath` 是相对路径，容器里是绝对路径——这里有个问题：

**绝对路径 `/app/fonts/simsun.ttc` 是怎么来的？**

我用的是 `getClass().getClassLoader().getResourceAsStream()` 的方式，把字体文件打进了 resources 目录。

**问题来了：`getResourceAsStream` 返回的是 InputStream，而 `PDType0Font.load` 接受的是 `File` 对象。**

我在某个地方把 InputStream 转成了一个临时文件，然后取了这个临时文件的路径——但这个临时文件的创建逻辑，在容器里出了问题。

### 第三步：临时文件的坑

在容器里，临时文件的目录可能没有写权限，或者路径不对。

```java
// 问题代码
File tempFile = File.createTempFile("font", ".ttc");
// 在某些容器配置下，这里会失败
```

### 解决方案

改为直接使用 InputStream：

```java
InputStream fontStream = getClass().getClassLoader()
    .getResourceAsStream("fonts/simsun.ttc");
if (fontStream == null) {
    throw new RuntimeException("Font resource not found in classpath");
}
PDFont font = PDType0Font.load(document, fontStream, false);
```

注意最后的 `false` 参数——`embedSubset`。

如果设为 `true`（默认），PDFBox 会在关闭文档时才真正写入字体子集，需要保持 InputStream 打开；设为 `false` 会立即嵌入完整字体，更安全，但文件更大。

## 经验总结

1. **容器里永远用 ClassLoader + InputStream 加载资源**，不要依赖文件路径。
2. **`File.createTempFile` 在容器里不可靠**，除非你确认了临时目录权限。
3. **本地测试通过 ≠ 容器里通过**，资源加载路径是高频差异点。
4. **日志里的路径要看来源**，「找不到 /app/fonts/xxx」这个路径是从哪里来的？是 ClassLoader 解析出来的还是你自己拼的？

---

两天的折腾，最后改了不到十行代码。

**但这十行代码背后的理解，值得这两天。**
