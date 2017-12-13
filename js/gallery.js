'use strict';

(function () {

  window.gallery = {
    // DOM элементы
    pictureTemplate: window.data.creatDOMElement(document, '#picture-template').content,
    pictures: window.data.creatDOMElement(document, '.pictures'),
    galleryOverlay: window.data.creatDOMElement(document, '.gallery-overlay'),
    galleryOverlayClose: window.data.creatDOMElement(document, '.gallery-overlay-close')
  };

  window.backend.load(
      // вывод 25 изображений
      function (serverData) {
        var fragment = document.createDocumentFragment();

        for (var l = 0; l < 25; l++) {
          fragment.appendChild(window.picture.generatePhoto(serverData[l]));
        }

        window.gallery.pictures.appendChild(fragment);
      },
      // вывод информации об ошибке
      function (errorMessage) {
        window.data.showError(errorMessage);
      }
  );
})();

