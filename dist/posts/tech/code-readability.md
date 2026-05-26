---
title: 聊聊我理解的「代码可读性」
date: 2025-11-25
category: tech
tags: [代码质量, 可读性, 工程实践, 思考]
cover: 💻
readTime: 7
excerpt: 「代码是写给人看的，附带让机器执行」。可读性不是风格偏好，而是一种工程责任……
---

# 聊聊我理解的「代码可读性」

我刚工作的时候，有一个错误的认知：

**「只要逻辑是对的，代码写成什么样都行。」**

然后有一天，我去看三个月前自己写的代码，花了半小时才搞明白这段逻辑在做什么。

**那一刻我理解了：代码的第一读者，往往是未来的自己。**

## 什么是「可读性」

可读性不等于「注释多」，也不等于「命名长」。

我的理解是：**读到代码的人，能以最小的认知成本，理解它在做什么。**

这个定义有两个关键词：

1. **认知成本**：需要多少「脑力」来理解它
2. **读到代码的人**：包括未来的自己、团队成员、甚至 AI 助手

## 几个具体的实践

### 命名要说明「意图」，不只是「实现」

```java
// 差：说的是实现
int d = 7;
List<User> list = getUsersByCondition(type, status);

// 好：说的是意图
int SESSION_EXPIRE_DAYS = 7;
List<User> activeAdminUsers = getActiveAdminUsers();
```

### 方法要「短而专注」

一个方法只做一件事。如果你在写注释「第一步…第二步…第三步」，通常意味着该把这些步骤拆成单独的方法了。

```java
// 差：一个方法做了太多事
public void processOrder(Order order) {
    // 验证订单
    if (order.getAmount() <= 0) throw new IllegalArgumentException("...");
    // 扣减库存
    inventory.deduct(order.getItems());
    // 创建支付记录
    Payment payment = createPayment(order);
    // 发送通知
    notificationService.sendOrderConfirmation(order);
}

// 好：拆分职责
public void processOrder(Order order) {
    validateOrder(order);
    deductInventory(order);
    Payment payment = createPayment(order);
    sendConfirmationNotification(order);
}
```

### 「否定逻辑」要谨慎

```java
// 差：双重否定，需要转换才能理解
if (!isNotExpired(user)) { ... }

// 好：直接表达
if (isExpired(user)) { ... }
```

### 「魔法数字」都应该命名

```java
// 差：3 是什么？为什么是 3？
if (retryCount > 3) throw new MaxRetryException();

// 好：意图清晰
private static final int MAX_RETRY_ATTEMPTS = 3;
if (retryCount > MAX_RETRY_ATTEMPTS) throw new MaxRetryException();
```

## 关于注释

注释的最大作用，不是解释「代码在做什么」，而是解释「为什么这么做」。

```java
// 不好的注释：重复代码信息
// 将用户状态设置为 INACTIVE
user.setStatus(UserStatus.INACTIVE);

// 好的注释：解释「为什么」
// 用户超过 30 天未登录，按安全策略将账号设为非活跃
// 参考：安全规范 v2.3，第4节
user.setStatus(UserStatus.INACTIVE);
```

## 一个衡量标准

我用来判断代码可读性的一个粗糙标准：

**把这段代码给一个刚加入团队的工程师看，他需要多少时间，能开始参与这部分的工作？**

这个时间越短，可读性越好。

---

可读性是一种投资。

写的时候多花一点时间，读的时候节省的是所有人的时间——你的、同事的、未来接手的人的。

**代码的生命周期，往往比你预期的要长很多。**
