function Matrix(rows,cols,){

	this.rows = rows;
	this.cols = cols;
	this.matrix = createMatrix();

	function createMatrix(){
		var matrix =[];

		for(var i=0;i<rows;i++){
			matrix[i]=[];
			for(var j=0;j<cols;j++){
				matrix[i][j] = i+j;
			}
		}
		return matrix;
	};

	this.printMatrix = function (){
		for(var i=0;i<this.rows;i++){
			var row_values ="";
			for(var j=0;j<this.cols;j++){
				row_values+=this.matrix[i][j]+" ";
			}
			console.log(row_values);
		}
	}
}
Matrix.createEmptyMatrix = function(rows,cols){

	var tmp_arr = new Matrix(rows,cols);
	for(var i=0;i<tmp_arr.rows;i++){
		for(var j=0;j<tmp_arr.cols;j++){	
				tmp_arr.matrix[i][j]=0;
		}
	}
 return tmp_arr;
}
Matrix.plus = function(arrA,arrB){
	if((arrA.rows == arrB.rows)&&(arrA.cols==arrB.cols)){
		var result = new Matrix(arrA.rows,arrA.cols);
		for(var i=0;i<result.rows;i++){
			for(var j=0;j<result.cols;j++){
				result.matrix[i][j]=arrA.matrix[i][j]-arrB.matrix[i][j];
			}
		}
		return result;
	}
	else return;
}
Matrix.sub = function(arrA,arrB){

	if((arrA.rows == arrB.rows)&&(arrA.cols==arrB.cols)){
		var result = new Matrix(arrA.rows,arrA.cols);
		for(var i=0;i<result.rows;i++){
			for(var j=0;j<result.cols;j++){
				result.matrix[i][j]=arrA.matrix[i][j]+arrB.matrix[i][j];
			}
		}
		return result;
	}
	else return;
}
Matrix.mulOnMumber = function(arrA,number){

	var result = new Matrix(arrA.rows,arrA.cols);
	for(var i=0;i<result.rows;i++){
			for(var j=0;j<result.cols;j++){
				result.matrix[i][j]=arrA.matrix[i][j] * number;
			}
		}
	return result;
}


var GREEN ="green";

var div = document.getElementById("line");
var back_div = document.getElementById("back-color");
var edges_div = document.getElementById("area");
var score_div = document.getElementById("score");
var width =0;
var margin_left = 200;
var area_size =50;
var left_edge = margin_left+5;
var right_edge = left_edge+area_size;
var timerId;
var score =0;
var speed=1;
var color_quotes;
var is_green_braces=true;
var game_over = false;
var dsiplay_width = window.innerWidth;
console.log(dsiplay_width);
dsiplay_width = 0.90*dsiplay_width;
console.log(dsiplay_width);



function generateLevel(){
	width =0;
	margin_left = Math.floor((Math.random() * (dsiplay_width-200)) + 100);
	edges_div.style.width=area_size+"px";
	edges_div.style.marginLeft=margin_left+"px";
	var tmp_col = chooseBracesColor() +" 5px solid";
	back_div.style.backgroundColor = chooseBackColor();
	edges_div.style.borderLeft = tmp_col;
	edges_div.style.borderRight = tmp_col;
	edges_div.style.border = tmp_col;
	left_edge = margin_left+5;
	right_edge = left_edge+area_size;
	timerId=setInterval(sizeUp,choseInterval());
}

function choseInterval(){
	var interval=-1;

	if(score<5){
		interval=6;
		speed =1;
		area_size=50;
	}
	if(score>=5 && score<10){
		interval = 5;
		speed =1;
		area_size=45;
	}
	if(score>=10 && score<15){
		interval = 7;
		speed =2;
		area_size=38;
	}
	if(score>=15 && score<20){
		interval = 6 ;
		speed =2;
		area_size=34;
	}
	if(score>20 ){
		interval = 5 ;
		speed =2;
		area_size=30;
	}

	return interval;
}

function chooseBracesColor(){

	var number = Math.floor((Math.random() * 100) + 1);
	var color =-1;
	if(number >80) {
		is_green_braces=false;
		var letters = '0123456789ABCDEF';
  		var col = '#';
  		for (var i = 0; i < 6; i++) {
    		col += letters[Math.floor(Math.random() * 16)];
 		}
 		color=col;
	}
	else {
		is_green_braces = true;
		color = GREEN; 
	}

	return color;
}

function chooseBackColor(){
	var number = Math.floor((Math.random() * 100) + 1);
	var color =-1;
	if(number >80) {
		color = "#196d3c"
	} else color ="white";
	return color;
}

function sizeUp(){
	width+=speed;
	if(width>right_edge+30){
		clearInterval(timerId);
		if(is_green_braces){
			game_over=true;
			score_div.innerHTML = "<span> You lost </span> <br>  Score : "+score;
			document.getElementById("catch").innerHTML ="Restart";
		}else {
			generateLevel();
		}
	}
	else 
		div.style.width = width+"px";

}

function stop(){
	
		if(game_over){
		 	start();
		}
		else {

			clearInterval(timerId);

			if(is_green_braces){

				if((width >= left_edge) && (width<=right_edge)){
					score++;
					score_div.innerHTML = "Score : "+score;
					setTimeout(generateLevel,500);
					
				}else {
					game_over=true;

					score_div.innerHTML = "<span> You lost </span> <br>  Score : "+score;
					document.getElementById("catch").innerHTML ="Restart";
				}
			}else {
				game_over=true;

					score_div.innerHTML = "<span> You lost </span> <br>  Score : "+score;
					document.getElementById("catch").innerHTML ="Restart";
			}
		}
	
}

function start(){
	game_over=false;
	score=0;
	is_green_braces = true;
	score_div.innerHTML = "Score : 0 ";
	document.getElementById("start-page").style.display ="none";
	var game = document.getElementById("game");
	document.getElementById("catch").innerHTML ="Catch";
	game.style.display ="block";
	game.style.marginTop = "100px";
	game.style.paddingTop = "100px";
	generateLevel();

}
