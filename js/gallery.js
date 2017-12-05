'use strict';

(function () {

  window.gallery = {
    // DOM элементы
    pictureTemplate: window.data.creatDOMElement(document, '#picture-template').content,
    pictures: window.data.creatDOMElement(document, '.pictures'),
    galleryOverlay: window.data.creatDOMElement(document, '.gallery-overlay'),
    galleryOverlayClose: window.data.creatDOMElement(document, '.gallery-overlay-close')
  };


  // массив хранящий информацию о фотографиях
  var photos = window.data.generatePhotosData();

  var fragment = document.createDocumentFragment();

  for (var l = 0; l < 25; l++) {
    fragment.appendChild(window.picture.generatePhoto(photos[l]));

  }

  window.gallery.pictures.appendChild(fragment);
})();

