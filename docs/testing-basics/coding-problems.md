# 手撕代码高频题

测试开发工程师校招/实习必刷

---

## 一、二分查找

### 1. 标准二分查找

```java
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;  // 防止溢出
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

**易错点：**
- while 用 `<=` 不是 `<`，否则漏掉 left==right
- mid 用 `left + (right - left) / 2` 避免 (left+right) 溢出

### 2. 查找左边界（第一个 >= target）

```java
public int leftBound(int[] nums, int target) {
    int left = 0, right = nums.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] >= target) right = mid;
        else left = mid + 1;
    }
    return left;
}
```

### 3. 查找右边界（最后一个 <= target）

```java
public int rightBound(int[] nums, int target) {
    int left = 0, right = nums.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left - 1;
}
```

---

## 二、链表

### 1. 反转链表（迭代）

```java
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode cur = head;
    while (cur != null) {
        ListNode next = cur.next;  // 先保存下一个
        cur.next = prev;           // 反转指向
        prev = cur;                // prev 前进
        cur = next;                // cur 前进
    }
    return prev;
}
```

**三指针图解：**
```
初始: null <- 1    2 -> 3 -> null
       prev  cur  next

每轮把 cur.next 反过来指向 prev
```

### 2. 反转链表（递归）

```java
public ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) return head;
    
    ListNode newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}
```

### 3. 合并两个有序链表

```java
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode cur = dummy;
    
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    
    cur.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}
```

---

## 三、滑动窗口

### 无重复字符最长子串

```java
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> window = new HashMap<>();
    int left = 0, right = 0, maxLen = 0;
    
    while (right < s.length()) {
        char c = s.charAt(right);
        right++;
        window.put(c, window.getOrDefault(c, 0) + 1);
        
        // 有重复，收缩左边界
        while (window.get(c) > 1) {
            char d = s.charAt(left);
            left++;
            window.put(d, window.get(d) - 1);
        }
        
        maxLen = Math.max(maxLen, right - left);
    }
    return maxLen;
}
```

**滑动窗口通用模板：**
1. right 右移扩展窗口
2. 收缩左边界直到满足条件
3. 更新答案

---

## 四、LRU 缓存（高频！）

```java
class LRUCache {
    private Map<Integer, Node> cache = new HashMap<>();
    private Node head, tail;
    private int capacity;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        Node node = cache.get(key);
        moveToHead(node);
        return node.val;
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            node.val = value;
            moveToHead(node);
        } else {
            Node node = new Node(key, value);
            cache.put(key, node);
            addToHead(node);
            if (cache.size() > capacity) {
                Node removed = removeTail();
                cache.remove(removed.key);
            }
        }
    }
    
    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }
    
    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }
    
    private Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }
    
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
}
```

**为什么用双向链表：**
- 删除节点 O(1)（需要 prev 指针）
- 头部是最近使用的，尾部是最久未使用的

---

## 五、TOP 15 高频题列表

| 题目 | 难度 | 频率 |
|------|------|------|
| 两数之和 | 简单 | ⭐⭐⭐⭐⭐ |
| 反转链表 | 简单 | ⭐⭐⭐⭐⭐ |
| 合并两个有序链表 | 简单 | ⭐⭐⭐⭐ |
| 二分查找 | 简单 | ⭐⭐⭐⭐ |
| 无重复字符最长子串 | 中等 | ⭐⭐⭐⭐ |
| LRU 缓存 | 中等 | ⭐⭐⭐⭐ |
| 有效的括号 | 简单 | ⭐⭐⭐ |
| 最小栈 | 简单 | ⭐⭐⭐ |
| 二叉树层序遍历 | 中等 | ⭐⭐⭐ |
| 买卖股票最佳时机 | 简单 | ⭐⭐⭐ |
| 环形链表 | 简单 | ⭐⭐ |
| 删除链表倒数第N个 | 中等 | ⭐⭐ |
| 三数之和 | 中等 | ⭐⭐ |
| 最长回文子串 | 中等 | ⭐⭐ |
| 括号生成 | 中等 | ⭐⭐ |

---

## 六、刷题路线

**阶段一（1-2周）：数组、链表、字符串**
- LeetCode 1/704/206/876/21/88
- 每天 3-5 题

**阶段二（2-3周）：哈希表、二叉树、栈队列**
- LeetCode 1/146/104/102/20/155/739
- 每天 3-5 题

**阶段三（2-3周）：滑动窗口、动态规划入门**
- LeetCode 3/438/53/70/198
- 每天 2-3 题

**阶段四（持续）：综合练习**
- 剑指 Offer 全部 + LeetCode HOT 100
- 按类别刷，不要按题号顺序

---

## 面试技巧

1. 先和面试官确认题意（数据范围、边界条件）
2. 先说思路，再说复杂度，再写代码
3. 代码写完后，自己举例验证几个 case
4. 如果卡壳，可以从暴力解法开始，再优化
5. 面试重点考的不是难题，而是基础是否扎实
