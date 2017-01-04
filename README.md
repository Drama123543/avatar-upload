# avatarUpload
移动端头像上传控件
![image](https://github.com/yeahisme/avatarUpload/screenshot.png)

# 兼容性
支持URL.createObjectURL都兼容  

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
