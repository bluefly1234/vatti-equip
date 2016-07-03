/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
var SWIPEDIRECTION;
var bgAud;
var showCover;

// 预加载
var sourceArr = [
    'images/common-bg.jpg',
    'images/cover-s36e0642969.png',
    'images/icon.jpg',
    'images/item1.png',
    'images/item2.png',
    'images/item3.png',
    'images/item4.png',
    'images/item5.png',
    'images/item6.png',
    'images/item7.png',
    'images/misc-s11e3f1fa5f.png',
    'images/page2-bg.png',
    'images/page3-bg.png',
    'images/page4-bg.png',
    'images/page5-bg.png',
    'images/qrcode.png',
    'images/qr-des.png',
    'media/bgmusic.mp3'
]; //需要加载的资源列表

new mo.Loader(sourceArr,{
	onLoading : function(count,total){
		console.log('onloading:single loaded:',arguments);
        console.log('加载中...（'+count/total*100+'%）');
        var loadPercent = Math.floor(count/total*100);
        $('#loading-num').html(loadPercent+'%');
	},
	onComplete : function(time){
		console.log('oncomplete:all source loaded:',arguments);
        $('#bg-music').attr('src', 'media/bgmusic.mp3');
        var hideLoading = new TimelineMax({
            delay: 2,
            onComplete: function () {
                TweenMax.set('#music-control', {display: 'block', autoAlpha: 1});
                bgAud.play();
                showCover();

            }
        });
        hideLoading.to('#loading-num', 0.6, {autoAlpha: 0})
        .set('#loading-num', {display: 'none'})
	}
});

(function($) {
    $(document).ready(function() {
        console.log('Ready');
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        }); // 禁止页面滚动

        // music-control--------------
    var musicCtrl = new TimelineMax({repeat: -1, paused:true });
    var musicRotation = new TimelineMax({repeat: -1, paused:true});
    musicCtrl.to($(".music-control-icon"), 2, {rotation: 360, ease: Power0.easeNone});
    musicRotation.to($(".music-control-icon:nth(1)"), 0.5, {x: "-=20",y: "-=20", autoAlpha:0, ease: Power0.easeNone})
                  .to($(".music-control-icon:nth(2)"), 0.5, {x: "+=20", y: "-=20", autoAlpha:0, ease: Power0.easeNone})
                  .to($(".music-control-icon:nth(3)"), 0.5, {x: "-=20", y: "+=20", autoAlpha:0, ease: Power0.easeNone})
                  .to($(".music-control-icon:nth(4)"), 0.5, {x: "+=20", y: "+=20", autoAlpha:0, ease: Power0.easeNone})

     // 音乐初始化
     bgAud = $("#bg-music")[0];
     function initAud(){
         if (bgAud.currentTime){
             console.log("背景音乐开始播放");
             musicCtrl.play();
             musicRotation.play();
             bgAud.removeEventListener("timeupdate", initAud, false); //只执行一次，防止控制按钮动画无法暂停
         }
     }

     bgAud.addEventListener("timeupdate", initAud, false);

     function playBM() {
         bgAud.play();
         musicCtrl.play();
         musicRotation.play();
     }

     function pauseBM() {
         bgAud.pause();
         musicCtrl.pause();
         musicRotation.pause();
     }

    // 音乐控制
     $("#music-control").on('touchstart', function(){
         if(bgAud.paused){
             playBM();
         }else{
             pauseBM();
         }
     })
    // music-control End------------------------------

     // 滑动指示箭头动画
     var upGuide = new TimelineMax({yoyo: true, repeat: -1, paused: true});
     upGuide.to($('#arrow-up'), 0.8, {y: '-=30', ease: Power0.easeNone})

     function showArrow() {
         TweenMax.fromTo($('#arrow-up'), 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn, onComplete: function () {
             upGuide.play();
         }});
     } // 显示上滑箭头并播放箭头动画

     function hideArrow() {
         TweenMax.to($('#arrow-up'), 0.5, {autoAlpha: 0, onComplete: function () {
             upGuide.pause(0);
         }});
     } // 隐藏上滑箭头并停止箭头动画

      showCover = function () {
          var coverShow = new TimelineMax({
              onComplete: function () {
                showArrow();
                // 上滑
                touch.on($("#cover"), 'swipeup', function(ev){
                    console.log(ev.type + ' cover');
                    hideArrow();
                    hideCover();
                });
              }
          });
          coverShow.set('#cover', {display: 'block', autoAlpha: 1})
          .fromTo('#cover', 0.6, {autoAlpha: 0}, {autoAlpha: 1})
          .fromTo('#cover-person', 0.8, {autoAlpha: 0, x: 500, y: 640}, {autoAlpha: 1, x: 0, y: 0, ease: Back.easeOut.config(0.8), force3D: true})
          .fromTo('#cover-logo', 0.8, {autoAlpha: 0, x: -60, y: -150}, {autoAlpha: 1, x: 0, y: 0, ease: Back.easeOut.config(1.2), force3D: true}, '-=0.3')
          .fromTo('#cover-slogan', 0.8, {autoAlpha: 0, x: 500, y: -150}, {autoAlpha: 1, x: 0, y: 0, ease: Back.easeOut.config(1.2), force3D: true}, '-=0.8')
      }

      function hideCover() {
          var coverHide = new TimelineMax({
              onComplete: showPage2
          });
          coverHide.add('coverHideStart')
          .to('#cover-person', 0.6, {autoAlpha: 0, x: -640, y: -800, ease: Back.easeIn.config(0.8), force3D: true}, 'coverHideStart')
          .to('#cover-logo', 0.6, {autoAlpha: 0, x: -60, y: -150, ease: Back.easeIn.config(0.8), force3D: true}, 'coverHideStart')
          .to('#cover-slogan', 0.6, {autoAlpha: 0, x: 500, y: -150, ease: Back.easeIn.config(0.8), force3D: true}, 'coverHideStart')
          .to('#cover', 0.5, {autoAlpha: 0}, '-=0.1')
          .set('#cover', {display: 'none'})
      }

      function showPage2() {
          var page2Show = new TimelineMax({
              onComplete: function () {
                  showArrow();
                  // 上滑
                  touch.on($("#page2"), 'swipeup', function(ev){
                      SWIPEDIRECTION = 'up';
                  });

                  // 下滑
                  touch.on($("#page2"), 'swipedown', function(ev){
                      SWIPEDIRECTION = 'down';
                  });

                  touch.on($("#page2"), 'swipeup swipedown', function(ev){
                      console.log(ev.type + ' page2');
                      hideArrow();
                      hidePage2();
                  });
              }
          });
          page2Show.set('#page2', {autoAlpha: 1, display: 'block'})
          .fromTo('#page2', 0.6, {autoAlpha: 0}, {autoAlpha: 1})
          .add('page2Item')
          .fromTo('#item1', 0.6, {autoAlpha: 0, x: 640, y: -300}, {autoAlpha: 1, x: 0, y: 0, force3D: true}, 'page2Item-=0.3')
          .fromTo('#item2', 0.6, {autoAlpha: 0, x: -640, y: 300}, {autoAlpha: 1, x: 0, y: 0, force3D: true}, 'page2Item-=0.3')
      }

      function hidePage2() {
          var page2Hide = new TimelineMax({
              onComplete: function () {
                  if (SWIPEDIRECTION == 'up') {
                      showPage3();
                  }else if (SWIPEDIRECTION == 'down') {
                      showCover();
                  }
              }
          });
          page2Hide.add('page2HideStart')
          .to('#item1', 0.6, {autoAlpha: 0, x: 640, y: -300, force3D: true}, 'page2HideStart')
          .to('#item2', 0.6, {autoAlpha: 0, x: -640, y: 300, force3D: true}, 'page2HideStart')
          .to('#page2', 0.5, {autoAlpha: 0}, '-=0.1')
          .set('#page2', {display: 'none'})
      }

      function showPage3() {
          var page3Show = new TimelineMax({
              onComplete: function () {
                  showArrow();
                  // 上滑
                  touch.on($("#page3"), 'swipeup', function(ev){
                      SWIPEDIRECTION = 'up';
                  });

                  // 下滑
                  touch.on($("#page3"), 'swipedown', function(ev){
                      SWIPEDIRECTION = 'down';
                  });

                  touch.on($("#page3"), 'swipeup swipedown', function(ev){
                      console.log(ev.type + ' page3');
                      hideArrow();
                      hidePage3();
                  });
              }
          });
          page3Show.set('#page3', {autoAlpha: 1, display: 'block'})
          .fromTo('#page3', 0.6, {autoAlpha: 0}, {autoAlpha: 1})
          .add('page3Item')
          .fromTo('#item3', 0.6, {autoAlpha: 0, x: -640, y: -300}, {autoAlpha: 1, x: 0, y: 0, force3D: true}, 'page3Item-=0.3')
          .fromTo('#item4', 0.6, {autoAlpha: 0, x: 640, y: 300}, {autoAlpha: 1, x: 0, y: 0, force3D: true}, 'page3Item-=0.3')
      }

      function hidePage3() {
          var page3Hide = new TimelineMax({
              onComplete: function () {
                  if (SWIPEDIRECTION == 'up') {
                      showPage4();
                  }else if (SWIPEDIRECTION == 'down') {
                      showPage2();
                  }
              }
          });
          page3Hide.add('page3HideStart')
          .to('#item3', 0.6, {autoAlpha: 0, x: -640, y: -300, force3D: true}, 'page3HideStart')
          .to('#item4', 0.6, {autoAlpha: 0, x: 640, y: 300, force3D: true}, 'page3HideStart')
          .to('#page3', 0.5, {autoAlpha: 0}, '-=0.1')
          .set('#page3', {display: 'none'})
      }

      function showPage4() {
          var page4Show = new TimelineMax({
              onComplete: function () {
                  showArrow();
                  // 上滑
                  touch.on($("#page4"), 'swipeup', function(ev){
                      SWIPEDIRECTION = 'up';
                  });

                  // 下滑
                  touch.on($("#page4"), 'swipedown', function(ev){
                      SWIPEDIRECTION = 'down';
                  });

                  touch.on($("#page4"), 'swipeup swipedown', function(ev){
                      console.log(ev.type + ' page4');
                      hideArrow();
                      hidePage4();
                  });
              }
          });
          page4Show.set('#page4', {autoAlpha: 1, display: 'block'})
          .fromTo('#page4', 0.6, {autoAlpha: 0}, {autoAlpha: 1})
          .add('page4Item')
          .fromTo('#item5', 0.6, {autoAlpha: 0, x: -640}, {autoAlpha: 1, x: 0, y: 0}, 'page4Item-=0.3')
          .fromTo('#item6', 0.6, {autoAlpha: 0, x: 640}, {autoAlpha: 1, x: 0, y: 0}, 'page4Item-=0.3')
        }

        function hidePage4() {
            var page4Hide = new TimelineMax({
                onComplete: function () {
                    if (SWIPEDIRECTION == 'up') {
                        showPage5();
                    }else if (SWIPEDIRECTION == 'down') {
                        showPage3();
                    }
                }
            });
            page4Hide.add('page4HideStart')
            .to('#item5', 0.6, {autoAlpha: 0, x: -640, y: -300, force3D: true}, 'page4HideStart')
            .to('#item6', 0.6, {autoAlpha: 0, x: 640, y: 300, force3D: true}, 'page4HideStart')
            .to('#page4', 0.5, {autoAlpha: 0}, '-=0.1')
            .set('#page4', {display: 'none'})
        }

        function hidePage4() {
            var page4Hide = new TimelineMax({
                onComplete: function () {
                if (SWIPEDIRECTION == 'up') {
                    showPage5();
                }else if (SWIPEDIRECTION == 'down') {
                    showPage3();
                }
            }
        });
        page4Hide.add('page4HideStart')
        .to('#item5', 0.6, {autoAlpha: 0, x: -640, y: -300, force3D: true}, 'page4HideStart')
        .to('#item6', 0.6, {autoAlpha: 0, x: 640, y: 300, force3D: true}, 'page4HideStart')
        .to('#page4', 0.5, {autoAlpha: 0}, '-=0.1')
        .set('#page4', {display: 'none'})
        }

      function showPage5() {
          var page5Show = new TimelineMax({
              onComplete: function () {
                  // 下滑
                  touch.on($("#page5"), 'swipedown', function(ev){
                      console.log(ev.type + ' page5');
                      hidePage5();
                  });
              }
          });
          page5Show.set('#page5', {autoAlpha: 1, display: 'block'})
          .fromTo('#page5', 0.6, {autoAlpha: 0}, {autoAlpha: 1})
          .fromTo('#item7', 0.6, {autoAlpha: 0, x: 600, y: 300}, {autoAlpha: 1, x: 0, y: 0}, '-=0.3')
          .fromTo('#qrcode', 0.6, {autoAlpha: 0, x: -300}, {autoAlpha: 1, x: 0, ease: Back.easeOut.config(0.8)}, '-=0.2')
          .fromTo('#qr-des', 0.6, {autoAlpha: 0, x: 300}, {autoAlpha: 1, x: 0, ease: Back.easeOut.config(0.8)}, '-=0.6')
      }

      function hidePage5() {
          var page5Hide = new TimelineMax({
              onComplete: showPage4
          });
          page5Hide.add('page5HideStart')
          .to('#qrcode', 0.6, {autoAlpha: 0, x: -300, force3D: true}, 'page5HideStart')
          .to('#qr-des', 0.6, {autoAlpha: 0, x: 300, force3D: true}, 'page5HideStart')
          .to('#item7', 0.6, {autoAlpha: 0, x: 600, y: 300, force3D: true}, 'page5HideStart')
          .to('#page5', 0.5, {autoAlpha: 0}, '-=0.1')
          .set('#page5', {display: 'none'})
      }

    });  //Document ready
})(jQuery);
