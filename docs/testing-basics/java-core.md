# Java核心技术面试题

> 测试开发工程师 Java 核心考察范围 | 基础 + 进阶 + 并发

---

## 一、Java 基础

- [1. Java 和 Python 的区别？Java 有什么特点？](#java-和-python-的区别-java-有什么特点)
- [2. 面向对象四大特性？](#面向对象四大特性)
- [3. 重载（Overload）和重写（Override）的区别？](#重载-overload-和重写-override-的区别)
- [4. String、StringBuilder、StringBuffer 的区别？](#string-stringbuilder-stringbuf)
- [5. try-catch-finally 中，如果 return 在 finally 之前执行，finally 还会执行吗？](#try-catch-finally-中-如果-return)
- [6. public、protected、default、private 的区别？](#public-protected-default-priva)
- [7. final、finally、finalize 的区别？](#final-finally-finalize-的区别)
- [8. 抽象类和接口的区别？](#抽象类和接口的区别)
- [9. == 和 equals() 的区别？](#和-equals-的区别)
- [10. hashCode() 和 equals() 的关系？](#hashcode-和-equals-的关系)
- [11. Java 是值传递还是引用传递？](#java-是值传递还是引用传递)
- [12. Object 类有哪些常用方法？](#object-类有哪些常用方法)
- [13. 什么是反射（Reflection）？应用场景？](#什么是反射-reflection-应用场景)
- [14. 什么是注解（Annotation）？常用的注解？](#什么是注解-annotation-常用的注解)

## 二、Java 进阶

- [1. List、Set、Map 的区别和常用实现类？](#list-set-map-的区别和常用实现类)
- [2. HashMap 为什么线程不安全？](#hashmap-为什么线程不安全)
- [3. 线程的创建方式？start() 和 run() 的区别？](#线程的创建方式-start-和-run-的区别)
- [4. synchronized 和 Lock 的区别？](#synchronized-和-lock-的区别)
- [5. 什么是死锁？如何避免？](#什么是死锁-如何避免)
- [6. volatile 关键字的作用？](#volatile-关键字的作用)
- [7. ThreadLocal 是什么？应用场景？](#threadlocal-是什么-应用场景)
- [8. 线程池的核心参数？线程池的工作流程？](#线程池的核心参数-线程池的工作流程)
- [9. JDK 常见的线程池有哪些？](#jdk-常见的线程池有哪些)
- [10. sleep() 和 wait() 的区别？](#sleep-和-wait-的区别)
- [11. 什么是守护线程（Daemon Thread）？](#什么是守护线程-daemon-thread)
- [12. 生产者和消费者模式如何实现？](#生产者和消费者模式如何实现)

## 三、JVM 与内存管理

- [1. JVM 内存区域划分？](#jvm-内存区域划分)
- [2. 什么是 OOM（OutOfMemoryError）？常见类型？](#什么是-oom-outofmemoryerror-常见类型)
- [3. Minor GC 和 Full GC 的区别？触发条件？](#minor-gc-和-full-gc-的区别-触发条件)
- [4. 常见的垃圾回收算法？](#常见的垃圾回收算法)
- [5. Java 内存泄漏（Memory Leak）和内存溢出的区别？](#java-内存泄漏-memory-leak-和内存溢出的区别)

---

## 一、Java 基础


## Java 和 Python 的区别？Java 有什么特点？

<details>
<summary><b>📖 点击查看答案</b></summary>
> Java 是编译型语言（.java -> 字节码 -> JVM），一次编译到处运行（平台无关）。Python 是解释型语言，直接运行源码。Java 特点：强类型 + 自动内存管理（GC）+ 面向对象 + 多线程内置支持 + 丰富的企业级生态。Python 优势是简洁高效，在 AI/数据领域生态强大。Java 适合大型企业级应用，Python 适合快速开发和数据科学。
</details>


## 面向对象四大特性？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 封装：把数据和方法包装在一起，隐藏内部细节，对外提供受控接口（如 private 属性 + public getter/setter）。继承：子类复用父类的属性和方法，是代码复用的重要手段。Java 是单继承，接口是多继承。抽象：抽取共性形成父类/接口，隐藏实现细节。多态：父类引用指向子类对象（运行时绑定），调用方法时实际执行子类版本。重写是多态的核心实现方式。
</details>


## 重载（Overload）和重写（Override）的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 重载：同一个类中，方法名相同但参数列表不同（个数、类型、顺序），发生在编译时。重写：子类重新定义父类方法，参数列表必须完全相同，发生在运行时（运行时多态）。应用：构造器重载支持多种初始化方式；方法重写是实现多态的基础。
</details>


## String、StringBuilder、StringBuffer 的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> String 是 final 类，拼接会产生新对象，效率低（每次都在堆中创建新对象）。StringBuilder 线程不安全，单线程性能最好。StringBuffer 线程安全（所有方法都用 synchronized 修饰），适合多线程，但性能稍低。在非多线程环境下，优先使用 StringBuilder。如果在循环中拼接字符串，绝对不要用 String。
</details>


## try-catch-finally 中，如果 return 在 finally 之前执行，finally 还会执行吗？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 会执行。finally 块在 return 之后、实际返回之前执行。如果 finally 中没有 return，返回值来自 finally 执行前的缓存（基本类型值不变，引用类型引用不变但属性可能变）。强烈建议不要在 finally 中使用 return，会吞掉异常。
</details>


## public、protected、default、private 的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> private：同类可见。default（不写修饰符）：同包可见。protected：同包可见 + 子类可见（即使在不同包也能继承访问）。public：全局可见。记忆口诀：private > default > protected > public（从严格到宽松）。
</details>


## final、finally、finalize 的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> final：修饰变量（变成常量）、方法（不能被重写）、类（不能被继承）。finally：try-catch-finally 中的 finally 块，无论是否异常都会执行，用于释放资源。finalize：Object 类的方法，在 GC 回收对象之前调用，不推荐使用（已被废弃）。
</details>


## 抽象类和接口的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 抽象类：用 abstract 修饰，可以有抽象方法和普通方法，有构造器，单继承。接口：用 interface 修饰，JDK 1.8+ 支持 default 和 static 方法，无构造器，多实现。一个类只能继承一个抽象类，但可以实现多个接口。接口更适合定义行为规范，抽象类更适合描述共性特征。
</details>


## == 和 equals() 的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> ==：比较基本类型时比较值，比较引用类型时比较引用地址。equals()：Object 默认实现等价于 ==，但 String、Integer 等类重写了 equals 方法来比较内容。在比较字符串和包装类时一定要用 equals()。
</details>


## hashCode() 和 equals() 的关系？

<details>
<summary><b>📖 点击查看答案</b></summary>
> hashCode()：返回对象的哈希值，用于 HashMap/HashSet 快速定位桶。equals()：比较对象是否相等。约定：两个对象 equals() 为 true，则 hashCode() 必须相同；但两个对象 hashCode() 相同，equals() 不一定为 true（哈希冲突）。重写 equals() 时必须同时重写 hashCode()，否则会导致哈希集合行为异常。
</details>


## Java 是值传递还是引用传递？

<details>
<summary><b>📖 点击查看答案</b></summary>
> Java 永远是值传递。对于基本类型，传递的是值的副本；对于引用类型，传递的是引用地址的副本（不是引用本身，也不是对象）。所以在方法内部无法改变外部引用指向的新对象，但可以通过这个引用副本修改对象的属性（如果对象本身是可变的）。
</details>


## Object 类有哪些常用方法？

<details>
<summary><b>📖 点击查看答案</b></summary>
> Object 是所有类的父类，常用方法：toString()（返回对象的字符串表示）、equals()（比较对象是否相等）、hashCode()（返回哈希值）、getClass()（获取类对象）、clone()（克隆对象，需实现 Cloneable 接口）、finalize()（垃圾回收前调用，不推荐）、wait()/notify()/notifyAll()（多线程协作，用于 synchronized 块中）。
</details>


## 什么是反射（Reflection）？应用场景？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 反射：在程序运行时动态获取类的信息（方法、属性、构造器）和动态调用对象方法的能力。通过 Class.forName() 或 obj.getClass() 获取 Class 对象。应用：Spring 依赖注入（AOP 动态代理）、JDBC 驱动加载、Jackson JSON 序列化、单元测试框架（JUnit 通过反射调用 @Test 方法）、IDE 的智能提示。
</details>


## 什么是注解（Annotation）？常用的注解？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 注解是一种元数据，为代码提供额外信息，不影响程序执行。常用注解：@Override（编译期检查方法是否重写）、@Deprecated（标记已废弃）、@SuppressWarnings（抑制编译器警告）、@FunctionalInterface（函数式接口标记）、@Test（JUnit 测试）、@Autowired（Spring 依赖注入）、@RestController（Spring MVC）。注解本身通过 @interface 定义，可使用反射读取。
</details>

## 二、Java 进阶


## List、Set、Map 的区别和常用实现类？

<details>
<summary><b>📖 点击查看答案</b></summary>
> List（列表）：有序、可重复，通过下标访问。ArrayList（数组，随机访问快）、LinkedList（链表，增删快）。Set（集合）：无序、不可重复。HashSet（哈希，最常用）、TreeSet（红黑树，有序）、LinkedHashSet（保持插入顺序）。Map（映射）：键值对，键不可重复。HashMap（最常用）、TreeMap（按键排序）、LinkedHashMap（保持插入顺序）。
</details>


## HashMap 为什么线程不安全？

<details>
<summary><b>📖 点击查看答案</b></summary>
> JDK 1.7 在 resize（扩容）时，多线程并发可能导致链表形成环形结构，引发死循环（CPU 100%）。JDK 1.8 虽然解决了死循环，但并发 PUT 时仍可能发生数据覆盖、丢失写入的问题。并发场景使用 ConcurrentHashMap。HashMap 的并发问题在生产环境中会导致数据丢失或死循环，是严重问题。
</details>


## 线程的创建方式？start() 和 run() 的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 方式：① 继承 Thread 类并重写 run()；② 实现 Runnable 接口（更常用，Java 单继承限制）；③ 实现 Callable 接口 + FutureTask（可获取返回值、可抛异常）。start() 真正启动新线程，由 JVM 调用 run()；直接调用 run() 只在当前线程顺序执行，不会创建新线程。线程启动后状态：NEW -> RUNNABLE -> BLOCKED/WAITING -> TERMINATED。
</details>


## synchronized 和 Lock 的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> synchronized 是 JVM 内置关键字，自动加锁释放锁，使用简单但粒度粗（锁对象/类）。Lock（ReentrantLock 实现）是接口，手动 unlock()，粒度细：可尝试获取锁（tryLock）、可设置公平锁/非公平锁、多条件 Condition。简单同步用 synchronized，复杂并发场景（超时、多条件、公平锁）用 Lock。
</details>


## 什么是死锁？如何避免？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 死锁：两个或多个线程相互持有对方需要的锁，形成循环等待。四个必要条件：互斥、占有并等待、非抢占、循环等待。避免方法：① 按固定顺序获取锁（最常用）；② tryLock 设置超时（tryLock(5, TimeUnit.SECONDS)）；③ 减少锁的持有时间；④ 使用并发工具（ConcurrentHashMap）替代共享锁；⑤ 使用银行家算法（理论上可避免，实际不常用）。
</details>


## volatile 关键字的作用？

<details>
<summary><b>📖 点击查看答案</b></summary>
> volatile 有两个作用：① 保证可见性：变量修改后立即刷新到主内存，其他线程能读到最新值（防止 CPU 缓存）；② 禁止指令重排序：编译器/CPU 可能对指令重排序优化，volatile 通过内存屏障防止重排序。volatile 不保证原子性（如 i++ 操作）。适用场景：状态标记变量、Double-Check Locking 单例模式。区别于 synchronized：volatile 更轻量，但不保证原子性。
</details>


## ThreadLocal 是什么？应用场景？

<details>
<summary><b>📖 点击查看答案</b></summary>
> ThreadLocal 为每个线程提供独立的变量副本，每个线程访问到的是自己的专属变量，不存在线程间竞争。应用场景：① 数据库连接管理（保证每个线程有自己的 Connection）；② 用户会话管理（每个线程处理不同用户的请求）；③ 日期格式化（SimpleDateFormat 非线程安全，用 ThreadLocal 保证线程安全）。使用完记得 remove()，否则可能导致内存泄漏。
</details>


## 线程池的核心参数？线程池的工作流程？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 七大参数：① corePoolSize（核心线程数）；② maximumPoolSize（最大线程数）；③ keepAliveTime（空闲线程存活时间）；④ TimeUnit（时间单位）；⑤ workQueue（任务队列，如 LinkedBlockingQueue）；⑥ threadFactory（线程工厂）；⑦ handler（拒绝策略）。工作流程：任务来 -> 核心线程处理 -> 队列满 -> 启动新线程直到 maxPoolSize -> 执行拒绝策略。拒绝策略：AbortPolicy（抛异常，默认）、CallerRunsPolicy（调用者执行）、DiscardPolicy（丢弃）、DiscardOldestPolicy（丢弃最老的）。
</details>


## JDK 常见的线程池有哪些？

<details>
<summary><b>📖 点击查看答案</b></summary>
> ① newFixedThreadPool：固定线程数，无界队列，可能积压任务导致 OOM。② newCachedThreadPool：线程数无上限（Integer.MAX_VALUE），适合短期异步任务，有oom风险。③ newSingleThreadExecutor：单线程顺序执行，保证任务顺序。④ newScheduledThreadPool：定时/周期性任务。阿里巴巴 Java 规范推荐使用 ThreadPoolExecutor 手动创建，根据任务特性合理设置参数，避免使用 Executors 工厂方法创建线程池。
</details>


## sleep() 和 wait() 的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> sleep() 是 Thread 类的静态方法，指定时间后自动唤醒，不释放锁（持有锁 sleep）。wait() 是 Object 类的方法，必须在 synchronized 块中使用，调用后会释放锁，进入该对象的等待队列，需要 notify()/notifyAll() 唤醒。sleep 用于暂停执行（保持锁），wait 用于线程间通信（释放锁）。
</details>


## 什么是守护线程（Daemon Thread）？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 守护线程是为用户线程提供服务的线程，当所有用户线程结束时，JVM 会自动退出，守护线程随之结束。特点：setDaemon(true) 必须在 start() 之前调用；守护线程 finally 块不一定执行。应用：JVM 垃圾回收（GC 线程）、日志后台刷新、心跳检测。可以通过 jstack 识别守护线程。Java 进程中的非守护线程全部结束时，进程就会退出。
</details>


## 生产者和消费者模式如何实现？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 实现方式：① wait()/notify()：在 synchronized 块中，生产者满时 wait()，消费者消费后 notify()。② BlockingQueue：ArrayBlockingQueue（数组有界）、LinkedBlockingQueue（链表有界/无界），put() 和 take() 自动阻塞。③ Lock + Condition：ReentrantLock 的 await()/signal()。④ Disruptor（高性能队列）。最常用的是 BlockingQueue，代码简洁且线程安全。
</details>

## 三、JVM 与内存管理


## JVM 内存区域划分？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 线程私有：① 程序计数器（当前字节码行号，线程切换后恢复）、② 虚拟机栈（方法调用栈帧，存储局部变量/操作数/动态链接）、③ 本地方法栈（Native 方法调用）。线程共享：④ 堆（对象实例和数组，GC 主要管理区域）、⑤ 方法区（类信息/常量/静态变量，JDK 1.8 后改用元空间 MetaSpace）。运行时常量池在方法区中。
</details>


## 什么是 OOM（OutOfMemoryError）？常见类型？

<details>
<summary><b>📖 点击查看答案</b></summary>
> OOM：JVM 内存不足时抛出的错误。常见类型：① OOM: Java heap space（堆空间不足，大量创建对象）；② OOM: GC overhead limit exceeded（GC 回收效率低）；③ OOM: Metaspace（元空间不足，类加载过多）；④ OOM: Unable to create new native thread（线程数过多，栈内存不足）；⑤ OOM: Direct buffer memory（NIO 直接内存溢出）。使用 jmap -heap、jstat、jvisualvm 等工具诊断。
</details>


## Minor GC 和 Full GC 的区别？触发条件？

<details>
<summary><b>📖 点击查看答案</b></summary>
> Minor GC（Young GC）：发生在新生代，对象在 Eden + Survivor 区之间移动，频率高、速度较快。触发条件：Eden 区满。Full GC：收集整个堆（包括老年代），频率低但耗时长，会Stop The World。触发条件：老年代空间不足、显式调用 System.gc()、元空间不足。频繁 Full GC 会严重影响系统性能。
</details>


## 常见的垃圾回收算法？

<details>
<summary><b>📖 点击查看答案</b></summary>
> ① 标记-清除（Mark-Sweep）：先标记存活对象，再清除未标记对象，产生内存碎片。② 复制算法（Copying）：将内存分为两块，存活对象复制到另一块，清理原块，适合新生代（Eden->Survivor 用的就是复制算法）。③ 标记-整理（Mark-Compact）：标记存活对象后，将存活对象向一端移动，解决碎片化问题，适合老年代。CMS（并发标记清除）和 G1（Garbage First）收集器是实际应用。
</details>


## Java 内存泄漏（Memory Leak）和内存溢出的区别？

<details>
<summary><b>📖 点击查看答案</b></summary>
> 内存泄漏：对象不再使用但无法被 GC 回收（因为有引用链存在），导致内存浪费，长时间积累导致 OOM。常见原因：① 静态集合类持有对象引用；② 未关闭的资源（数据库连接、Stream）；③ 监听器未注销；④ ThreadLocal 未 remove()。内存溢出（OOM）：对象创建时没有可用内存空间。内存泄漏的长期累积会导致 OOM。
</details>
