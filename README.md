## WHAT IS REACT?

![react intro](./images/what-is-react/react-intro.png)

### React is based on components

![react is based on components](./images/what-is-react/based-on-components-1.png)

![react is based on components](./images/what-is-react/based-on-components-2.png)

### React is declarative

![react is declarative](./images/what-is-react/declarative.png)

- 我们使用一种叫做JSX的声明性语法来描述组件的外观和工作方式；

- 声明式：根据当前数据/状态，告诉React组件应该是什么样子；

- React是远离DOM的抽象，我们从来不碰DOM；

- JSX-结合HTML、CSS、JavaScript以及引用其他组件的语法；

### React is state-driven
![react is state-driven](./images/what-is-react/state-driven.png)

### React is JavaScript Library
![react is Javascript Library](./images/what-is-react/js-library.png)

### React was created by facebook

![react was created by facebook](./images/what-is-react/created-by-facebook.png)

### summary

![summary](./images/what-is-react/summary.png)



## THE TWO OPTIONS FOR SETTING UP A RECT PROJECT

![setting up a react project](./images/setting-up-a-react-project.png)

### create react app

```bash
npm install -g create-react-app // 全局安装 create-react-app

npx create-react-app my-app // 创建一个新的 React 项目
```

### Vite

```bash
npm create vite@latest my-react-app --template react
```

## COMPONENTS AS BUILDING BLOCKS
![components as building blocks](./images/components-as-building-blocks-1.png)

![components as building blocks](./images/components-as-building-blocks-2.png)

## WHAT IS JSX?

![jsx intro](./images/wtat-is-jsx/jsx-intro-1.png)
![jsx intro](./images/wtat-is-jsx/jsx-intro-2.png)
![jsx intro](./images/wtat-is-jsx/jsx-intro-3.png)

## Props

### Props 用于将数据从父组件传递到子组件（在组件树中向下）
![props](./images/props/props-1.png)


### 使用 Props 父组件可以控制子组件是如何工作和展示的，是配置和自定义组件的重要工具，就像函数的参数一样
![props](./images/props/props-2.png)


### 任何东西都可以作为 Props 传递：单个值、数组、对象、函数，甚至其他组件
![props](./images/props/props-3.png)

### 只读 Props are read-only
![props readonly](./images/props/read-only.png)

### 单向数据流 One-Way data flow
![one-way data flow](./images/props/one-way-data-flow.png)

## `<React.strictMode>`
`<React.strictMode>` 是 React 提供的一个工具组件，用于突出显示应用程序中的潜在问题。不会渲染任何可见的UI，而是对其内部的所有组件执行额外的检查和警告。

`<React.strictMode>`可以帮助发现以下问题: 
- 识别不安全的生命周期方法：在未来的 React 版本中，某些不安全的生命周期方法可能会被弃用。
- 关于副作用的警告：帮助你在组件挂载之前检测意外的副作用。
- 关于过时 API 的警告：提醒你使用过时的 API。
- 检测意外的副作用：确保组件在开发模式下不会产生意外的副作用。
- 检测遗留字符串 ref API 的使用：帮助你迁移到新的 ref API。
- 检测不稳定的 key：帮助你检测在列表中使用不稳定 key 的情况。


