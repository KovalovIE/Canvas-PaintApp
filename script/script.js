window.onload = init;
function init() {

    let fillColor = "black";
    const canvas = document.getElementById('canvas1');
    const input = document.getElementById('changeColor');
    const btnPressed = document.getElementById('btnPressed');
    // const class1 = document.getElementsByClassName('btn-focus');
    // console.log(class1.length)




    btnPressed.addEventListener('click', buttonPressed);
    function buttonPressed() {
        btnPressed.classList.toggle('btn-focus');
        //console.log(document.getElementsByClassName('btn-focus').length)
        let num = document.getElementsByClassName('btn-focus');
        console.log(num.length)
        if (num.length > 0) {
            canvas.addEventListener('mousedown', mouseDownHandler);
            function mouseDownHandler(event) {
                const canvas = event.target;

                if(canvas && canvas.getContext)  {
                    const ctx = canvas.getContext('2d');
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = fillColor;
                    ctx.fillRect(event.offsetX, event.offsetY, 10, 10);
                }
                const mouseX = document.getElementById('mouseX');
                mouseX.innerHTML = `: ${event.clientX}`;
                const mouseY = document.getElementById('mouseY');
                mouseY.innerHTML = `: ${event.clientY}`;
                canvas.addEventListener('mousemove', mouseMoveHandler);

            };
            function mouseMoveHandler(event) {
                const canvas = event.target;

                if(canvas && canvas.getContext)  {
                    const ctx = canvas.getContext('2d');
                    ctx.lineWidth;
                    changeSizeBtn = document.getElementById('changeSize');
                    changeSizeBtn.addEventListener('mousemove', updateSize);
                    function updateSize() {
                        var sizeInputRange = document.getElementById("changeSize").value;
                        //console.log(sizeInputRange)
                        document.getElementById("size").innerHTML = sizeInputRange;
                        ctx.lineWidth = sizeInputRange;
                    }
                    //console.log(ctx.lineWidth)
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = fillColor;
                    ctx.fillRect(event.offsetX, event.offsetY, 10, 10);
                }
                const mouseX = document.getElementById('mouseX');
                mouseX.innerHTML = `: ${event.clientX}`;
                const mouseY = document.getElementById('mouseY');
                mouseY.innerHTML = `: ${event.clientY}`;
                //console.log(event.clientX)
                canvas.addEventListener('mouseup', mouseUpHandler);


            };
            function mouseUpHandler(event) {
                const canvas = event.target;

                if(canvas && canvas.getContext)  {
                    const ctx = canvas.getContext('2d');
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = fillColor;
                    ctx.fillRect(event.offsetX, event.offsetY, 10, 10)
                }
                canvas.removeEventListener('mousemove', mouseMoveHandler);

            };
        } else if(num.length === 0) {
            console.log('press button PEN')
            canvas.removeEventListener('mousedown', mouseDownHandler);
        }
    }


    input.addEventListener('keypress', changeColor);
    function changeColor(event) {
        if(event.keyCode === 13) {
            const showColor = document.getElementById('showColor');
            fillColor = input.value;
            showColor.innerHTML = `: ${fillColor}`;
        }
    }

    changeSizeBtn = document.getElementById('changeSize');
    changeSizeBtn.addEventListener('mousemove', updateSize);
    function updateSize() {
        var sizeInputRange = document.getElementById("changeSize").value;
        console.log(sizeInputRange)
        document.getElementById("size").innerHTML = sizeInputRange;
    }

    // function changeColor() {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     fillColor = color;
    // }
}