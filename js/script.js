$(function () {

    var can;
    var ctx;
    var img;
    var sizeBlock = 150;
    var clickX;
    var clickY;
    var selectOne;
    var selectTwo;
    var imgBlockArray = [];

    {
        can = document.getElementById('myCanvas');
        ctx = can.getContext('2d');
        img = new Image();
        img.onload = doimgBlock;
        img.src = "images/car.jpg";
    }

    function doimgBlock() {
        var imgBlock;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                imgBlock = new Rectangle(i * sizeBlock, j * sizeBlock, i * sizeBlock + sizeBlock, j * sizeBlock + sizeBlock);
                imgBlockArray.push(imgBlock);
            }
        }
        scrambleArray(imgBlockArray);
        drawImage();
    }

    function Rectangle(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.width = right - left;
        this.height = bottom - top;
    }

    function scrambleArray() {
        imgBlockArray.sort(function(){return 0.5 - Math.random();});
    }

    function drawImage() {
        for (var k = 0; k < 3; k++) {
            for (var l = 0; l < 3; l++) {
               var imgBlock = imgBlockArray[k * 3 + l];
                ctx.drawImage(img, imgBlock.left, imgBlock.top, imgBlock.width, imgBlock.height, k * sizeBlock, l * sizeBlock, sizeBlock, sizeBlock);
            }
        }
    }

    function onCanvasClick(evt) {
        clickX = evt.offsetX;
        clickY = evt.offsetY;
        var drawX = Math.floor(clickX / sizeBlock);
        var drawY = Math.floor(clickY / sizeBlock);
        var index = drawX * 3 + drawY;
        var targetRect = imgBlockArray[index];
        drawX *= sizeBlock;
        drawY *= sizeBlock;
        ctx.clearRect(0, 0, 450, 450);
        if (selectOne !== undefined && selectTwo !== undefined) {
            selectOne = selectTwo = undefined;
        }
        if (selectOne === undefined) {
            selectOne = targetRect;
        }
        else {
            selectTwo = targetRect;
            swapRects(selectOne, selectTwo);
        }
        drawImage();
    }

    function swapRects(rec1, rec2) {
        var tmp = rec1;
        var indexOne = imgBlockArray.indexOf(rec1);
        var indexTwo = imgBlockArray.indexOf(rec2);
        imgBlockArray[indexOne] = rec2;
        imgBlockArray[indexTwo] = tmp;
    }

    function gameRefresh() {
        location.reload();
    }

    $('#myCanvas').click(function () {
        onCanvasClick(event);
    });

    $('#btn').click(function () {
        gameRefresh();
    });
});