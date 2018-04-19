# avatar-upload (移动端头像上传控件)

[![示例](https://raw.githubusercontent.com/ishanyang/avatar-upload/master/demo/screenshot.png)](https://ishanyang.github.io/avatar-upload/demo/index.html)

```JavaScript
npm install avatar-upload
```

devDependencies:{"jquery","hammer"}

hammer主要用于图片的移动和缩放

# 兼容性
## [toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)

## [createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)

# browser
```JavaScript
<script src="js/jquery3.1.1-min.js"></script>
<script src="js/hammer.min.js"></script>
<script src="../dist/avatar-upload.js"></script>
<script>
  $(function(){
    var avatarUpload = require("avatar-upload");

    //定义发送二进制的函数
    function sendFile(base64Url) {
      // ajax上传base64
      alert("ajax上传base64")

      /*java https://www.cnblogs.com/mr-wuxiansheng/p/6931034.html*/

      /* node.js
      app.post('/upload', function(req, res){
          //接收前台POST过来的base64
          var imgData = req.body.imgData;
          //过滤data:URL
          var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
          var dataBuffer = new Buffer(base64Data, 'base64');
          fs.writeFile("image.png", dataBuffer, function(err) {
              if(err){
                res.send(err);
              }else{
                res.send("保存成功！");
              }
          });
      });
       */
    }

    var $container = $("#js-pictureUpload");
    var $mask = $("#js-pictureUpload-mask");
    var $fileElem = $("#js-fileElem");
    var $submit = $("#js-submit");
    var $select = $("#js-select");
    var options = {
      containerId: "#js-pictureUpload",
      uploadBgId: "#js-pictureUpload-bg",
      fileId: "#js-fileElem",
      canvasId: "#js-canvas",
      container: {
        width: $container.width(),
        height: $container.height()
      },
      clip:{
        width: $mask.width(),
        height: $mask.height()
      },
      imgQuality:1
    }

    var txUpload = avatarUpload($,Hammer,options);
    $select.click(txUpload.selectImg)
    $submit.click(function(){
      txUpload.submit(sendFile);
    })

    //文件 onchange事件
    $fileElem.on("change", function(){
      txUpload.handleFiles(function(){
        $submit.addClass('active');
      })
    });

  })
</script>
```
# react
```JavaScript
import $ from 'jquery';
import Hammer from 'hammerjs';
import avatarUpload from 'avatar-upload';

componentDidMount(){

    //定义发送二进制的函数
    function sendFile(base64Url) {
      // ajax上传base64
      alert("ajax上传base64")

      /*java https://www.cnblogs.com/mr-wuxiansheng/p/6931034.html*/

      /* node.js
      app.post('/upload', function(req, res){
          //接收前台POST过来的base64
          var imgData = req.body.imgData;
          //过滤data:URL
          var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
          var dataBuffer = new Buffer(base64Data, 'base64');
          fs.writeFile("image.png", dataBuffer, function(err) {
              if(err){
                res.send(err);
              }else{
                res.send("保存成功！");
              }
          });
      });
       */
    }

    var $container = $("#js-pictureUpload");
    var $mask = $("#js-pictureUpload-mask");
    var $fileElem = $("#js-fileElem");
    var $submit = $("#js-submit");
    var $select = $("#js-select");
    var options = {
      containerId: "#js-pictureUpload",
      uploadBgId: "#js-pictureUpload-bg",
      fileId: "#js-fileElem",
      canvasId: "#js-canvas",
      container: {
        width: $container.width(),
        height: $container.height()
      },
      clip:{
        width: $mask.width(),
        height: $mask.height()
      },
      imgQuality:1
    }

    var txUpload = avatarUpload($,Hammer,options);
    $select.click(txUpload.selectImg)
    $submit.click(function(){
      txUpload.submit(sendFile);
    })
    
    //文件 onchange事件
    $fileElem.on("change", function(){
      txUpload.handleFiles(function(){
        $submit.addClass('active');
      })
    });
}
```