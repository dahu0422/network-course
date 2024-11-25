#

## Cascade

级联：当多个规则应用于某个元素时，组合不同样式表并解决不同 CSS 规则和声明之间冲突的过程。

CSS 通常的来源有：Author 开发人员编写、User 用户自定义、Browser 浏览器默认声明。

重要程度排名：

1. User _!important_ declarations
2. Author _!important_ declarations
3. Author declarations
4. User declarations
5. Browser default

当重要程度相同时比较权重，权重排名：

1. Inline style
2. IDs
3. Classes、pseudo-classes、attribute selectors
4. Elements、pseudo-elements

权重的计算方式，按上面序号分别对应每一位数字(0, 0, 0, 0)

当权重相同时比较声明的先后顺序，后面的声明会覆盖前面声明的样式。

## 020 BEM 命名 和 sass 文件夹目录划分

## 033 响应式的四个原则
