(function () {
    var html = document.documentElement, // 是html，不是body
        resizeEvt = 'orientationchange' in window ? 'orientationchange':'resize',   //旋转、调整窗口
        recalc = function() {
            var width = html.clientWidth;
                // width = html.getBoundingClientRect().width;
            console.log(width);
            if (!width) return;
            html.style.fontSize = (width/320)*20 + 'px';    //320px屏幕下，1rem=20px,不能设置为10px，因为chrome下最小为12px
        };
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);    //DOMContentLoaded事件在dom加载完成后触发，而load是所有资源加载完触发
})()