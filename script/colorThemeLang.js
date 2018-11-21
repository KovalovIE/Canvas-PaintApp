document.getElementById('en').classList.add('active-lang');
console.log(document.getElementsByClassName('active-lang'))

function changeTheme(id) {
    let headLinks = document.getElementsByTagName('link')
    let head = document.getElementsByTagName('head')
    headLinks[1].remove();

    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    switch(id) {
        case "light":
            link.setAttribute('href', 'styles/lightTheme.css')
			break;
		case "dark":
            link.setAttribute('href', 'styles/darkTheme.css')
			break;
    }
    head[0].appendChild(link)
}



let objLangEn = {
    btnSettings: 'Settings',
    blockSettingsHeader: 'Settings',
    themeTextHeader: 'Theme',
    langTextHeader: 'Lang',
    appTextHeader: 'Paint App',
    controlPanelHeader: 'Control Panel',
    btnPressed: 'Pen',
    figureText: 'Figure',
    square: 'Square',
    circle: 'Circle',
    hexagon: 'Hexagon',
    clear: 'Clear',
    addNewLayer: 'Add Layer',
    layer1: 'Layer1',
    tab1: 'Tab 1',
    blockColorText: 'COLOR',
    blockCoordMouseX: 'MOUSE X',
    blockCoordMouseY: 'MOUSE Y'
}

let objLangRu = {
    btnSettings: 'Настройки',
    blockSettingsHeader: 'Настройки',
    themeTextHeader: 'Тема',
    langTextHeader: 'Язык',
    appTextHeader: 'Рисовалка',
    controlPanelHeader: 'Панель',
    btnPressed: 'Кисть',
    figureText: 'Фигуры',
    square: 'Квадрат',
    circle: 'Круг',
    hexagon: 'Шестиугольник',
    clear: 'Очистить',
    addNewLayer: 'Добавить Слой',
    layer1: 'Слой1',
    tab1: 'Вкладка1',
    blockColorText: 'Цвет',
    blockCoordMouseX: 'Мышь по Х',
    blockCoordMouseY: 'Мышь по Х'
}

let objHiddenElemEn = {
    light: 'Light',
    dark: 'Dark',
    en: 'EN',
    ru: 'RU'
}
let objHiddenElemRu = {
    light: 'Светлая',
    dark: 'Темная',
    en: 'Англ',
    ru: 'Русс'
}


function changeLang(id) {
    let hiddenElement = document.querySelectorAll('a')

    let arrEn = [];
    for(let x in objHiddenElemEn) {
        arrEn.push(objHiddenElemEn[x])
    }

    let arrRu = [];
    for(let x in objHiddenElemRu) {
        arrRu.push(objHiddenElemRu[x])
    }

    switch(id) {
        case "en":
            for (let x in objLangEn) {
                console.log(x, objLangEn[x])
                document.getElementById(x).innerHTML = objLangEn[x];
            };
            for (let i = 0; i < 4; i++) {
                hiddenElement[i].text = arrEn[i]
            }
            document.getElementById('en').classList.add('active-lang');
            document.getElementById('ru').classList.remove('active-lang');
			break;
		case "ru":
            for (let x in objLangRu) {
                console.log(x, objLangRu[x])
                document.getElementById(x).innerHTML = objLangRu[x];
            };
            for (let i = 0; i < 4; i++) {
                hiddenElement[i].text = arrRu[i];
                console.log(hiddenElement[i])
            }
            document.getElementById('en').classList.remove('active-lang');
            document.getElementById('ru').classList.add('active-lang');
			break;
    }
    console.log(hiddenElement)
}

function activeLang() {
    ;
    document.getElementById('ru')
}


// let objHiddenElemEn = {
//     light: 'Light',
//     dark: 'Dark',
//     en: 'EN',
//     ru: 'RU'
// }
// let objHiddenElemRu = {
//     light: 'Светлая',
//     dark: 'Темная',
//     en: 'Англ',
//     ru: 'Русс'
// }
document.getElementById('blockSettingsHeader').addEventListener('click', function() {
    console.log(document.querySelectorAll('a'));
})
// function changeLangHiddenElem(element) {
//     //var element = event.target.id;
//     let hiddenElement = document.querySelectorAll('a')
//     let arrEn = [];
//     for(let x in objHiddenElemEn) {
//         arrEn.push(objHiddenElemEn[x])
//     }
//     let arrRu = [];
//     for(let x in objHiddenElemRu) {
//         arrRu.push(objHiddenElemRu[x])
//     }
//     switch(element) {
//         case "en":
//             for (let i = 0; i < hiddenElement.length-3; i++) {
//                 console.log(hiddenElement[i].text = arrEn[i])
//                 //document.getElementById(String(x)).innerHTML = objLangEn[x];
//             }
// 			break;
// 		case "ru":
//             for (let i = 0; i < hiddenElement.length-3; i++) {
//                 console.log(hiddenElement[i].text = arrRu[i])
//                 //document.getElementById(String(x)).innerHTML = objLangRu[x];
//             }
// 			break;
//     }
// }