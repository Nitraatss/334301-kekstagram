'use strict';

(function () {

  window.gallery = {
    pictureTemplate: window.data.createDOMElement(document, '#picture-template').content,
    pictures: window.data.createDOMElement(document, '.pictures'),
    galleryOverlay: window.data.createDOMElement(document, '.gallery-overlay'),
    galleryOverlayClose: window.data.createDOMElement(document, '.gallery-overlay-close'),

    generateGallery: function (photosData) {
      var fragment = document.createDocumentFragment();
      while (window.gallery.pictures.firstChild) {
        window.gallery.pictures.removeChild(window.gallery.pictures.firstChild);
      }

      for (var l = 0; l < 25; l++) {
        fragment.appendChild(window.picture.generate(photosData[l]));
      }
      window.gallery.pictures.appendChild(fragment);
    },

    allPhotos: []
  };

  window.backend.load(
      function (serverData) {
        window.gallery.allPhotos = serverData;

        window.gallery.generateGallery(serverData);

        window.galleryFilters.filters.classList.remove('filters-inactive');
      },
      function (errorMessage) {
        window.data.showError(errorMessage);
      }
  );
})();

