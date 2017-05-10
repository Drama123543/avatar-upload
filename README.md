# avatarUpload (移动端头像上传控件)
 
![移动端头像上传控件截图](https://github.com/yeahisme/avatarUpload/blob/master/screenshot.png)

devDependencies:{"jquery3.1.1-min","hammer.min"}

hammer主要用于图片的移动和缩放
# 使用方法
```JavaScript
//配置信息
var options = {
	containerId: "#pictureUpload",
	uploadBgId: "#pictureUpload-bg",
	fileId: "#fileElem",
  canvasId: "#canvas",
	//容器尺寸
  container: {
		width: $("#pictureUpload").width(),
		height: $("#pictureUpload").height()
	},
  //裁剪区域尺寸
  clip:{
		width: $("#pictureUpload-mask").width(),
		height: $("#pictureUpload-mask").height()
	},
  //图片质量0-1	
  imgQuality:1
}
```

```JavaScript
//获取操作对象
var txUpload = avatarUpload(options);
//文件 onchange事件
$("#fileElem").on("change",  function(){
	txUpload.handleFiles(function(){
    //当用户选择文件后 按钮active
    $("#preview, #submit, #createLocalImg").addClass('active');
	})
});
//选择文件
$("#select").click(txUpload.selectImg)
//预览
$("#preview").click(txUpload.createImg)
//上传
$("#submit").click(function(){
	txUpload.submit(sendFile);
})
//生成本地文件
$("#createLocalImg").click(function(){
	txUpload.createLocalImg("localImg","canvasWrap","localImg");
});
```

```JavaScript
//定义上传的函数
function sendFile(fileblob) {
	console.log(fileblob)
	var url = "/";
	var xhr = new XMLHttpRequest();
	var fd = new FormData();

	fd.append("file", fileblob,"avatar.jpg");

	xhr.open("POST", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var data = JSON.parse(xhr.responseText)
			if(data.success){
				console.log("成功");
			}
		}
	};
	xhr.send(fd);
}
		
```
# 兼容性
支持URL.createObjectURL都兼容  

##### 张东华 1210126126@qq.com
