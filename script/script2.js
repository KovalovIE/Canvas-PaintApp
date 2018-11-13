window.onload = function() {
    init();
};

let objCanvas = {
    Tab1: ['layer1canvas1']
}
console.log(objCanvas.Tab1)
//localStorage.setItem('activeTabNumber', 1);

let objCanvasJSON = JSON.stringify(objCanvas)
localStorage.setItem('objCanvas', objCanvasJSON);

localStorage.removeItem('canvas');
localStorage.removeItem('allCanvasTab');

let canvas = document.getElementById('layer1canvas1');
let strokeColor = "black";
let lineWidth = localStorage.getItem('lineWidth') || 50;

let num = document.getElementsByClassName('btn-focus');

function init() {
    addEventListeners(canvas);
    // localStorage.setItem('activeTabNumber', 1);
    lineWidth = localStorage.getItem('lineWidth');
    document.getElementById("changeSize").innerHTML = localStorage.getItem('lineWidth');
    document.getElementById('changeSize').value = localStorage.getItem('lineWidth');

    strokeColor = localStorage.getItem('color');
    document.getElementById('showColor').style.background = localStorage.getItem('color');
    document.getElementById('showColor').innerHTML = localStorage.getItem('color');
}

function addEventListeners(canvas) {
    var aaa = JSON.parse(localStorage.getItem('allCanvasTab'))
    var currentCanvas = aaa || objCanvas.Tab1;

    var canvasList = document.getElementsByTagName('canvas');
    console.log(canvasList[0].id)
    for (var i = 0; i < canvasList.length; i++) {
        document.getElementById(canvasList[i].id).addEventListener('click', function() {
            aaa = JSON.parse(localStorage.getItem('allCanvasTab'))
            console.log(aaa, canvasList[i])
        })
    }
    //localStorage.setItem('activeTabNumber', 1);
    //var aaa = localStorage.getItem('allCanvasTab');
    
    //var canvas = document.getElementById(currentCanvas);
    console.log(currentCanvas)
    //canvas.addEventListener('mousedown', mouseDownHandler);

    for (var i = 0; i < currentCanvas.length; i++) {
        var canvas = document.getElementById(currentCanvas[i]);
        canvas.addEventListener('mousedown', mouseDownHandler);
}

    document.getElementById('btnPressed').addEventListener('click', buttonPressed);

    document.getElementById('changeSize').addEventListener('mousemove', updateSize);
    document.getElementById('changeColor').addEventListener('keypress', changeColor);

    document.getElementById('square').addEventListener('click', paintSquare);
    document.getElementById('circle').addEventListener('click', paintCircle);
    document.getElementById('hexagon').addEventListener('click', paintHexagon);

    document.getElementById('clear').addEventListener('click', clearCanvas);

    document.getElementById('addNewTab').addEventListener('click', addNewTabFunc);

    document.getElementById('addNewLayer').addEventListener('click', addNewLayerFunc);

    // var inputCheckbox = document.getElementsByTagName('input');
    // for (var i=0; i < inputCheckbox.length; i++) {
    //     if(inputCheckbox[i].type=='checkbox') {            
    //         inputCheckbox[i].addEventListener('click', checkboxCheckedType)
    //     }
    // }
};

function buttonPressed() {
    btnPressed.classList.toggle('btn-focus');
}

function mouseDownHandler(event) {
    const canvas = event.target;
    console.log(event);
    if (canvas && canvas.getContext && num.length > 0) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1400, 790);
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
        ctx.clearRect(0, 0, 1400, 790);
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
    var currentCanvas = localStorage.getItem('canvas') || 'layer1canvas1';
    var canvas = document.getElementById(currentCanvas);
    canvas.removeEventListener('click', hexagonCanvasClick);
    canvas.removeEventListener('click', circleCanvasClick);
    canvas.addEventListener('click', squareCanvasClick);

};

function paintCircle() {
    var currentCanvas = localStorage.getItem('canvas') || 'layer1canvas1';
    var canvas = document.getElementById(currentCanvas);
    canvas.removeEventListener('click', hexagonCanvasClick);
    canvas.removeEventListener('click', squareCanvasClick);
    canvas.addEventListener('click', circleCanvasClick);

};

function paintHexagon() {
    var currentCanvas = localStorage.getItem('canvas') || 'layer1canvas1';
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
    var currentCanvas = localStorage.getItem('canvas') || 'layer1canvas1';
    var canvas = document.getElementById(currentCanvas)
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function addNewTabFunc() { //добавление новой tab с созданием div и canvas

    // const activeTab = localStorage.getItem('activeTabNumber')
    // let thisTabCanvas = localStorage.getItem('objCanvas');
    // thisTabCanvas = JSON.parse(thisTabCanvas)
    // var activeTabNumber = 'Tab' + activeTab;
    // thisTabCanvas = thisTabCanvas[activeTabNumber]
    //console.log(thisTabCanvas)

    const canvasTabSection = document.getElementById('canvasTabSection');
    const canvasWrap = document.getElementById('canvas-wrapper');

    let div = document.createElement('div'); // div для нового tab
    let divWrapCanvas = document.createElement('div'); // div для нового canvas
    let canvas = document.createElement('canvas'); // новый canvas

    canvasTabSection.appendChild(div);
    canvasWrap.appendChild(divWrapCanvas);
    divWrapCanvas.appendChild(canvas);

    div.classList.add('tab-btn');
    div.setAttribute('onclick', 'findThisElement()');
    div.innerText = 'Tab' + canvasTabSection.children.length;
    let numDiv = 'div' + canvasTabSection.children.length;
    div.setAttribute('id', numDiv);

    wrapNumDiv = 'canvasWrap' + canvasTabSection.children.length;
    divWrapCanvas.setAttribute('id', wrapNumDiv);

    numCanvas = 'layer1canvas' + canvasTabSection.children.length;
    canvas.setAttribute('id', numCanvas);
    canvas.setAttribute('width', '1400px');
    canvas.setAttribute('height', '790px');
    canvas.classList.add('canvas-tabs');
    canvas.style.display = 'none';

    objCanvas[div.innerText] = [numCanvas];
    objCanvasJSON = JSON.stringify(objCanvas)
    localStorage.setItem('objCanvas', objCanvasJSON);
}

function findThisElement() { //поиск элемента, на котором был клик
    let tabs = document.querySelectorAll('.tab-btn');
    for (i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', findTabsText)
    }
}

function findTabsText() { //поиск элемента, на котором был клик

    let tabsText = this.innerText; // текст активного tab
    //const activeTab = localStorage.getItem('activeTabNumber')
    let thisTabCanvas = localStorage.getItem('objCanvas');
    thisTabCanvas = JSON.parse(thisTabCanvas)
    //var activeTabNumber = 'Tab' + activeTab;
    thisTabCanvas = thisTabCanvas[tabsText] || ['layer1canvas1'] // достаем конкретный массив с canvas для этой tab
    console.log(thisTabCanvas) // все canvas этой tab
    var canvasStringify = JSON.stringify(thisTabCanvas)
    localStorage.setItem('allCanvasTab', canvasStringify);


    for(let i = 0; i < thisTabCanvas.length; i++) { // все canvas отправляем на отрисовку
            console.log(typeof thisTabCanvas[i])
            let newCanvasAddEvent = document.getElementById(thisTabCanvas[i])
            addEventListeners(newCanvasAddEvent)
    }
    

    let tabTextLastsChar = String(tabsText.charAt(tabsText.length-2)) + tabsText.charAt(tabsText.length-1); //поиск 2-х последних символов
    let tabsTextNumber = parseInt(this.innerText.charAt(tabsText.length-1));

    if( String(parseInt(tabTextLastsChar)).length === 2) { //если при преобразовании в строку не обрежет длину, то 2 цифры, изменяем tabsTextNumber
        tabsTextNumber = parseInt(tabTextLastsChar);
    }

    let allCanvas = document.querySelectorAll('.canvas-tabs');
    for (i = 0; i < allCanvas.length; i++) { // всем canvas display none
        allCanvas[i].style.display = 'none';
    }

    localStorage.setItem('activeTabNumber', tabsTextNumber);
    var canvasName = 'layer1canvas' + tabsTextNumber; //искомый canvas по id
    console.log(canvasName)

    //document.getElementById(canvasName).style.display = 'block'; // canvas в активной tab display block
    for (var i = 0; i < thisTabCanvas.length; i++) { // canvas`ы в активной tab - display block
        document.getElementById(thisTabCanvas[i]).style.display = 'block';
    }

    var inputCheckbox = document.getElementById('newLiForLayer');
    var aaa = inputCheckbox.children;
    for(var i = 0; i < aaa.length; i++) {
        if(aaa[i].children[0].id.substr(11) === 'canvas' + tabsTextNumber) {
            aaa[i].style.display = 'block';
        } else {
            aaa[i].style.display = 'none';
        }
    }

    
    localStorage.setItem('canvas', canvasName);
    let canvasClass = document.getElementsByClassName('canvas-tabs');
    for(let i = 0; i < canvasClass.length; i++) {
        if(canvasClass[i].id === canvasName) {
            let newCanvasAddEvent = document.getElementById(canvasName)
            addEventListeners(newCanvasAddEvent)
        }
    }
}

function addNewLayerFunc() {
    const ulSectionForLayer = document.getElementById('newLiForLayer');
    let activeID = localStorage.getItem('activeTabNumber');
    let canvasWrapNum = 'canvasWrap' + parseInt(activeID);
    const divAddCanvasLayer = document.getElementById(canvasWrapNum);

    let li = document.createElement('li'); 
    let input = document.createElement('input');
    let label = document.createElement('label');
    let canvasLayer = document.createElement('canvas');

    ulSectionForLayer.appendChild(li);
    li.appendChild(input);
    li.appendChild(label);
    divAddCanvasLayer.appendChild(canvasLayer);

    input.setAttribute('type', 'checkbox');
    input.checked = true;   
    InputNumCanvasLayer = 'inputlayer' + ulSectionForLayer.children.length + 'canvas' + parseInt(activeID); 
    input.setAttribute('id', InputNumCanvasLayer);
    label.innerText = 'Layer' + ulSectionForLayer.children.length;

    numCanvasLayer = 'layer' + ulSectionForLayer.children.length + 'canvas' + parseInt(activeID);
    let aaa = localStorage.setItem('numCanvasLayer', numCanvasLayer);
    canvasLayer.setAttribute('id', numCanvasLayer);
    canvasLayer.setAttribute('width', '1400px');
    canvasLayer.setAttribute('height', '790px');
    canvasLayer.classList.add('canvas-tabs');
    canvasLayer.style.zIndex = parseInt(ulSectionForLayer.children.length);

    divAddCanvasLayer.setAttribute('width', '1400px');
    divAddCanvasLayer.setAttribute('height', '790px');    
    divAddCanvasLayer.style.position = 'relative';

    objCanvas['Tab' + activeID].push(numCanvasLayer);
    objCanvasJSON = JSON.stringify(objCanvas)
    localStorage.setItem('objCanvas', objCanvasJSON);

    var inputCheckbox = document.getElementsByTagName('input');
    for (var i=0; i < inputCheckbox.length; i++) {
        if(inputCheckbox[i].type=='checkbox') {
            console.log(inputCheckbox[i])            
            inputCheckbox[i].addEventListener('click', checkboxCheckedType)
        }
    }
}

// function checkedCanvasToggle() {
//     document.getElementById('newLiForLayer').style.display = 'none'
// }
function checkboxCheckedType(e) {
    var element = e.target;
    layerInputID = element.id
    console.log(layerInputID)

    let layerTextLastChar = String(layerInputID.charAt(layerInputID.length-2)) + layerInputID.charAt(layerInputID.length-1); //поиск 2-х последних символов
    let layerTextNumber = parseInt(layerInputID.charAt(layerInputID.length-1));

    if( String(parseInt(layerTextLastChar)).length === 2) { //если при преобразовании в строку не обрежет длину, то 2 цифры, изменяем tabsTextNumber
        layerTextNumber = parseInt(layerTextLastChar);
    }
    var canvasName = layerInputID.substr(5);
    // if (layerInputID.length > 8) {
    //     canvasName = 'canvas' + layerTextNumber;
    // }
    // var canvasName = 'canvas' + layerTextNumber; //искомый canvas по id
    console.log(canvasName)
    // let canvasName = localStorage.getItem('activeTabNumber');
    // console.log(canvasName)

    element.addEventListener('click', function() {
        if(document.getElementById(layerInputID).checked != false) {
            console.log(document.getElementById(canvasName))
            document.getElementById(canvasName).style.display = 'block'
        } else {
            console.log(document.getElementById(canvasName))
            document.getElementById(canvasName).style.display = 'none'
        }
        //document.getElementById(canvasName).style.display = 'none'
    })      
    
}