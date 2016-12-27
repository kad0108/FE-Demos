# vue-tutorial

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

* ​





For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
