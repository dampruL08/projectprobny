var grid = document.querySelector('.grid');
var resize = document.getElementById('resizeBlocks');
var remove = document.getElementById('removeBlocks');
var dragg = document.getElementById('dragBlocks');
var dragSrcEl = null;
var msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    percentPosition: true
});

grid.addEventListener('click', function (event) {
    if ((resize.className === 'btn clicked') && (remove.className === 'btn unclicked')) {
        // don't proceed if item content was not clicked on
        if (!matchesSelector(event.target, '.grid-item-content')) {
            return;
        }
        var itemContent = event.target;
        setItemContentPixelSize(itemContent);

        var itemElem = itemContent.parentNode;
        if(itemElem.classList.value==='grid-item is-medium'){
         itemElem.classList.toggle('is-medium');
         itemElem.classList.toggle('is-big');
        }else if(itemElem.classList.value === 'grid-item is-big'){
            itemElem.classList.toggle('is-big');
        }else if(itemElem.classList.value === 'grid-item'){
            itemElem.classList.toggle('is-medium');
        }
        

        // force redraw
        var redraw = itemContent.offsetWidth;
        // renable default transition
        itemContent.style[ transitionProp ] = '';

        addTransitionListener(itemContent);
        setItemContentTransitionSize(itemContent, itemElem);

    } else if ((remove.className === 'btn clicked') && (resize.className === 'btn unclicked')) {
        if (!matchesSelector(event.target, '.grid-item-content')) {
            return;
        }
        // remove clicked element
        var elm = event.target;
        elm.parentNode.remove();
    }
    msnry.layout();

});

dragg.addEventListener('click', function(){
if ((dragg.className === 'btn clicked') && (remove.className === 'btn unclicked')) {
    function handleDragStart(e) {
        this.style.opacity = '1';  // this / e.target is the source node.
        this.classList.remove('over');
        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        this.classList.remove('over');
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

        return false;
    }

    function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }

    function handleDrop(e) {
        // this / e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
        this.classList.remove('over');
        if (dragSrcEl != this) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        // See the section on the DataTransfer object.

        return false;
    }

    function handleDragEnd(e) {
        // this/e.target is the source node.

        [].forEach.call(cols, function (col) {
            col.classList.remove('over');
        });
    }

    var cols = document.querySelectorAll('#gridId .grid-item');
    [].forEach.call(cols, function (col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });}
});

    var docElem = document.documentElement;
    var transitionProp = typeof docElem.style.transition == 'string' ?
            'transition' : 'WebkitTransition';
    var transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        transition: 'transitionend'
    }[ transitionProp ];

    function setItemContentPixelSize(itemContent) {
        var previousContentSize = getSize(itemContent);
        // disable transition
        itemContent.style[ transitionProp ] = 'none';
        // set current size in pixels
        itemContent.style.width = previousContentSize.width + 'px';
        itemContent.style.height = previousContentSize.height + 'px';
    }

    function addTransitionListener(itemContent) {
        // reset 100%/100% sizing after transition end
        var onTransitionEnd = function () {
            itemContent.style.width = '';
            itemContent.style.height = '';
            itemContent.removeEventListener(transitionEndEvent, onTransitionEnd, false);
        };
        itemContent.addEventListener(transitionEndEvent, onTransitionEnd, false);
    }

    function setItemContentTransitionSize(itemContent, itemElem) {
        // set new size
        var size = getSize(itemElem);
        itemContent.style.width = size.width + 'px';
        itemContent.style.height = size.height + 'px';
}