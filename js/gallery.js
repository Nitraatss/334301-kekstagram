'use strict';

(function () {

  window.gallery = {
    // DOM элементы
    pictureTemplate: window.data.creatDOMElement(document, '#picture-template').content,
    pictures: window.data.creatDOMElement(document, '.pictures'),
    galleryOverlay: window.data.creatDOMElement(document, '.gallery-overlay'),
    galleryOverlayClose: window.data.creatDOMElement(document, '.gallery-overlay-close'),

    // генерация галереи
    generateGallery: function (photosData) {
      var fragment = document.createDocumentFragment();
      while (window.gallery.pictures.firstChild) {
        window.gallery.pictures.removeChild(window.gallery.pictures.firstChild);
      }

      for (var l = 0; l < 25; l++) {
        fragment.appendChild(window.picture.generatePhoto(photosData[l]));
      }
      window.gallery.pictures.appendChild(fragment);
    },

    allPhotos: []
  };

  window.backend.load(
      // вывод 25 изображений
      function (serverData) {
        // сохранение иформации о фото в массив
        window.gallery.allPhotos = serverData;

        // отображение фото
        window.gallery.generateGallery(serverData);
      },
      // вывод информации об ошибке
      function (errorMessage) {
        window.data.showError(errorMessage);
      }
  );
})();

