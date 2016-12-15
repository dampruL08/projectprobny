
var resize = document.getElementById('resizeBlocks');
var remove = document.getElementById('removeBlocks');
var drag = document.getElementById('dragBlocks');
resize.addEventListener('click', function () {
    if ((remove.className === 'btn unclicked')&&(drag.className === 'btn unclicked')) {
        if (resize.className === 'btn unclicked') {
            resize.className = 'btn clicked';
            resize.innerHTML = 'Wyłącz zmianę rozmiaru';
        } else if (resize.className === 'btn clicked') {
            resize.className = 'btn unclicked';
            resize.innerHTML = 'Włącz zmianę rozmiaru';
        }
    } else {
        alert('Wyłącz usuwanie!');
    }
});
remove.addEventListener('click', function () {
    if ((resize.className === 'btn unclicked')&&(drag.className === 'btn unclicked')) {
        if (remove.className === 'btn unclicked') {
            remove.className = 'btn clicked';
            remove.innerHTML = 'Wyłącz usuwanie';
        } else if (remove.className === 'btn clicked') {
            remove.className = 'btn unclicked';
            remove.innerHTML = 'Włącz usuwanie';
        }
    } else {
        alert('Wyłącz przenoszenie lub zmianę rozmiaru!');
    }
});
drag.addEventListener('click', function () {
    if ((resize.className === 'btn unclicked')&&(remove.className === 'btn unclicked')) {
        if (drag.className === 'btn unclicked') {
            drag.className = 'btn clicked';
            drag.innerHTML = 'Wyłącz przenoszenie';
        } else if (drag.className === 'btn clicked') {
            drag.className = 'btn unclicked';
            drag.innerHTML = 'Włącz przenoszenie';
        }
    } else {
        alert('Wyłącz usuwanie lub zmianę rozmiaru!');
    }
});