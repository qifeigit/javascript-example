var canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


var scale = 1;

//Create a stage by getting a reference to the canvas
stage = new createjs.Stage("canvas");
//Create a Shape DisplayObject.
circle = new createjs.Shape();

circle.graphics.beginRadialGradientFill(["red","white"],[0,1],150,150,5,150,150,50);
circle.graphics.drawRect(100,100,100,100);
//Set position of Shape instance.
circle.x = circle.y = 50;
//Add Shape instance to stage display list.
stage.addChild(circle);





var text4 = new createjs.Text("点我", "bold 30px Arial", "#ff0000");
text4.x = 100;
text4.y = 100;

rect = new createjs.Shape();
rect.graphics.beginRadialGradientFill(["white","white"],[0,1],150,150,5,150,150,50);
rect.graphics.drawRect(100,100,100,50);
//Set position of Shape instance.


rect.addEventListener("click",clickEvent);
function clickEvent(event){
    scale *=0.9


    circle.graphics.beginRadialGradientFill(["red","white"],[0.2*scale,1],150,150,5*scale,150,150,50*scale);
    console.log(50*scale)
    circle.graphics.drawRect(100,100,100,100);
    circle.x = circle.y = 50;
    stage.update();
}

stage.addChild(rect,text4);
stage.update();    // 更新舞台，每次修改操作后需要更新真个舞台才有效果
