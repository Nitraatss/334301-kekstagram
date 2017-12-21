'use strict';

(function () {
  window.galleryFilters = {
    filters: window.data.createDOMElement(document, '.filters')
  };

  var sortByLikes = function (galleryLikes) {
    galleryLikes.sort(function (left, right) {
      if ((right.likes - left.likes) > 0) {
        return 1;
      } else if (right.likes - left.likes < 0) {
        return -1;
      } else if (sortBySrc(left, right)) {
        return sortBySrc();
      } else {
        return 0;
      }
    });

    window.gallery.generateGallery(galleryLikes);
  };

  var sortByComments = function (galleryComments) {
    galleryComments.sort(function (left, right) {
      if ((right.comments.length - left.comments.length) > 0) {
        return 1;
      } else if (right.comments.length - left.comments.length < 0) {
        return -1;
      } else if (sortBySrc(left, right)) {
        return sortBySrc();
      } else {
        return 0;
      }
    });

    window.gallery.generateGallery(galleryComments);
  };

  var sortBySrc = function (leftItem, rightItem) {
    if (leftItem.src > rightItem.src) {
      return 1;
    } else if (leftItem.src < rightItem.src) {
      return -1;
    } else {
      return null;
    }
  };

  var arrayRandomSort = function (arrayR) {
    arrayR.sort(function () {
      return Math.random() - 0.5;
    });
  };

  var debounce = function (func) {
    var timeout;

    if (!timeout) {
      timeout = window.setTimeout(
          function () {
            func();
          }, 500);
    } else {
      window.clearTimeout(timeout);
    }
  };

  var onFilterChange = function (evtFilterChange) {
    var target = evtFilterChange.target;
    var filteredGallery = window.gallery.allPhotos.concat();

    if (target === recommended) {
      debounce(function () {
        window.gallery.generateGallery(filteredGallery);
      });
    } else if (target === popular) {
      debounce(function () {
        sortByLikes(filteredGallery);
      });
    } else if (target === discussed) {
      debounce(function () {
        sortByComments(filteredGallery);
      });
    } else if (target === random) {
      debounce(function () {
        arrayRandomSort(filteredGallery);
        window.gallery.generateGallery(filteredGallery);
      });
    }
  };

  var recommended = window.data.createDOMElement(window.galleryFilters.filters, '#filter-recommend');
  var popular = window.data.createDOMElement(window.galleryFilters.filters, '#filter-popular');
  var discussed = window.data.createDOMElement(window.galleryFilters.filters, '#filter-discussed');
  var random = window.data.createDOMElement(window.galleryFilters.filters, '#filter-random');

  window.galleryFilters.filters.addEventListener('change', onFilterChange);
})();
