# Linux与Shell必会命令

> 测试开发日常高频命令速查 + 面试重点问题

---

## 一、常用命令速查表

| 场景 | 命令 |
| --- | --- |
| 查看日志关键字 | `grep "ERROR" app.log \| head -20` |
| 实时跟踪日志（动态） | `tail -f app.log` |
| 查看日志后 N 行 | `tail -100 app.log` |
| 查看进程 | `ps -ef \| grep java` |
| 查看进程（详细） | `ps aux \| grep java` |
| 杀掉进程 | `kill -9 PID` |
| 查看磁盘使用 | `df -h` |
| 查看内存 | `free -h` |
| 查看端口占用 | `netstat -tlnp \| grep 8080` |
| 查看端口（更详细） | `lsof -i :8080` |
| CPU/内存排名 | `top`（按 M 降序，按 1 查看多核，按 q 退出） |
| 查找文件 | `find / -name "*.log" -mtime -7` |
| 查找大文件 | `find / -size +100M` |
| 查看文件行数 | `wc -l app.log` |
| 压缩/解压 tar.gz | `tar -czvf file.tar.gz dir/` / `tar -xzvf file.tar.gz` |
| 压缩/解压 zip | `zip -r file.zip dir/` / `unzip file.zip` |
| 远程拷贝文件 | `scp localfile user@host:/path` |
| SSH 远程连接 | `ssh user@host` |
| 查看网络连接 | `netstat -an \| grep ESTABLISHED` |
| 查看网络统计 | `netstat -s` |
| 查看系统负载 | `uptime` |
| 查看 inode 使用 | `df -i` |
| 查看磁盘 I/O | `iostat -x 1` |
| 查看用户登录记录 | `last` |
| 查看历史命令 | `history \| grep java` |
| 查看文件类型 | `file filename` |
| 查看文件修改时间 | `stat filename` |
| 创建软链接 | `ln -s /path/to/file linkname` |
| 查看系统时间 | `date` |
| 修改文件权限 | `chmod 755 file` |
| 修改文件所有者 | `chown user:group file` |

---

## 二、面试高频问题

### 1. Linux 如何排查 Java 服务 CPU 100% 的问题？

**答案：**
1. `top` 定位 CPU 占用最高的进程 PID（按 P 降序）
2. `top -Hp PID` 找到高负载线程 ID（转为十六进制）
3. `jstack PID > stack.txt` 导出线程堆栈
4. `grep -A 5 "0x{十六进制线程ID}" stack.txt` 搜索，定位到具体代码行
5. 常见原因：死循环、频繁 GC、频繁正则匹配、频繁 FULL GC、锁等待

> 💡 **技巧：** JVM 生产问题排查标准套路：top -> jstack -> 定位代码

---

### 2. Linux 如何排查内存泄漏？

**答案：**
1. `free -m` 查看内存使用情况（total/used/free）
2. `top` 按内存排序（按 M）找到高内存进程 PID
3. `jmap -heap PID` 查看堆内存使用详情（新生代/老年代/survivor 区）
4. `jmap -histo PID | head -30` 查看对象数量和内存占用排名
5. 如果内存持续增长，可能是内存泄漏（对象无法被回收），dump 堆内存文件（`jmap -dump:format=b,file=heap.hprof PID`）用 MAT/JProfiler 分析

---

### 3. 写一个 Shell 脚本统计日志中 ERROR 数量，并输出最近 5 条错误？

**答案：**

```bash
#!/bin/bash

echo "ERROR 总数：$(grep -c "ERROR" app.log)"
echo "最近 5 条 ERROR："
grep "ERROR" app.log | tail -5
echo "各错误类型统计（Top10）："
grep "ERROR" app.log | awk '{print $5}' | sort | uniq -c | sort -rn | head -10
echo "各小时错误分布："
grep "ERROR" app.log | awk '{print $2}' | cut -d: -f1 | sort | uniq -c
```

> 💡 **技巧：** Shell 三剑客：grep 过滤、awk 提取列、sort 排序、uniq 去重

---

### 4. 如何查看 Linux 系统负载？如何判断系统是否过载？

**答案：**
使用 `uptime` 或 `top` 查看系统负载（load average）：三个数字分别代表 1分钟/5分钟/15分钟的平均负载。

**判断标准：** 负载数值 / CPU 核心数 < 1 为正常。如果 4 核 CPU 负载为 4.0，说明 CPU 刚好满载。超过核心数说明有进程在排队等待 CPU。

`uptime` 输出示例：`load average: 0.52, 0.58, 0.59` 表示轻度负载，运行正常。

---

### 5. 硬链接和软链接的区别？

**答案：**
- **硬链接**：多个文件名指向同一个 inode（磁盘存储位置），不能跨文件系统，不能链接目录，删除一个硬链接其他链接仍有效
- **软链接（符号链接）**：创建新的 inode，存储目标文件的路径，类似 Windows 快捷方式，可以跨文件系统，可以链接目录，删除源文件软链接就失效了（变成死链接）

面试常问：软链接用 `ln -s`，删除源文件软链接失效。

---

### 6. 如何排查网络连接问题？

**答案：**
1. `ping 目标地址`（检测网络是否通）
2. `telnet host port`（检测端口是否通）
3. `curl -v url`（查看 HTTP 请求详情，包括 SSL 证书）
4. `netstat -tlnp | grep port`（检查端口监听状态）
5. `netstat -an | grep ESTABLISHED`（查看已建立的连接）
6. `traceroute host`（路由追踪，看数据包经过哪些节点）
7. `dig/nslookup domain`（DNS 解析）
8. `ss -s`（更现代的 socket 统计，比 netstat 快）

---

### 7. 进程和线程的区别？

**答案：**
- **进程**是资源分配的基本单位，拥有独立的地址空间（内存/文件句柄/信号）
- **线程**是 CPU 调度的基本单位，同一进程的线程共享进程的地址空间
- 进程切换开销大（需要切换页表、切换内核态），线程切换开销小（共享页表）
- 线程共享进程资源：堆内存、文件句柄、信号
- 线程私有：栈、程序计数器、寄存器

Java 中 main 方法就是主线程。

---

### 8. 常用的系统监控命令？

**答案：**
- `top`：实时 CPU/内存使用率
- `vmstat`：系统整体资源（CPU/内存/IO）
- `iostat`：磁盘 I/O 情况
- `netstat/ss`：网络连接统计
- `free -h`：内存使用
- `df -h`：磁盘使用
- `uptime`：系统负载
- `mpstat`：多核 CPU 详情
- `dstat`：综合统计（整合 vmstat/iostat/netstat）
- `sar`：历史数据收集（需开启 sa 服务）

---

### 9. 如何排查磁盘空间不足？

**答案：**
1. `df -h` 查看各分区使用情况（Filesystem / Use% 列）
2. `du -sh /*` 查看根目录下各目录占用（从大到小排序）
3. `du -h --max-depth=1 /path` 限制层级
4. `find / -type f -size +100M -exec ls -lh {} \;` 找到大文件
5. 如果 `/dev/sda1` 100% 了，常见原因：日志文件过大（logs/）、core dump 文件、临时文件（/tmp）、消息队列文件

清理后记得检查是否还在写：`lsof +L1`

---

### 10. Linux 的管道符 | 是什么？有什么作用？

**答案：**
管道符 `|` 将前一个命令的输出（stdout）作为后一个命令的输入（stdin），实现命令组合。

**常见用法：**
- `ps -ef | grep java`（从进程列表中过滤 java）
- `cat log | grep ERROR`（从日志中过滤错误）
- `awk '{print $1}' file`（打印第一列）
- `sort | uniq -c`（排序并统计重复）
- `head -10 | tail -5`（取第6-10行）

每个命令各司其职，通过管道组合完成复杂操作。