window.onload = onReady;

var can;
var ctx;
var img;
var blockSize = 160;
var clickX;
var clickY;
var selected1;
var selected2;
var piecesArray = [];

function onReady() {
    can = document.getElementById('myCanvas');
    ctx = can.getContext('2d');
    img = new Image();
    img.onload = onImage1Load;
    img.src = "images/mount.jpeg";
}

function onImage1Load() {
    var r;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            r = new Rectangle(i * blockSize, j * blockSize, i * blockSize + blockSize, j * blockSize + blockSize);
            piecesArray.push(r);
        }
    }
    scrambleArray(piecesArray, 30);
    drawImage();
}

function onCanvasClick(evt) {
    clickX = evt.offsetX;
    clickY = evt.offsetY;
    var drawX = Math.floor(clickX / blockSize);
    var drawY = Math.floor(clickY / blockSize);
    var index = drawX * 3 + drawY;
    var targetRect = piecesArray[index];
    var drawHighlight = true;
    drawX *= blockSize;
    drawY *= blockSize;
    ctx.clearRect(0, 0, 480, 480);
    if (selected1 != undefined && selected2 != undefined) {
        selected1 = selected2 = undefined;
    }

    if (selected1 == undefined) {
        selected1 = targetRect;
    }
    else {
        selected2 = targetRect;
        swapRects(selected1, selected2);
    }
    drawImage();
}

function swapRects(r1, r2) {
    var index1;
    var index2;
    var temp = r1;
    index1 = piecesArray.indexOf(r1);
    index2 = piecesArray.indexOf(r2);
    piecesArray[index1] = r2;
    piecesArray[index2] = temp;
}

function drawImage() {
    for (var k = 0; k < 3; k++) {
        for (var l = 0; l < 3; l++) {
            r = piecesArray[k * 3 + l];
            ctx.drawImage(img, r.left, r.top, r.width, r.height, k * blockSize, l * blockSize, blockSize, blockSize);
        }
    }
}

function scrambleArray(ar, times) {
    var count = 0;
    var temp;
    var index1;
    var index2;
    while (count < times) {
        index1 = Math.floor(Math.random() * piecesArray.length);
        index2 = Math.floor(Math.random() * piecesArray.length);
        temp = piecesArray[index1];
        piecesArray[index1] = piecesArray[index2];
        piecesArray[index2] = temp;
        count++;
    }
}

function Rectangle(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.width = right - left;
    this.height = bottom - top;
}

