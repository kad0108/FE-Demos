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
    addEvent($("ir"), "click", function(){
        var image = document.createElement('img');
        var reader = new FileReader();
        var can = document.createElement('canvas')
        var canvas = can.getContext('2d');
        var height = 150;
        var width = 300;
        reader.readAsDataURL(fileobj);
        reader.onload = function(e){
            image.src = e.target.result;
            canvas.drawImage(image, 0, 0, width, height);
            var data = [];
            for(var h = 0; h < height; h++){
                data.push([]);
                for(var w = 0; w < width; w++){
                    data[h].push(toRGBA(canvas.getImageData(w, h, 1, 1).data));
                }
            }
            var context = $("myCanvas").getContext("2d");
            var i = 0,j = 0;
            var cot = 0, gap = 5;
            var timer = setInterval(function(){
                if(cot == (width*height)/(gap*gap)){
                    clearInterval(timer);
                    return;
                }
                cot ++;
                if(j == width){
                    i += gap;
                    j = 0;
                }
                context.save();
                context.fillStyle = data[i][j];
                context.fillRect(j, i, gap, gap);
                context.restore();
                j += gap;
            }, 5);
        };
        
    });
}

function toRGBA(pixel){
  return 'rgba(' + pixel[0] + ',' + pixel[1] + ',' + pixel[2] + ',' + pixel[3] + ')'
}

