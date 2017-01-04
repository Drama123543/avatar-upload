var avatarUpload = function(options) {

    //容器的尺寸
    var containerWidth = options.container.width;
    var containerHeight = options.container.height;

    //裁剪区域的尺寸
    var canvasW = options.clip.width;
    var canvasH = options.clip.height;

    //控件让用户选择文件
    var $file = $(options.fileId);

    //用户上传的图片由URL.createObjectURL生成的URL指向
    var imgObjectURL = "";

    //canvas容器 用于:
    //1.生成用户裁剪的图片
    //2.生成二进制并上传
    var canvas = $(options.canvasId)[0];

    //图片操作相关的数据
    var imgData = {
        //图像的尺寸
        origin: {
            width: 0,
            height: 0
        },

        //缩放比例 默认为1
        scale: 1,

        //偏移量
        move: {
            x: 0,
            y: 0
        },

        //临时缩放比例
        tempScale: 0,

        //临时缩放偏移量,用于用户操作相关的计算
        tempMove: {
            x: 0,
            y: 0
        }

    };

    //选择图片
    function selectImg() {
        $file.click();
    }

    //显示用户选择的图片 获取图片的原始尺寸
    function handleFiles(fn) {
        //如果没有图片就返回
        var files = $file[0].files;
        if (files.length === 0) return;

        if (Object.prototype.toString.call(fn) === "[object Function]") {
            fn();
        }

        //取得file对象
        var file = files[0]

        //还原imgData相关的数据
        imgData = {
            //图像的尺寸
            origin: {
                width: 0,
                height: 0
            },

            //缩放比例 默认为1
            scale: 1,

            //偏移量
            move: {
                x: 0,
                y: 0
            },

            //临时缩放比例
            tempScale: 0,

            //临时缩放偏移量,用于用户操作相关的计算
            tempMove: {
                x: 0,
                y: 0
            }

        };
        //释放上个图片的资源
        if(imgObjectURL){
            window.URL.revokeObjectURL(imgObjectURL);
        }
        //生成图片的URL
        imgObjectURL = window.URL.createObjectURL(file);

        //显示图片
        $("#pictureUpload-bg").css("backgroundImage", "url(\"" + imgObjectURL + "\")");

        //储存原图片的尺寸
        var img = new Image();
        img.src = imgObjectURL
        img.onload = function () {
            imgData.origin.width = img.width;
            imgData.origin.height = img.height;
        }

    }


    //生成图片
    function createImg(fn) {
        canvas.width = canvasW;
        canvas.height = canvasH;

        var context = canvas.getContext("2d");
        var img = new Image();
        img.src = imgObjectURL
        img.onload = function () {
            //在画布上放置图像的 x 坐标位置。
            var offsetx;
            //在画布上放置图像的 y 坐标位置。
            var offsety;
            //要使用的图像的宽度。（伸展或缩小图像）
            var biliW = containerWidth;
            //要使用的图像的高度。（伸展或缩小图像）
            var biliH = containerHeight;

            if (imgData.origin.width >= imgData.origin.height) {
                biliH = containerWidth / imgData.origin.width * imgData.origin.height
            } else if (imgData.origin.width < imgData.origin.height) {
                biliW = containerHeight / imgData.origin.height * imgData.origin.width
            }

            offsetx = (canvasW - biliW * imgData.scale) / 2 + imgData.move.x;
            offsety = (canvasH - biliH * imgData.scale) / 2 + imgData.move.y;

            context.drawImage(img, 0, 0, img.width, img.height, offsetx, offsety, biliW * imgData.scale, biliH * imgData.scale);

            if (Object.prototype.toString.call(fn) === "[object Function]") {
                fn();
            }
        }
    }

    //上传图片
    function submit(fn) {
        createImg(function () {
            canvas.toBlob(function (blob) {
                if (Object.prototype.toString.call(fn) === "[object Function]") {
                    fn(blob);
                }
            }, "image/jpeg", options.imgQuality); // JPEG at 100% quality
        })
    }

    //生成本地图片
    function createLocalImg(aIdName, aParentIdName, name) {
        createImg(function () {
            canvas.toBlob(function (blob) {
                var a;
                if (document.getElementById(aIdName)) {
                    a = document.getElementById(aIdName);
                } else {
                    var a = document.createElement("a");
                    a.id = aIdName;
                    document.getElementById(aParentIdName).appendChild(a);
                }
                var nBytes = blob.size;
                var size = nBytes + " bytes";
                for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
                    size = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
                }
                a.textContent = "Download(" + size + ")";
                a.href = window.URL.createObjectURL(blob);
                a.download = name + '.jpg';
            }, "image/jpeg", options.imgQuality); // JPEG at 100% quality
        })
    }

    // 此块也可以可以独立出来
    // 使用hammer.min.js对触摸滑动、缩放事件进行监听
    // 先要对监听的DOM进行一些初始化
    var mc = new Hammer($(options.containerId)[0]);
    var pan = new Hammer.Pan();
    var pinch = new Hammer.Pinch();
    var $uploadBg = $(options.uploadBgId);
    // add to the Manager
    mc.add([pan, pinch]);

    //缩放
    mc.on("pinchstart", function (ev) {
        imgData.tempScale = ev.scale;
    });
    mc.on("pinchmove", function (ev) {
        imgData.scale = ev.scale - imgData.tempScale + imgData.scale;
        imgData.tempScale = ev.scale
        $uploadBg.css("transform", "scale(" + imgData.scale + "," + imgData.scale + ")")

    });
    //移动
    mc.on("panstart", function (ev) {
        var x = ev.center.x;
        var y = ev.center.y;
        imgData.tempMove.x = x;
        imgData.tempMove.y = y;
    });

    mc.on("panmove", function (ev) {
        var x = ev.center.x;
        var y = ev.center.y;

        var px = x - imgData.tempMove.x;
        var py = y - imgData.tempMove.y;


        imgData.move.x = imgData.move.x + px
        imgData.move.y = imgData.move.y + py

        imgData.tempMove.x = x;
        imgData.tempMove.y = y;

        $uploadBg.css({
            left: imgData.move.x + "px",
            top: imgData.move.y + "px"
        })

    });

    return {
        selectImg: selectImg,
        handleFiles: handleFiles,
        createImg: createImg,
        submit: submit,
        imgData: imgData,
        createLocalImg: createLocalImg
    }
};