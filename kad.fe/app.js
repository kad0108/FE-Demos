var code = `
body{
	background: red;
}
p{
	color: purple;
}
`;

var n = 0;

function $(selector, context){
	context = context || document;
	var nodelist = context.querySelectorAll(selector);
	if(selector.charAt(0) == '#') return nodelist[0];
	return nodelist;
}

// var $style = $('#style'),
// 	$content = $('#content');

setInterval(function(){
	content.innerHTML = code.substring(0, n);
	style.innerHTML = code.substring(0, n);
	n = n + 1;
}, 100);