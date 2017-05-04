## JSON对象的简易实现

* 对继承对象做了测试，`JSON.stringify`不会关注对象原型链上的属性和方法，所以对象自身属性的遍历应该使用Object.keys
```
function Animal(){
    this.name = 'kad';
}
Animal.prototype.sayName = function(){
    console.log(this.name);
}
function Cat(){
    this.foot = 4;
}
Cat.prototype = new Animal();
Cat.prototype.sayFoot = function(){
    console.log(this.foot);
}
var cat = new Cat();
var str = JSON.stringify(cat); // "{"foot":4}"
for(item in cat){
	console.log(item); // foot, name, sayFoot, sayName
}
```

* stringify的实现
```
function isObject(param){
    return param instanceof Object;
}
function isArray(param){
    return param instanceof Array;
}
function isString(param){
    return typeof param === "string";
}
function stringify(obj){
    var str = '';
    if(isArray(obj)){
        str += '[';
        for(let i = 0, len = obj.length; i < len; i++){
            str += stringify(obj[i]);
            if(i != len - 1) str += ',';
        }
        str += ']';
    }else if(isObject(obj)){
        var keys = Object.keys(obj); // 对象自身可枚举属性
        str += '{';
        keys.forEach((key, idx) => {
            str += '"' + key.toString() + '":';
            if(!isObject(obj[key]) && !isArray(obj[key])){
                str += stringify(obj[key]);
            }else{
                str += stringify(obj[key]);
            }
            if(idx != keys.length-1) str += ',';
        })
        str += '}';
    }else if(isString(obj)){
        return '"' + obj.toString() + '"';
    }else{
        return obj;
    }
    return str;
}
```

* parse的实现
```
function parse(str){
	return eval('(' + str + ')');
}
// or
function parse(str){
	var fn = new Function("return " +str);
	return fn();
}
```