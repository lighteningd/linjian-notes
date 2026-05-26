---
title: Spring Boot 3.x 迁移踩坑：那些「悄悄变了」的东西
date: 2026-03-20
category: tech
tags: [Spring Boot, Java 21, 迁移, 踩坑]
cover: 🌱
readTime: 8
excerpt: 从 Spring Boot 2.x 升级到 3.x，有些变化文档写得很清楚，有些「悄悄」就不一样了……这是我整理的迁移笔记。
---

# Spring Boot 3.x 迁移踩坑：那些「悄悄变了」的东西

公司项目从 Spring Boot 2.7 升级到 3.2，中间踩了不少坑。

这篇文章记录的是那些「文档没有明显说明，但实际上变了」的东西。

## 1. `javax.*` → `jakarta.*`

这是最广为人知的变化，但踩坑最多的也是这里。

Spring Boot 3.x 全面切换到 Jakarta EE 10，所有 `javax.*` 包改为 `jakarta.*`。

```java
// Spring Boot 2.x
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

// Spring Boot 3.x
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
```

**坑在哪里？** 如果你的项目依赖了某个老的三方库，而这个库还在用 `javax.*`，两者无法共存，会在运行时报 `ClassNotFoundException` 或类型不匹配。

**解决方案：** 检查每一个依赖的版本，确保它们都升级到了支持 Jakarta EE 的版本。

## 2. 安全配置写法变化

Spring Security 6.x 废弃了基于 `WebSecurityConfigurerAdapter` 的写法。

```java
// 旧写法（Spring Boot 2.x）
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/public/**").permitAll()
            .anyRequest().authenticated();
    }
}

// 新写法（Spring Boot 3.x）
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/public/**").permitAll()
            .anyRequest().authenticated()
        );
        return http.build();
    }
}
```

注意：`antMatchers` → `requestMatchers`，`authorizeRequests` → `authorizeHttpRequests`。

## 3. 循环依赖默认禁止

Spring Boot 3.x 默认禁止 Bean 之间的循环依赖。

如果你的项目里有循环依赖（A 依赖 B，B 依赖 A），启动时会直接报错。

**正确的做法是重构，消除循环依赖。**

临时方案是在配置里允许：

```yaml
spring:
  main:
    allow-circular-references: true
```

但这不是长期解法，只是给你时间重构。

## 4. Actuator 端点默认暴露范围缩小

Spring Boot 3.x 的 Actuator，默认只暴露 `health` 和 `info` 端点，其他端点需要显式开启。

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,loggers
```

## 5. 日志配置文件名变化

`logback-spring.xml` 依然可用，但如果你用的是 `log4j2`，注意配置文件的加载方式有细微变化。

---

## 总体建议

1. 先在分支上跑完所有单元测试，确认测试基线
2. 把依赖树导出来，逐个检查版本兼容性
3. 按模块逐步迁移，不要一次性全量更新
4. 特别关注 `javax → jakarta` 的传递依赖问题

---

迁移过程总是比预期要长，但 Spring Boot 3.x + JDK 21 的组合确实值得——虚拟线程、GraalVM 原生编译、更好的性能……

**投入产出比是正的，但做好一个月的「意外发现」的心理准备。**
