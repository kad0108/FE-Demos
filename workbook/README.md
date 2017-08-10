# workbook [demo](http://kad0108.github.io/FE-Demos/workbook/dist/)

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install
npm install -D vue-router vuex marked highlight.js
// -D 和 --save-dev 等效，marked是markdown 语法转换工具库，highlight.js代码高亮插件

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

```
├── App.vue //初始化工作，以及挂载路由的router-view组件
├── assets //静态资源文件
│   └── darkness.css //暗黑风stylesheet
├── components  //组件放在这儿
│   ├── rawEditor.vue //markdown 文本编辑器组件
│   ├── renderEditor.vue //渲染后的展示组件
│   └── 404.vue // 除'/'以外的非法路由，一律指向404
├── main.js //入口程序
└── store
    ├── actions.js //vuex理念中 actions -> dispatch
    ├── getters.js //vuex 理念中 Getters Can Return Derived State，简言之，组建里面的状态都通过getters来获取
    └── index.js //vuex 理念中 initial state,mutations，相应dispatch－》mutations－》从而完成对state的更新
```



## 知识点

* vue组件中```<style scoped>```，Add "scoped" attribute to limit CSS to this component only
* ​使用了vuex就不能使用v-model，应该是给 <input> 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用 action。



For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).