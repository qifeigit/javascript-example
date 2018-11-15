let canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//创建舞台
let stage = new createjs.Stage(canvas);


stage.x =  window.innerWidth-320 >>1;
stage.y =  window.innerHeight-640 >>1;
//舞台自动更新
createjs.Ticker.on('tick',stage);
//创建一个Shape对象
let rect = new createjs.Shape();
//用画笔设置颜色，调用方法画矩形，矩形参数猜都猜出来了：x,y,w,h
rect.graphics.beginFill("#f00").drawRect(0, 0, 100, 100);
//添加到舞台
stage.addChild(rect);



let circle = new createjs.Text("点击小炮，向病痛开炮", "20px Arial", "red");;
circle.x = circle.y = 300;
stage.addChild(circle);
function loop () {
    circle.scaleX += 0.01;
    circle.scaleY += 0.01;
    if(circle.scaleX >= 1.5){
        circle.scaleX = 1;
        circle.scaleY = 1;
    }
    requestAnimationFrame(loop);
}
loop();

// setTimeout(function () {
//    stage.removeChild(circle);
// },4000)


var image=new Image();
image.src="boy.jpg";
image.onload=handlerImageLoad;

function handlerImageLoad(event){
    var bitmap=new createjs.Bitmap(event.target);
    bitmap.x=canvas.width-bitmap.getBounds().wdith>>1;
    bitmap.y=canvas.height-bitmap.getBounds().height>>1;

    stage.addChild(bitmap);
    stage.update();

    bitmap.addEventListener("click",clickEvent);
    function clickEvent(event){
       alert()
    }
}
