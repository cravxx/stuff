var t = setInterval(function() {
    document.getElementsByClassName("inner")[0].style.cssText = `
    background: linear-gradient(rgba(33, 33 ,33 , .75), rgba(33, 33 ,33 , .75)), url(style/background/` + Math.floor(Math.random() * 105 /*add 1 because of floor()*/ + 1) + `.png) !important;
    background-size: cover !important;`
}, 45000);