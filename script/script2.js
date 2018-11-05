window.onload = function() {
    init();
};

localStorage.removeItem('canvas');
let canvas = document.getElementById('canvas1');
let strokeColor = "black";
let lineWidth = localStorage.getItem('lineWidth') || 50;

let num = document.getElementsByClassName('btn-focus');

function init() {
    addEventListeners(canvas);

    lineWidth = localStorage.getItem('lineWidth');
    document.getElementById("changeSize").innerHTML = localStorage.getItem('lineWidth');
    document.getElementById('changeSize').value = localStorage.getItem('lineWidth');

    strokeColor = localStorage.getItem('color');
    document.getElementById('showColor').style.background = localStorage.getItem('color');
    document.getElementById('showColor').innerHTML = localStorage.getItem('color');
}

function addEventListeners(canvas) {
    console.log('ddd')
    var currentCanvas = localStorage.getItem('canvas') || 'canvas1';
    var canvas = document.getElementById(currentCanvas)
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
    console.log(event);
    if (canvas && canvas.getContext && num.length > 0) {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
        console.log(event.offsetX, event.offsetY);
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
    var currentCanvas = localStorage.getItem('canvas') || 'canvas1';
    var canvas = document.getElementById(currentCanvas);
    canvas.removeEventListener('click', hexagonCanvasClick);
    canvas.removeEventListener('click', circleCanvasClick);
    canvas.addEventListener('click', squareCanvasClick);

};

function paintCircle() {
    var currentCanvas = localStorage.getItem('canvas') || 'canvas1';
    var canvas = document.getElementById(currentCanvas);
    canvas.removeEventListener('click', hexagonCanvasClick);
    canvas.removeEventListener('click', squareCanvasClick);
    canvas.addEventListener('click', circleCanvasClick);

};

function paintHexagon() {
    var currentCanvas = localStorage.getItem('canvas') || 'canvas1';
    var canvas = document.getElementById(currentCanvas);
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
        localStorage.setItem('lineWidth', lineWidth);
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
        localStorage.setItem('lineWidth', lineWidth);
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
    var currentCanvas = localStorage.getItem('canvas') || 'canvas1';
    var canvas = document.getElementById(currentCanvas)
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function addNewTabFunc() {
    console.log('aaa')
    const canvasTabSection = document.getElementById('canvasTabSection');
    const canvasWrap = document.getElementById('canvas-wrapper');

    let div = document.createElement('div');
    let canvas = document.createElement('canvas');

    canvasTabSection.appendChild(div);
    canvasWrap.appendChild(canvas);

    div.classList.add('tab-btn');
    div.setAttribute('onclick', 'findThisElement()');
    div.innerText = 'Tab ' + canvasTabSection.children.length;
    numDiv = 'div' + canvasTabSection.children.length;
    div.setAttribute('id', numDiv);

    numCanvas = 'canvas' + canvasTabSection.children.length;
    canvas.setAttribute('id', numCanvas);
    canvas.style.width = '1400px';
    canvas.style.height = '790px';
    canvas.classList.add('canvas-tabs');
    canvas.style.display = 'none';
}

function findThisElement() {
    console.log('bbb')
    let tabs = document.querySelectorAll('.tab-btn');
    for (i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', findTabsText)
    }
}

function findTabsText() {
    console.log('ccc')
    let tabsText = this.innerText;
    tabsText = tabsText.charAt(tabsText.length-1);
    //console.log(tabsText)
    let allCanvas = document.querySelectorAll('.canvas-tabs');
    for (i = 0; i < allCanvas.length; i++) {
        allCanvas[i].style.display = 'none';
    }
    var canvasName = 'canvas' + tabsText;
    document.getElementById(canvasName).style.display = 'block';
    localStorage.setItem('canvas', canvasName);
    let canvasClass = document.getElementsByClassName('canvas-tabs');
    for(let i = 0; i < canvasClass.length; i++) {
        if(canvasClass[i].id === canvasName) {
            let newCanvasAddEvent = document.getElementById(canvasName)
            addEventListeners(newCanvasAddEvent)
        }
    }
    //console.log(canvasClass)
}