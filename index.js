// Import stylesheets
import './style.css';
import {VesselLoc} from "./VesselData.js"
//console.log(data);
	//canvasに枠線をつける。

var canvas = document.getElementById('rectangle');
canvas.style.border = "0.1px solid";

var cvs = canvas.getContext('2d');
cvs.beginPath(); /* 図形を描き始めることを宣言 */
for (var i = 0; i < VesselLoc.length; i++) {
    cvs.rect(VesselLoc[i].xpos,VesselLoc[i].ypos,VesselLoc[i].xlength,VesselLoc[i].ylength);
    cvs.fillText(VesselLoc[i].Container,VesselLoc[i].xpos,VesselLoc[i].ypos+10);
  }
cvs.closePath(); /* 描いた線を閉じる */

cvs.stroke(); /* 描いた図形を線で表示させる */
var x = 0;
var y = 0;
let isDragging = false;
let rootx;
let rooty;
function onClick(e) {
    /*
     * rectでcanvasの絶対座標位置を取得し、
     * クリック座標であるe.clientX,e.clientYからその分を引く
     * ※クリック座標はdocumentからの位置を返すため
     * ※rectはスクロール量によって値が変わるので、onClick()内でつど定義
     */
    var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    console.log("Click",Math.trunc(x),Math.trunc(y)); //小数点以下　切り捨て
    draw();
}
function onMouseDown(e) { 
    var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    isDragging = true;
    rootx=Math.trunc(x);
    rooty=Math.trunc(y);
    console.log("mouse down",rootx,rooty); //小数点以下　切り捨て
  }

function onMouseMove(e) {
  if (!isDragging) return;
  var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    console.log("mouse move",rootx,rooty,Math.trunc(x),Math.trunc(y)); //小数点以下　切り捨て
  }

function onMouseUp(e) { 
  var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    console.log("mouse up",rootx,rooty,Math.trunc(x),Math.trunc(y)); //小数点以下　切り捨て
    isDragging = false;
  }
function draw() {
    // 描画処理
    //cvs.clearRect(0, 0, 200, 200);   //canvasをクリア
   cvs.fillRect(x, y, 5, 5);
}
// マウスイベントのリスナーを追加

canvas.addEventListener('click', onClick, false);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);