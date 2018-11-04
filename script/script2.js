window.onload = function() {
    init();
}

let strokeColor = "black";
let lineWidth = 1;
// strokeColor = localStorage.getItem('color');
//lineWidth = localStorage.getItem('lineWidth');

let num = document.getElementsByClassName('btn-focus');

function init() {
    const canvas = document.getElementById('canvas1');
    addEventListeners(canvas);

    lineWidth = localStorage.getItem('lineWidth');
    document.getElementById("changeSize").innerHTML = localStorage.getItem('lineWidth');;
    document.getElementById('changeSize').value = localStorage.getItem('lineWidth');;

    strokeColor = localStorage.getItem('color');
    document.getElementById('showColor').style.background = localStorage.getItem('color');
    document.getElementById('showColor').innerHTML = localStorage.getItem('color');
}

function addEventListeners(canvas) {
    canvas.addEventListener('mousedown', mouseDownHandler);
    document.getElementById('btnPressed').addEventListener('click', buttonPressed);

    document.getElementById('changeSize').addEventListener('mousemove', updateSize);
    document.getElementById('changeColor').addEventListener('keypress', changeColor);

    document.getElementById('square').addEventListener('click', paintSquare);
    document.getElementById('circle').addEventListener('click', paintCircle);
    document.getElementById('hexagon').addEventListener('click', paintHexagon);

    document.getElementById('clear').addEventListener('click', clearCanvas);

    document.getElementById('addNewTab').addEventListener('click', addNewTabFunc);
};

function buttonPressed() {
    btnPressed.classList.toggle('btn-focus');
}

function mouseDownHandler(event) {
    const canvas = event.target;
    if (canvas && canvas.getContext && num.length > 0) {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
    }
    getCoords();
    canvas.addEventListener('mousemove', mouseMoveHandler);
}

function mouseMoveHandler(event) {
    const canvas = event.target;
    if (canvas && canvas.getContext && num.length > 0) {

        canvas.removeEventListener('click', hexagonCanvasClick);
        canvas.removeEventListener('click', squareCanvasClick);
        canvas.removeEventListener('click', circleCanvasClick);

        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

    }
    getCoords();
    canvas.addEventListener('mouseup', mouseUpHandler);
}

function mouseUpHandler(event) {
    const canvas = event.target;
    canvas.removeEventListener('mousemove', mouseMoveHandler);
}

function getCoords() {
    document.getElementById('mouseX').innerHTML = `: ${event.clientX}`;
    document.getElementById('mouseY').innerHTML = `: ${event.clientY}`;
}

function updateSize() {
    var sizeInputRange = document.getElementById("changeSize").value;
    document.getElementById("size").innerHTML = sizeInputRange;
    lineWidth = sizeInputRange;
    localStorage.setItem('lineWidth', sizeInputRange);
}

function changeColor(event) {
    if (event.keyCode === 13) {
        let newColor = document.getElementById('changeColor');
        const showColor = document.getElementById('showColor');
        showColor.style.background = newColor.value;
        if (showColor.style.background === newColor.value) {
            strokeColor = newColor.value;
            localStorage.setItem('color', strokeColor)
            document.getElementById('showColor').innerHTML = localStorage.getItem('color');
        } else {
            console.log('error color')
        }
    }
}

function paintSquare() {
    const canvas = document.getElementById('canvas1');
    canvas.removeEventListener('click', hexagonCanvasClick);
    canvas.removeEventListener('click', circleCanvasClick);
    canvas.addEventListener('click', squareCanvasClick);

};

function paintCircle() {
    const canvas = document.getElementById('canvas1');
    canvas.removeEventListener('click', hexagonCanvasClick);
    canvas.removeEventListener('click', squareCanvasClick);
    canvas.addEventListener('click', circleCanvasClick);

};

function paintHexagon() {
    const canvas = document.getElementById('canvas1');
    canvas.removeEventListener('click', circleCanvasClick);
    canvas.removeEventListener('click', squareCanvasClick);
    canvas.addEventListener('click', hexagonCanvasClick);

};

function squareCanvasClick(event) {
    const canvas = event.target;
    if(canvas && canvas.getContext && num.length === 0)  {
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = lineWidth;
        document.getElementById('changeSize').addEventListener('mousemove', updateSize);
        localStorage.setItem('lineWidth', lineWidth)
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(event.offsetX, event.offsetY, ctx.lineWidth, ctx.lineWidth);
    }
}

function circleCanvasClick(event) {
    const canvas = event.target;
    if(canvas && canvas.getContext && num.length === 0)  {
        const ctx = canvas.getContext('2d');
        let radiusCircle = lineWidth;
        document.getElementById('changeSize').addEventListener('mousemove', updateSize);
        localStorage.setItem('lineWidth', lineWidth)
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, radiusCircle,0,Math.PI*2,true); // Внешняя окружность
        ctx.stroke();

    }
}

function hexagonCanvasClick(event) {
    const canvas = event.target;
    if(canvas && canvas.getContext && num.length === 0)  {
        const ctx = canvas.getContext('2d');
        document.getElementById('changeSize').addEventListener('mousemove', updateSize);
        localStorage.setItem('lineWidth', lineWidth);
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(event.offsetX,event.offsetY);
        ctx.lineTo((event.offsetX)+50,(event.offsetY));
        ctx.lineTo((event.offsetX)+75,(event.offsetY)+25);
        ctx.lineTo((event.offsetX)+50,(event.offsetY)+50);
        ctx.lineTo((event.offsetX),(event.offsetY)+50);
        ctx.lineTo((event.offsetX)-25,(event.offsetY)+25);
        ctx.closePath();
        ctx.stroke();
    }
}

function clearCanvas() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addNewTabFunc() {

    var canvasTabSection = document.getElementById('canvasTabSection');
    var div = document.createElement('div');
    canvasTabSection.appendChild(div);
    div.classList.add('tab-btn');
    div.innerText = 'Tab ' + (canvasTabSection.children.length);
}