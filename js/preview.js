'use strict';

(function () {
  // отображение фото в поноэкранном режиме
  var showGalleryOverlay = function () {
    window.gallery.galleryOverlay.classList.remove('hidden');
  };

  // отключение отображения фото в поноэкранном режиме
  var hideGalleryOverlay = function () {
    window.gallery.galleryOverlay.classList.add('hidden');
  };

  // заполнение формы в полноэкранном режиме данными о фото
  var fillGalleryOverlay = function (target, nextSibling) {
    window.data.creatDOMElement(window.gallery.galleryOverlay, '.gallery-overlay-image').src = target.src;
    window.data.creatDOMElement(window.gallery.galleryOverlay, '.comments-count').textContent = window.data.creatDOMElement(nextSibling, '.picture-comments').textContent.split('  ').length;
    window.data.creatDOMElement(window.gallery.galleryOverlay, '.likes-count').textContent = window.data.creatDOMElement(nextSibling, '.picture-likes').textContent;
  };

  // вывод фото на полный экран по клику
  var onPictureClick = function (cEvent) {
    // отменяем действие браузера при нажатии на ссылку
    cEvent.preventDefault();
    var target = cEvent.target;

    // при нажатии на картинку
    if (target.tagName === 'IMG') {
      // получаем данные о фото из следующего 'брата' .picture-stats
      var nextSibling = target.nextElementSibling;

      // заполняем
      fillGalleryOverlay(target, nextSibling);

      // отображаем
      showGalleryOverlay();

      // при клике на span с комментариями
    } else if (target.tagName === 'SPAN') {
      // получаем данные о фото
      // находим picture
      var root = cEvent.path[2];
      // находим img для информации о пути к фото
      var image = root.querySelector('img');
      // находим .picture-stats для дополнительной информции
      var span = image.nextElementSibling;

      fillGalleryOverlay(image, span);

      showGalleryOverlay();
    }
  };

  // вывод фото на полный экран при нажатии Enter
  var onEnterPress = function (eEvent) {
    if (eEvent.keyCode === window.data.ENTER_KEYCODE) {
      eEvent.preventDefault();

      var target = eEvent.target;
      var image = target.children[0];
      var span = image.nextElementSibling;

      fillGalleryOverlay(image, span);

      showGalleryOverlay();
    }
  };

  // отображение фото в полноэкранном режиме по клику и по нажатие enter
  window.gallery.pictures.addEventListener('click', onPictureClick);
  window.gallery.pictures.addEventListener('keydown', onEnterPress);


  // отключение полноэкранного режима фото и формы загрузки по нажатию Esc
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === window.data.ESC_KEYCODE) {
      hideGalleryOverlay();
    }
  }
  );

  // отключение полноэкранного режима фото при нажатии на крестик
  window.gallery.galleryOverlayClose.addEventListener('click', function () {
    hideGalleryOverlay();
  }
  );

  // отключение полноэкранного режима фото при выборе крестика и нажтии Enter
  window.gallery.galleryOverlayClose.addEventListener('keydown', function () {
    if (event.keyCode === window.data.ENTER_KEYCODE) {
      hideGalleryOverlay();
    }
  }
  );

})();
