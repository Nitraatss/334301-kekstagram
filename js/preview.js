'use strict';

(function () {
  var showGalleryOverlay = function () {
    window.gallery.galleryOverlay.classList.remove('hidden');

    document.addEventListener('keydown', onESCClose);

    window.gallery.galleryOverlayClose.addEventListener('click', onClickClose);

    window.gallery.galleryOverlayClose.addEventListener('keydown', onEnterClose);
  };

  var hideGalleryOverlay = function () {
    window.gallery.galleryOverlay.classList.add('hidden');
  };

  var onESCClose = function (evtEsc) {
    if (evtEsc.keyCode === window.data.ESC_KEYCODE) {
      hideGalleryOverlay();
      removeEvtListeners();
    }
  };

  var onEnterClose = function (enterEvent) {
    if (enterEvent.keyCode === window.data.ENTER_KEYCODE) {
      hideGalleryOverlay();
      removeEvtListeners();
    }
  };

  var onClickClose = function () {
    hideGalleryOverlay();
    removeEvtListeners();
  };

  var removeEvtListeners = function () {
    document.removeEventListener('keydown', onESCClose);
    window.gallery.galleryOverlayClose.removeEventListener('click', onClickClose);
    window.gallery.galleryOverlayClose.removeEventListener('keydown', onEnterClose);
  };

  var fillGalleryOverlay = function (target, nextSibling) {
    window.data.createDOMElement(window.gallery.galleryOverlay, '.gallery-overlay-image').src = target.src;
    window.data.createDOMElement(window.gallery.galleryOverlay, '.comments-count').textContent = window.data.createDOMElement(nextSibling, '.picture-comments').textContent.split('  ').length;
    window.data.createDOMElement(window.gallery.galleryOverlay, '.likes-count').textContent = window.data.createDOMElement(nextSibling, '.picture-likes').textContent;
  };

  var onPictureClick = function (evtPictureClick) {
    evtPictureClick.preventDefault();
    var target = evtPictureClick.target;

    if (target.tagName === 'IMG') {
      var nextSibling = target.nextElementSibling;

      fillGalleryOverlay(target, nextSibling);

      showGalleryOverlay();

    } else if (target.tagName === 'SPAN') {
      var root = evtPictureClick.path[2];
      var image = root.querySelector('img');
      var span = image.nextElementSibling;

      fillGalleryOverlay(image, span);

      showGalleryOverlay();
    }
  };

  var onEnterPress = function (evtEntr) {
    if (evtEntr.keyCode === window.data.ENTER_KEYCODE) {
      evtEntr.preventDefault();
      var target = evtEntr.target;

      if (target.tagName === 'A') {
        var image = target.children[0];
        var span = image.nextElementSibling;

        fillGalleryOverlay(image, span);

        showGalleryOverlay();
      } else if (target.tagName === 'IMG') {
        var nextSibling = target.nextElementSibling;

        fillGalleryOverlay(target, nextSibling);

        showGalleryOverlay();
      }
    }
  };

  window.gallery.pictures.addEventListener('click', onPictureClick);
  window.gallery.pictures.addEventListener('keydown', onEnterPress);
})();
