var result=document.getElementById("result");  
var file=document.getElementById("file"); 
 
  
//判断浏览器是否支持FileReader接口  
if(typeof FileReader == 'undefined'){  
    result.InnerHTML="<p>你的浏览器不支持FileReader接口！</p>";  
    //使选择控件不可操作  
    file.setAttribute("disabled","disabled");  
}  

file.onchange = function(){
	var fileobj = file.files[0];
	if(!/image\/\w+/.test(fileobj.type)){  
	    alert("图片文件才能测试！");  
	    // return false;  
	}else{
		var btns = document.getElementsByTagName("button");
		for(var i = 0, len = btns.length; i < len; i++){
			btns[i].removeAttribute("disabled");
		}
	}
	addEvent($("du"), "click", function(){
		readAsDataURL();
	});
	addEvent($("bs"), "click", function(){
		readAsBinaryString();
	});
	addEvent($("t"), "click", function(){
		readAsText();
	});
}


function readAsDataURL(){  
    //检验是否为图像文件  
    var fileobj = file.files[0];
    //将文件以Data URL形式读入页面 
    var reader = new FileReader(); 
    reader.readAsDataURL(fileobj);  
    reader.onload=function(e){
        var result=document.getElementById("result");  
        //显示文件  
        result.innerHTML='<img src="' + this.result +'" alt="" />';  
    }  
}  
  
function readAsBinaryString(){  
    var fileobj = file.files[0];
    //将文件以二进制形式读入页面  
    var reader = new FileReader();
    reader.readAsBinaryString(fileobj);  
    reader.onload=function(f){  
        var result=document.getElementById("result");  
        //显示文件  
        result.innerHTML=this.result;  
    }  
}  
  
function readAsText(){  
    var fileobj = file.files[0];
    //将文件以文本形式读入页面 
    var reader = new FileReader(); 
    reader.readAsText(fileobj);  
    reader.onload=function(f){  
        var result=document.getElementById("result");  
        //显示文件  
        result.innerHTML=this.result;  
    }  
}