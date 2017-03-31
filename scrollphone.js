$.smartScroll = function(container, selectorScrollable) {
    if (!selectorScrollable || container.data('isBindScroll')) {
        return;
    }
    var isSBBrowser;

    var data = {
        posY: 0,
        maxscroll: 0
    };
    container.on({
        touchstart: function (event) {
            var events = event.originalEvent.targetTouches[0] || event;
            // var elTarget = $(event.target);
            // 当容器包含多个子元素的情况下,应该直接定义为滑动容器，以后优化
            var elTarget = selectorScrollable;
            
            if (!elTarget.length) {
                return;    
            }
            
            var elScroll;
            
            if (elTarget.is(selectorScrollable)) {
                elScroll = elTarget;
            } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
                elScroll = null;
            }
            
            if (!elScroll) {
                return;
            }
            
            data.elScroll = elScroll;
            
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
        },
        touchmove: function (event) {
            if (data.maxscroll <= 0 || isSBBrowser) {
                event.preventDefault();
            }
            var elScroll = data.elScroll;
            var scrollTop = elScroll.scrollTop();
    
            var events = event.originalEvent.targetTouches[0] || event;
            var distanceY = events.pageY - data.posY;
    
            if (isSBBrowser) {
                elScroll.scrollTop(data.scrollY - distanceY);
                elScroll.trigger('scroll');
                return;
            }
    
            if (distanceY > 0 && scrollTop == 0) {
                event.preventDefault();
                return;
            }
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                event.preventDefault();
                return;
            }
        },
        touchend: function () {
            data.maxscroll = 0;
        }    
    });
    container.data('isBindScroll', true);
};