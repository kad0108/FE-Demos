function coByWindowName(courl, selfurl){
	var data;
	var iframe = document.createElement('iframe');
	iframe.style.display = "none";
	iframe.src = courl;
	var state = 0;
	if(iframe.attachEvent){
		iframe.attachEvent("onload", loadfn);
	}else{
		iframe.onload = loadfn;
	}
	document.body.appendChild(iframe);

	function loadfn(){ // iframe会载入两次，从外域到本域，state从0到1
		if(state == 1){
			data = iframe.contentWindow.name; // 此时iframe的src已经是同域下的页面，可以读取window的属性和方法
			alert(data);
			// 拿到跨域数据之后销毁iframe，释放内存
			iframe.contentWindow.document.write('');
			iframe.contentWindow.close();
			document.body.removeChild(iframe);

		}else{
			state = 1;
			iframe.contentWindow.location = selfurl;
		}
	}
}