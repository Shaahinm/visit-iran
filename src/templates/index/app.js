const css = require('./../../style/app.scss');

$(function() {
    /*$(window).resize(function(){a()});function a(){var b=$("#IranMap .list").height();var c=$("#IranMap .list").width();if(b>c){$("#IranMap svg").height(c).width(c)}else{$("#IranMap svg").height(b).width(b)}}a();*/
    $("#IranMap svg g path").hover(
      function() {
        var c = $(this).attr("class");
        var b = $(this)
          .parent("g")
          .attr("class");
        var d = $("#IranMap .list ." + b + " ." + c + " a").html();
        if (d) {
          $("#IranMap .list ." + b + " ." + c + " a").addClass("hover");
          $("#IranMap .show-title")
            .html(d)
            .css({ display: "block" });
        }
      },
      function() {
        $("#IranMap .list a").removeClass("hover");
        $("#IranMap .show-title")
          .html("")
          .css({ display: "none" });
      }
    );
    /*$("#IranMap .list ul li ul li a").hover(function(){var e=$(this).parent("li").attr("class");var c=$(this).parent("li").parent("ul").parent("li").attr("class");var b="#IranMap svg g."+c+" path."+e;var d=$(b).attr("class");$(b).attr("class",d+" hover")},function(){var e=$(this).parent("li").attr("class");var c=$(this).parent("li").parent("ul").parent("li").attr("class");var b="#IranMap svg g."+c+" path."+e;var d=$(b).attr("class");$(b).attr("class",d.replace(" hover",""))});*/
    $("#IranMap").mousemove(function(d) {
      var c = 0;
      var h = 0;
      if (!d) {
        var d = window.event;
      }
      if (d.pageX || d.pageY) {
        c = d.pageX;
        h = d.pageY;
      } else {
        if (d.clientX || d.clientY) {
          c =
            d.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          h =
            d.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
      }
      if ($("#IranMap .show-title").html()) {
        var f = $(this).offset();
        var b = c - f.left + 25 + "px";
        var g = h - f.top - 5 + "px";
        $("#IranMap .show-title").css({ left: b, top: g });
      }
    });  
  });
  