---
title: K8s 入门：从「它是什么」到「我为什么需要它」
date: 2025-03-25
category: tech
tags: [Kubernetes, K8s, 容器, 运维]
cover: 🚀
readTime: 8
excerpt: 第一次听说 K8s 的时候，我觉得它是「运维的事」。但作为开发，理解 K8s 能帮你写出更好的代码……
---

# K8s 入门：从「它是什么」到「我为什么需要它」

我第一次接触 K8s，是因为一个 Bug。

生产环境的 Pod 因为内存溢出被杀掉了，服务中断了十分钟，我需要去排查原因。

那是我第一次真正去看 K8s 的日志、查看 Pod 状态、理解「OOMKilled」是什么意思。

**痛苦是最好的老师。**

## K8s 解决了什么问题

在理解 K8s 之前，先想想它在解决什么问题。

假设你有一个 Web 服务，跑在一台服务器上：

- 流量大的时候，你希望多跑几个实例；流量小的时候，缩回去节省资源
- 某个实例挂掉了，希望自动重启
- 更新版本的时候，希望不停机，滚动更新
- 多个服务之间要通信，需要服务发现

这些需求，手动管理很痛苦，K8s 就是来解决这些问题的。

## 几个核心概念

### Pod

Pod 是 K8s 里最小的部署单元，里面可以有一个或多个容器。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: app
    image: my-app:1.0.0
    resources:
      limits:
        memory: "512Mi"
        cpu: "500m"
```

### Deployment

Deployment 管理 Pod 的副本数量、更新策略等。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3  # 保持 3 个实例
  selector:
    matchLabels:
      app: my-app
  template:
    # Pod 的定义
```

### Service

Service 提供稳定的访问入口，将流量路由到 Pod。

因为 Pod 可能随时被销毁重建（IP 会变），Service 提供了一个稳定的 ClusterIP 或 DNS 名。

## 作为开发要了解的

K8s 不只是运维的事，作为开发你需要了解：

### 资源限制

```yaml
resources:
  requests:
    memory: "256Mi"   # 保证分配的资源
    cpu: "250m"
  limits:
    memory: "512Mi"   # 最多使用的资源
    cpu: "500m"
```

如果程序超过了 `limits.memory`，Pod 会被 OOMKilled。

**所以你需要：**
1. 了解你的程序正常运行时消耗多少内存
2. 合理设置 limits，不要太小（会被杀）也不要太大（浪费资源）
3. 关注 GC 的内存趋势，避免内存泄漏

### 优雅关闭

K8s 删除 Pod 的时候，会先发 `SIGTERM` 信号，然后等待一段时间（`terminationGracePeriodSeconds`，默认 30 秒），才发 `SIGKILL` 强杀。

在这个窗口期，你的程序应该：
- 停止接收新请求
- 处理完正在进行的请求
- 关闭数据库连接等资源

Spring Boot 支持优雅关闭，配置：

```yaml
server:
  shutdown: graceful
spring:
  lifecycle:
    timeout-per-shutdown-phase: 20s
```

### 健康检查

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 20
  periodSeconds: 5
```

`liveness`：探测失败会重启 Pod
`readiness`：探测失败会把 Pod 从 Service 里摘除（不接收流量）

---

K8s 是复杂的，但理解核心概念之后，你写代码时会自然考虑「这段代码在 K8s 环境里会不会有问题」。

**这种意识，是写「云原生友好」代码的基础。**
