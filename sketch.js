const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var dog, dogImg, dogImg2;
var database;
var foodS, foodStock;
var feed, addFood;
var food;

function preload() {
    dogImg = loadImage('images/dogImg.png');
    dogImg2 = loadImage('images/dogImg1.png');
}
function setup() {
    database = firebase.database();
    
	createCanvas(500, 500);
    
    dog = createSprite(250, 300, 150, 150);
    dog.addImage(dogImg);
    dog.scale = 0.15;
    
    foodStock = databse.ref('/');
    foodStock.on("value", readStock);
    textSize(20);
    
    food = new Food();
    
    feed = createButton("Feed the Dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog);
    
    addFood = createButton("Add Food");
    addFood.position(800, 95);
}


function draw() {  
    background(46, 139, 87);
    
    food.display();
    
    fedTime = database.ref('/');
    fedTime.on("value", function(data){
        lastFed = data.val();
    })
    
    fill(255, 255, 254);
    if(lastFed >= 12) {
        text("Last fed : " + lastFed % 12 + "pm", 350, 30);
    }
    else if(lastFed == 0) {
        text("Last fed : 12 am", 350, 30);
    }
    else {
        text("Last fed : " + lastFed + "am", 350, 30);
    }
    
    drawSprites();
}

function readStock(data) {
    foodS = data.val();
    food.updateFoodStock(foodS);
}

function feedDog() {
    dog.addImage(dogImg2);
    food.updateFoodStock(food.getFoodStock() - 1);
    database.ref('/').update({
        Food : food.getFoodStock(),
        feedTime : hour()
    })
}

function addFood() {
    foodS ++;
    database.ref('/').update({
        Food : foodS
    })
}