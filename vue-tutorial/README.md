# vue-tutorial  [demo](http://kad0108.github.io/FE-Demos/vue-tutorial/dist/)

> A Vue.js project

## Build Setup

``` bash
# init project by vue-cli
vue init webpack vue-tutorial

cd vue-tutorial

# install dependencies (or npm i)
npm install

# serve with hot reload at localhost:8080
npm run dev

# install lib
npm i vue-resource vue-router vuex bootstrap --save

# build for production with minification
npm run build
```

1. 使用vue-cli创建项目
2. 使用vue-router实现单页路由
3. 用vuex管理我们的数据流
4. 使用vue-resource请求node服务端
5. 使用.vue文件进行组件化的开发


## 知识点

* **模块热加载**是webpack的特性，代码修改后页面不刷新状态也会保留。

* 开发时依赖--save-dev，放在package.json的devDependencies中；--save是发布之后还依赖的东西，放在dependencies中。比如写ES6代码想编译成ES5发布，那么babel就是devDependencies；如果使用了jQuery发布之后还依赖jQuery，就是dependencies。

* ```components: { App }```相当于```render: h => h(App)```，官方文档：

  ```
  render: function (createElement) {
      return createElement(
        // ...
      )
    }
  ```

* main.js中渲染模板两种写法：

  ```
  render (createElement) {
    return createElement('app')
  }
  ```
  ```
  template: '<App/>',
  components: { App }
  ```

* 本地存放图片遇到的路径解析问题，js动态生成的路径无法被url-loader解析到，如果你去build，会发现图片甚至不会打包输出到dist目录（webpack是按需打包的），看到好几种回答：

  1. 在```webpack.base.conf.js```的alias下设置assets，然后在引用的时候```src="~assets/xx.png"```，但是并不好使
  2. 直接require('xxx/xx.png')，这种相对路径更不可取
  3. 把图片放到src同级的static目录（build/build.js文件中有一段代码是把static目录拷贝到dist/static的），然后js中使用/static/a.png去引用即可，这个方法可行，注意build之后```/static```指向根路径，需要把根路径定位到dist目录。

* 各文件夹：

  ```
  /build: webpack构建过程的设置文件，包括调试和发布版本以及一些工具函数
  /config: webpack-dev-server的一些设定，用作资源服务器
  /src: 项目的源文件所在
  /static: 存放静态资源的地方，在build之后会生成dist文件夹，这个文件夹中的文件会原封不动放进去
  /.babelrc: webpack插件babel的设置
  /.editorconfig: atom编辑器生成的配置文件，在各个项目中可以自由配置
  /.eslintignore: 使用eslint检测代码是否符合规则的忽略目录，用于eslint设置
  /.gitignore: 使用Git版本管理时需要忽略的目录，用于git设置
  /index.html: 项目生成后的入口页面，因为vue默认是使用单页面的，所以在webpack中同时也只有这一个入口
  /package.json: nodejs的配置 
  /dist: build之后生成的目录，其中存放webpack打包之后的结果，webpack中需要指定build规则
  ```

* **模块懒加载**，vue提供了组件异步按需加载：

  ```
  Vue.component('async-webpack-example', function (resolve, reject) {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 Ajax 请求自动下载。
    require(['./my-async-component'], resolve)
  })
  //resolve 回调，在收到从服务器下载的组件定义时调用。也可以调用reject(reason) 指示加载失败。
  ```

* vuex流程：1)到action里面查这个事件的触发，2)然后mutation里面查看对应处理，3)改变store状态，4）getter视图渲染

  ```
  src/store/index.js: 传入state、mutations、actions来初始化Vue.Store
  src/store/mutation-type.js: 申明整个项目存在的事件有哪些
  src/store/mutations.js: 注册各种数据变化的方法
  src/store/actions.js: 触发事件传入参数
  ```

* 事件命名在`mutations`里都是用大写下划线连接，而我们的`actions`里都用小写驼峰对应

* ES6的**[解构](http://es6.ruanyifeng.com/#docs/destructuring)**用法，**[扩展运算符](http://es6.ruanyifeng.com/?search=%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6&x=0&y=0#docs/object#对象的扩展运算符)**用法。扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中，这一点等同于Object.assign。

* **Object.assign**会将源对象可枚举属性的引用拷贝给目标对象，区别于深度拷贝。

* build之后把根路径定位到dist目录，试了一下貌似只有这个方法可行

  ```
  /build/webpack.prod.conf.js
  output{
    publicPath: './'
  }
  ```

  还有说设置config目录下的index.js的assetsPublicPath为```/dist/```，但是试了不好使。

* woff2、ttf等字体文件报错需要在webpack的base配置文件中配置url-loader

  ​




For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
