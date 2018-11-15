
var canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


var scale = 1;


if (window.innerHeight) {

}


//Create a stage by getting a reference to the canvas
stage = new createjs.Stage("canvas");

stage.x  = (canvas.width-320)/2;
stage.y = (canvas.height-600)/2
createjs.Ticker.on('tick',stage);




//使用preloadjs加载图片

// 图片路径
var imgsrc=[{id:'boy',src:'assets/boy.png'},
{id:'xiu',src:'assets/xiuzheng.png'},
{id:'pao',src:'assets/pao.png'},
{id:'back',src:'assets/back.png'},
{id:'xiuzhengbox',src:'assets/xiuzhengbox.png'},
];
// 图片资源加载
var load=new createjs.LoadQueue(false);
load.loadManifest(imgsrc);
load.on('complete',hand);
//图片加载完后执行的方法
function hand(){


var imgobj=load.getResult('assets/boy.png');
var Img=new createjs.Bitmap(imgobj);
Img.x=(canvas.width-Img.getBounds().width*0.1)/2;;
Img.y=100;
Img.scaleY =0.1;
Img.scaleX =0.1;
//  Img.x=(canvas.width-Img.getBounds().wdith)/2;
//       Img.y=canvas.height-Img.getBounds().height;
stage.addChild(Img);




var xiuzhengBoxObj=load.getResult('assets/xiuzhengbox.png');
var xiuzhengbox=new createjs.Bitmap(xiuzhengBoxObj);
xiuzhengbox.x=(canvas.width+150)/2;;
xiuzhengbox.y=300;
xiuzhengbox.scaleY =0.08	;
xiuzhengbox.scaleX =0.08;
//  Img.x=(canvas.width-Img.getBounds().wdith)/2;
//       Img.y=canvas.height-Img.getBounds().height;
stage.addChild(xiuzhengbox);



var xiuzhengRes = load.getResult('assets/xiuzheng.png');



var xiuzhengImgs =[]

for(var i =0 ;i<7;i++){
	xiuzhengImgs.push(new createjs.Bitmap(xiuzhengRes));
	xiuzhengImgs[i].x=2+40*i;
	xiuzhengImgs[i].y=480;
		xiuzhengImgs[i].scaleY=0.04;
	xiuzhengImgs[i].scaleX=0.04;
	stage.addChild(xiuzhengImgs[i]);

stage.update();

}





var paoRes = load.getResult('assets/pao.png');
var paoImg = new createjs.Bitmap(paoRes);
paoImg.x =0;
paoImg.y = 400;

paoImg.scaleY =0.1;
paoImg.scaleX =0.1;
stage.addChild(paoImg);

stage.update();



let paoText = new createjs.Text("点击小炮，消灭病痛", "20px Arial", "#fff");;
paoText.x = 100;
paoText.y = 400;
stage.addChild(paoText);
function loop () {
    paoText.scaleX += 0.01;
    paoText.scaleY += 0.01;
    if(paoText.scaleX >= 1.5){
        paoText.scaleX = 1;
        paoText.scaleY = 1;
    }
    requestAnimationFrame(loop);
}
loop();

setTimeout(function () {
   stage.removeChild(paoText);
},4000)



var startTime = new Date();
var endTime ;




paoImg.image.crossOrigin="Anonymous";
paoImg.addEventListener("click",clickEvent);
function clickEvent(event){
    // circle.x = circle.y = 50;

if (xiuzhengImgs.length == 0) {
	return;
}

if (circle.scale <= 0.1) {return;}
    circle.scale -= 0.13; 


console.log(xiuzhengImgs)
for (var i in xiuzhengImgs) {
	if (i == xiuzhengImgs.length-1) {
		stage.removeChild(xiuzhengImgs[i]);
	}
	 
}
xiuzhengImgs.splice(xiuzhengImgs.length-1,1);

if (xiuzhengImgs.length == 0) {
	endTime = new Date();
	showEnd(endTime - startTime);
}

    stage.update();


}






var backRes = load.getResult('back');
var backImg = new createjs.Bitmap(backRes);
backImg.x =-10;
backImg.y =-20;

backImg.scaleY =0.15;
backImg.scaleX =0.15;
stage.addChild(backImg);




//Create a Shape DisplayObject.
circle = new createjs.Shape();
circle.x = canvas.width/2+15;
circle.y = 350;
// circle.graphics.beginRadialGradientFill(["red","rgba(255,255,255,0)"],[0,1],300,300,4,300,300,50).drawCircle(0, 0, 150);
// circle.graphics.drawCircle(50, 50, 100, 100);
//Set position of Shape instance.


 circle.graphics.beginRadialGradientFill(["#F00","rgba(255,255,255,0)"], [0, 1], 0, 0, 2, 0, 0, 10).drawCircle(0, 0, 10);

// circle.graphics.beginRadialGradientFill(["red","rgba(255,255,255,0)"],[0,1],150,150,4,150,150,50).drawCircle(0, 0, 100,100);
//Add Shape instance to stage display list.
stage.addChild(circle);






stage.update();    // 更新舞台，每次修改操作后需要更新真个舞台才有效果
}


function showEnd(duration) {
	// body...

	document.getElementById('mask-in').innerHTML = "<p>恭喜您仅用时"+parseInt(duration/1000)+"."+parseInt((duration%1000)/100)+"秒就用修正帮助小明去除病痛</p>"

	document.getElementById('mask').className+= "mask";
}






