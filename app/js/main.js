/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/

(function($) {
    $(document).ready(function() {
        console.log('Ready');
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        }); // 禁止页面滚动

    });  //Document ready
})(jQuery);
