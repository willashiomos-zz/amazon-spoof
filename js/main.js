var dir = 1;
var MIN_TOP = 200;
var MAX_TOP = 350;
var resizeThreshold = 799;
var priorW = $(window).width();
var loadW = priorW;

var loadEvents = function () {};

function loadMoreEmployee() {
  $(".yt-video-container a").click(function (e) {
    var videoURL = $(this).attr("href");
    if (videoURL.indexOf("?") == -1) {
      videoURL += "?";
    }
    if (videoURL.indexOf("autoplay") == -1) {
      videoURL += "&autoplay=1";
    }
    if (videoURL.indexOf("rel") == -1) {
      videoURL += "&rel=0";
    }
    $(this)
      .parent()
      .html(
        '<iframe width="560" title="Youtube video -' +
          $(this).attr("href") +
          ' " height="315" src="' +
          videoURL +
          '" frameborder="0" allowfullscreen=""></iframe>'
      );
    e.preventDefault();
    $("#video-player iframe").attr("src", $(this).attr("href"));
  });
}

// document ready load events
$(function () {
  loadEvents();
});
