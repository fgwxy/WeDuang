# 快手测试开发面经（按一二三面拆分 · 可背诵标准回答版）

---

# 一、一面（45~60 分钟 · 项目 + 基础 + 手撕代码）

## 1. 自我介绍

```
面试官好，我叫 XXX，XX 学校 XX 专业硕士/本科在读。

我有 X 段测试相关经历：
- 在 XX 公司实习期间，负责 XX 模块的功能测试和接口自动化测试
- 独立搭建过 pytest 接口自动化框架，编写用例 XX 条

技术栈方面，我熟悉 Python、MySQL、Redis，能独立编写测试脚本。
我对快手的业务和文化很认可，希望能加入快手。
```

---

## 2. MySQL 查询优化具体举例

```
1. 避免 SELECT *，只查需要的字段
2. WHERE 条件字段加索引，避免全表扫描
3. 分页优化：用子查询或 ID 范围分页，避免大偏移量
4. 避免在 WHERE 中对字段做函数运算
5. 用 EXPLAIN 分析查询计划
6. 批量插入替代单条 INSERT
```

---

## 3. 为什么索引能加快检索速度？

```
1. 索引底层是 B+ 树（或 Hash 索引）
2. B+ 树是多叉平衡树，查找次数 = 树的高度（一般 3~4 层）
3. 叶子节点存储所有数据，用双向链表连接，范围查询快
4. 没有索引需要全表扫描，时间复杂度 O(n) → O(log n)
```

---

## 4. 常见的测试方法

```
1. 黑盒测试：
   - 等价类划分：有效等价类、无效等价类
   - 边界值分析：边界上、边界附近
   - 因果图、场景法、错误猜测法

2. 白盒测试：
   - 语句覆盖、分支覆盖、路径覆盖

3. 其他：
   - 冒烟测试：只测核心流程
   - 回归测试：修复后重新验证
   - 性能测试、压力测试
```

---

## 5. 手撕代码：设计 LRU 缓存

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

---

## 6. 手撕代码：长度最小的子数组

```python
def minSubArrayLen(target, nums):
    left = 0
    total = 0
    min_len = float('inf')
    for right in range(len(nums)):
        total += nums[right]
        while total >= target:
            min_len = min(min_len, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if min_len == float('inf') else min_len
```

---

## 7. 移动端登录模块设计测试用例（淘宝登录）

```
【功能测试】
- 正常登录：账号+正确密码 → 登录成功
- 无效输入：空账号、空密码、错误密码、格式错误手机号
- 账号不存在

【边界值】
- 手机号位数：11 位格式验证
- 密码长度：最短/最长限制

【异常场景】
- 网络异常登录
- 账号被锁定
- 同一账号多设备登录

【安全性】
- 密码加密传输
- 登录失败次数限制
- 防止暴力破解

【兼容性】
- iOS/Android 不同版本
- 不同分辨率、不同网络环境（2G/4G/5G/WiFi）

【性能】
- 登录响应时间
- 并发登录
```

---

## 8. 单元测试、回归测试、白盒测试、黑盒测试的区别

```
单元测试：对软件的最小单元进行测试（如函数、方法）
         开发自己写，验证单个功能是否正确

回归测试：修复 Bug 后，重新执行之前通过过的用例，确保没引入新问题

白盒测试：基于代码内部逻辑进行测试，需要看源码
         语句覆盖、分支覆盖、路径覆盖

黑盒测试：不关心代码实现，只看输入输出
         从用户角度验证功能是否正确
```

---

## 9. 错误码及场景（404 / 400 / 502）

```
400 Bad Request：请求格式错误，参数不正确
404 Not Found：资源不存在，接口路径错误
502 Bad Gateway：网关错误，服务端上游服务异常
500 Internal Server Error：服务器内部错误
```

---

# 二、二面（45~60 分钟 · 项目深挖 + 技术深度）

## 1. 项目深挖：微服务项目的超卖问题

```
问题描述：
高并发下，多个请求同时查询库存，都读到「库存=1」，
然后都执行扣减，导致超卖。

解决方案：
1. 数据库层面：乐观锁（version 版本号），UPDATE SET stock=stock-1 WHERE id=? AND stock>0
2. Redis 层面：分布式锁，SETNX + 过期时间
3. 消息队列：下单请求进入 MQ，串行消费
```

---

## 2. 乐观锁与悲观锁

```
乐观锁：
- 认为并发冲突很少，读取时不加锁，更新时检查版本号
- 实现：加一个 version 字段，更新时 WHERE version=? AND version=version+1
- 适用：读多写少

悲观锁：
- 认为并发冲突很多，操作前就加锁
- 实现：SELECT ... FOR UPDATE
- 适用：写操作频繁
```

---

## 3. Redis 使用场景

```
1. 缓存热点数据：减轻数据库压力
2. 分布式锁：SETNX 实现
3. 排行榜：ZSET 有序集合
4. 消息队列：List 实现
5. 计数器：INCR/INCRBY
6. 验证码/Token 存储
7. 计数器：接口限流
```

---

## 4. 库和缓存一致性？更新失败怎么办？

```
1. Cache Aside（最常用）：
   - 读：先读缓存，缓存没有就读数据库，再写缓存
   - 写：先更新数据库，再删除缓存（不是更新缓存）

2. 更新失败时：
   - 重试机制（加延时重试队列）
   - 记录日志，人工处理
   - 用消息队列保证可靠性
```

---

## 5. JWT 令牌结构

```
JWT = Header.Payload.Signature

Header：算法（HS256）+ 类型（JWT）
Payload：用户信息（sub/用户ID）、过期时间（exp）、签发时间（iat）
Signature：用 Header 中的算法对前两部分签名，防篡改

项目中的使用：登录成功后生成 JWT，返回给前端，前端每次请求带在 Header 中
```

---

## 6. Spring Boot 自动配置原理

```
1. @SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan
2. spring.factories 文件记录了所有自动配置类
3. Spring Boot 启动时，@EnableAutoConfiguration 会扫描所有自动配置类
4. 根据条件注解（@ConditionalOnClass 等）判断是否启用
5. 用 @ConfigurationProperties 绑定配置文件中的属性
```

---

## 7. Java HashMap 底层原理（JDK 1.7 vs 1.8）

```
1.7：数组 + 链表（头插法）
     - 数组默认容量 16，负载因子 0.75
     - 扩容时重新 hash，链表反转，可能产生环形链表死循环

1.8：数组 + 链表/红黑树（尾插法）
     - 当链表长度 > 8 时转换为红黑树
     - 扩容时保持链表顺序，解决了死循环问题
     - 容量永远是 2 的幂次方
```

---

## 8. 秒杀场景测试用例设计

```
【功能测试】
- 正常秒杀：库存充足 → 秒杀成功 → 生成订单
- 库存不足 → 秒杀失败
- 重复秒杀：同一用户只能秒杀一次

【性能测试】
- 压测：模拟万人并发秒杀
- QPS：关注系统能承受的并发数
- TPS：关注每秒处理的事务数
- 响应时间：P99 在可接受范围内

【安全性】
- 接口幂等性：防止重复下单
- 超卖问题：最终库存不能为负
- 限流：防止刷单

【异常测试】
- 库存刚好卖完的瞬间
- 秒杀结束后继续点击
- 网络异常情况
```

---

## 9. 手撕代码：三数和最接近 target

```python
def threeSumClosest(nums, target):
    nums.sort()
    result = nums[0] + nums[1] + nums[2]
    for i in range(len(nums) - 2):
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if abs(total - target) < abs(result - target):
                result = total
            if total < target:
                left += 1
            else:
                right -= 1
    return result
```

---

# 三、三面（30~45 分钟 · 综合面 + 场景题）

## 1. 项目中最有挑战的问题

```
参考 STAR 法则：
- Situation：项目背景是什么
- Task：我负责什么
- Action：我具体做了什么（技术方案选型、遇到困难、如何解决）
- Result：最终效果（覆盖率提升、效率提升多少）
```

---

## 2. 两个文件合并（按字段匹配）

```python
# A 文件：三个字段 A1 A2 A3
# B 文件：两个字段 B1 B2，B2 和 A 中的 A2 匹配
# 合并到 C 文件：匹配的 A1 A2 A3 B1

def merge_files(file_a, file_b, file_c):
    # 读取 B 文件，建立 A2 -> B1 的映射
    b_map = {}
    for line in open(file_b):
        parts = line.strip().split()
        b_map[parts[1]] = parts[0]  # B2 -> B1

    # 遍历 A 文件，找匹配
    with open(file_c, 'w') as f:
        for line in open(file_a):
            parts = line.strip().split()
            a1, a2, a3 = parts[0], parts[1], parts[2]
            if a2 in b_map:
                f.write(f"{a1} {a2} {a3} {b_map[a2]}\n")
```

---

## 3. 如何评估自己的职业规划

```
1. 短期（1~2 年）：
   - 扎实掌握测试技术，能独立负责模块
   - 深入自动化测试、接口测试

2. 中期（3~5 年）：
   - 成为测试开发核心，能设计测试方案
   - 深入某一领域（性能测试、安全测试）

3. 长期：
   - 测试架构师或测试团队负责人
```

---

# 四、快手高频手撕代码汇总

| 题目 | 难度 | 出现频率 |
|------|------|---------|
| 设计 LRU 缓存 | ★★★ | ⭐⭐⭐⭐⭐ |
| 长度最小的子数组 | ★★★ | ⭐⭐⭐⭐ |
| 三数和最接近 target | ★★★ | ⭐⭐⭐⭐ |
| 反转字符串中的单词 | ★★ | ⭐⭐⭐ |
| 无重复字符最长子串 | ★★★ | ⭐⭐⭐ |
| 最长回文子串 | ★★★ | ⭐⭐⭐ |

---

# 五、快手面试特点总结

```
快手一面：项目 + MySQL优化 + 测试方法 + LRU + 手撕代码
重点：MySQL 索引原理要深入，项目细节要能讲清楚

快手二面：Redis + 并发 + 项目深挖 + 手撕代码
重点：并发问题（超卖、锁、缓存一致性）要有实战经验

快手三面：综合面 + 文件处理算法
重点：项目要有深度，算法要能写出来
```
