---
title: MySQL JSON 字段：用还是不用？
date: 2025-09-15
category: tech
tags: [MySQL, JSON, 数据库设计, 性能]
cover: 🗄️
readTime: 7
excerpt: JSON 字段灵活方便，但什么时候该用，什么时候坚决不用？这是一道需要权衡的工程题……
---

# MySQL JSON 字段：用还是不用？

项目里用了不少 MySQL 的 JSON 字段，用起来确实方便——不用每次加字段都去改表结构。

但用着用着，有些问题慢慢浮现出来。

这篇文章是我对「什么时候用 JSON 字段」这个问题的思考。

## JSON 字段的优势

### 1. 灵活性高

不需要预先定义所有字段，结构可以随需求变化。

对于一些「属性集合不固定」的场景，比如商品的扩展属性、配置项、标签等，用 JSON 存储比加一堆可为空的列要清爽得多。

### 2. MySQL 5.7+ 支持 JSON 函数

```sql
-- 查询 JSON 字段里的值
SELECT JSON_EXTRACT(config, '$.theme') AS theme FROM user_settings;

-- 更新 JSON 字段的某个 key
UPDATE user_settings 
SET config = JSON_SET(config, '$.theme', 'dark') 
WHERE user_id = 1;

-- 基于 JSON 字段筛选
SELECT * FROM products 
WHERE JSON_EXTRACT(attributes, '$.color') = 'red';
```

## JSON 字段的问题

### 1. 索引限制

JSON 字段本身不能加索引，需要用生成列（Generated Column）的方式间接创建索引：

```sql
ALTER TABLE products 
ADD COLUMN color VARCHAR(50) GENERATED ALWAYS AS 
    (JSON_UNQUOTE(JSON_EXTRACT(attributes, '$.color'))) VIRTUAL;

CREATE INDEX idx_color ON products(color);
```

这个方式可以用，但增加了维护成本。

**如果某个 JSON 里的字段经常被用于查询过滤，应该考虑把它提出来作为独立列。**

### 2. 数据完整性弱

MySQL 不会对 JSON 字段里的数据结构做任何约束。

你存进去的可以是 `{"color": "red"}`，也可以是 `{"colour": "red"}`（注意拼写错误），甚至是 `null`——数据库不会报错。

数据一致性要靠应用层保证，这是一个隐患。

### 3. 查询性能

JSON 字段的查询，通常比普通列查询慢，因为需要解析 JSON 字符串。

数据量小的时候感觉不出来，数据量大了会成为性能瓶颈。

### 4. 可读性和可维护性

随着业务发展，JSON 字段里可能塞进越来越多的东西，导致字段越来越「肥」，后来者很难理解哪些 key 是有用的、哪些是废弃的。

## 我的判断标准

**适合用 JSON 字段的场景：**

- 属性集合真的不固定，且未来变化频繁（如：不同类型商品的属性）
- 纯配置类数据，读多写少，不需要按 JSON 内部字段做条件查询
- 原型阶段，需求还不稳定，后续再规范化

**不适合用 JSON 字段的场景：**

- 需要频繁按 JSON 内的字段做查询、排序、聚合
- 数据量大，对性能敏感
- 需要强数据完整性约束
- 字段有明确语义，未来不会变（直接加列更清晰）

## 一个实际案例

我们项目有一个 `prd_list_config` 表，里面有个 JSON 字段存放列表配置，结构大概是：

```json
{
  "columns": [...],
  "filters": [...],
  "sorts": [...]
}
```

这个场景很适合 JSON：
- 不同的列表有完全不同的列配置
- 这个字段作为整体被读取、整体被更新
- 不需要按配置内部字段做查询

但另一个场景，`chg_log` 表里有个 JSON 字段存放变更详情，随着业务发展这个字段越来越臃肿，后来有人要按「变更操作类型」做统计，只能扫全表解析 JSON……

**这就是没有提前考虑查询模式，导致的性能问题。**

---

**总结一句话：JSON 字段是工具，不是习惯。每次用之前，问自己：这个数据将来会被怎么查询？**
