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
    light: 'Light',
    dark: 'Dark',
    langTextHeader: 'Lang',
    en: 'EN',
    ru: 'RU',
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
    light: 'Светлая',
    dark: 'Темная',
    langTextHeader: 'Язык',
    en: 'Англ',
    ru: 'Русс',
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

function changeLang(id) {

    switch(id) {
        case "en":
            for (let x in objLangEn) {
                console.log(x, objLangEn[x])
                document.getElementById(x).innerText = objLangEn[x];
            };
            document.getElementById('en').classList.add('active-lang');
            document.getElementById('ru').classList.remove('active-lang');
			break;
		case "ru":
            for (let x in objLangRu) {
                console.log(x, objLangRu[x])
                document.getElementById(x).innerText = objLangRu[x];
            };
            document.getElementById('en').classList.remove('active-lang');
            document.getElementById('ru').classList.add('active-lang');
			break;
    }
}