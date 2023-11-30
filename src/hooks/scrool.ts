export function disableScroll() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}
export function enableScroll() {
  window.onscroll = null;
}
