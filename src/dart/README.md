# Dart 语言特点
``` dart
// 1、单进程异步事件模式
// 2、强类型，可以类型推断
// 3、DartVM，具有极高的运行效率和优秀的代码运行优化
// 4、独立的隔离区（Isolate），可以实现多进程
// 5、面向对象编程，一切数据类型均派生自Object
// 6、运算符重载，泛型支持
// 7、强大的Future和Stream模型，可以简单实现高效的代码
// 8、Minix特性，可以更好的实现方法复用
// 9、全平台语言，可以很好的胜任移动和前后端的开发
// 10、在语法上，Dart提供了很多便捷的操作，可以明显减少代码量。如字符串拼接
```
``` javascript
const test1 = 'my name is ' + name + ' age is ' + age
const test2 = `my name is ${name} age is ${age}`
```
``` dart
String test = 'my name is $name, age is $age'
```

# 变量与常量
``` dart
// 常量
const c = 1 // 值不变，一开始就得赋值

// 变量
final f // 可以开始不赋值，只能赋值一次；
f = 2
var v1; // 初始值没有指定类型，a 为动态类型
v1 = 1
v1 = '2'
v1 = null
var v2 = 1 // 初始值指定值类型为number
v2 = 2 // 正确
v2 = 'fghjkl' // A value of type 'String' can't be assigned to a variable of type 'int'.
```
## dynamic ，var、object 三种类型的区别
``` dart
// dynamic: 所有dart 对象的基础类型，在大多数情况下，不直接使用它
// 通过它定义的变量会关闭类型检查，这意味着 dynamix x= 'hal'; x.foo();
// 这段代码静态类型检查不会报错，但是运行时会crash，因为 x 并没有 foo() 方法，所以建议大家在编程时不要直接使用dynamic；
// var: 是一个关键字，意思是"我不关心这里的类型是什么"，系统会自动判断类型 runtimeType;
// object: 是 Dart 对象的基类，当你定义 object o = xxx; 时这个时候系统会认为 o 是个对象，你可以调用 o 的 toString() 和 hashCode() 方法
// 因为 Object 提供了这些方法，但是如果你尝试调用 o.foo() 时，静态类型检查会运行报错。
// 综上不难看出 dynamic 与 object 的最大的区别是在静态类型检查上。
```
## final 和 const 类型的区别
``` dart
// final 只能在初始化时或后续赋值一次，之后值不可以修改
// const 只能在初始化时赋值一次，而且应该是在非运行时赋值
// 例如

int getNum() {
  return 1;
}

void main() {
  final a = getNum(); // 没问题
  // 或
  final b;
  b = getNum(); // 没问题

  const c = getNum(); // 报错
}
```

# 内置类型
### number 数字类型
```dart
// int 整数
// double 浮点数
// num 包含int和double
int a1 = 1
double a2 = 1.1
num a3 = 1

// int 类型可以通过 toDouble 转化为浮点数
print(a1.toDouble()) // 1.0
// double 类型可以通过 toInt 转化为整数
print(a2.toInt()) // 1.0
```
#### 属性
``` dart
int a = 2

```
#### num.parse 函数允许将数字字符串解析为整型
```dart
print(num.parse('10.9')) // 10.9
```