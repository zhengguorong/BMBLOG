var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: '.swiper-pagination',
    mousewheelControl: true,
    onInit: function (swiper) {
        //swiperAnimateCache(swiper);
        swiperAnimate(swiper);
    },
    onSlideChangeEnd: function (swiper) {
        swiperAnimate(swiper);
    }
})

//获取页面上所有img资源路径
var imgs = document.getElementsByTagName('img')
var resources = []
var processImgs = []
for(var i=0;i<imgs.length;i++){
    var imgSrc = imgs[i].getAttribute('pre-src')
    //过滤没有pre-src属性的img标签
    if(imgSrc){
        resources.push(imgSrc)
        processImgs.push(imgs[i])
    }
}


var loader = new resLoader({
    resources : resources,
    onStart : function(total){
        console.log('start:'+total);
    },
    onProgress : function(current, total){
        console.log(current+'/'+total);
        var percent = (current/total*100).toFixed(0);
        document.querySelector('.progress').innerHTML = percent + '%';
    },
    onComplete : function(total){
        console.log('加载完毕:'+total+'个资源');
        //重新设置src
        for(var i=0;i<processImgs.length;i++){
            processImgs[i].setAttribute('src',resources[i])
        }
        document.querySelector('.column-loading').style.display = "none";
    }
});

loader.start();