# React Hooks

### useState

#### React 使用 Object.is 比较算法 来比较 state

```javascript
const [count, setCount] = useState(0);
// 惰性state,只会在组件的初始渲染中起作用，后续渲染时会被忽略.例如接收props设置初始值
const [initial, setInitial] = useState(() => {
  return count + 200;
});
```

### useEffect

#### 用于生命周期

```javascript
useEffect(() => {
  // do someting
  return fn(); // 等价于 componentDidUnMount 里执行 fn 函数
}); // 等价于 componentDidMount + componentDidUpdate
useEffect(() => {
  // do someting
}, []); // 等价于 componentDidMount
```

#### 用于监听

```javascript
const [count, setCount] = useState(0);
useEffect(() => {
  // 渲染后执行
  // do someting
  return fn(); // 渲染前执行
}, [count]); // 监听count变化
```

### useLayoutEffect

#### DOM 变更之后同步调用 effect,类似 this.$nextPick()

```javascript
useLayoutEffect;
```

### useContext

#### 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

```javascript
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};
const ThemeContext = React.createContext(themes.light);
const ComponentA = () => {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme.background,
        color: theme.foreground,
      }}
    >
      I am styled by theme context!
    </button>
  );
};
const App = () => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <ComponentA />
    </ThemeContext.Provider>
  );
};
```

### useReducer

#### 类似 useState,用于处理更复杂的 state 变化

```javascript
const initialState = {
  count: 0,
};
const [state, dispatch] = useReducer((prevState, action) => {
  switch (action.type) {
    case "increment":
      return { count: prevState.count + 1 };
    case "decrement":
      return { count: prevState.count - 1 };
    default:
      throw new Error();
  }
}, initialState);
```

### useCallback

#### 性能优化,用于避免非必要渲染, useCallback 是缓存了函数自身

```javascript
const [count, setCount] = useState(0);
const incrementCount = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

### useMemo

#### 性能优化,用于避免在每次渲染时都进行高开销的计算, useMemo 是缓存了函数的返回值,类似 vue 里 computer

```javascript
const [count, setCount] = useState(0);
const memoCount = useMemo(() => {
  return count > 0;
}, [count]);
```

### useRef

#### ref 都懂

```javascript
const ComponentA = () => {
  const el = useRef(null);
  console.log(el.current); // null

  useEffect(() => {
    console.log(el.current); // div
  }, []);

  return <div ref={el}></div>;
};
```
