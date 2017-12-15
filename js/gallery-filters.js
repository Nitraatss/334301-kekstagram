'use strict';

(function () {
  // сортировка по количеству лайков
  var sortByLikes = function (galleryL) {
    galleryL.sort(function (left, right) {
      if ((right.likes - left.likes) > 0) {
        return 1;
      } else if (right.likes - left.likes < 0) {
        return -1;
      } else {
        if (left.src > right.src) {
          return 1;
        } else if (left.src < right.src) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    window.gallery.generateGallery(galleryL);
  };

  // сортировка по количеству комметариев
  var sortByComments = function (galleryC) {
    galleryC.sort(function (left, right) {
      if ((right.comments.length - left.comments.length) > 0) {
        return 1;
      } else if (right.comments.length - left.comments.length < 0) {
        return -1;
      } else {
        if (left.src > right.src) {
          return 1;
        } else if (left.src < right.src) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    window.gallery.generateGallery(galleryC);
  };

  // случайная перестановка элементов массива
  var arrayRandomSort = function (arrayR) {
    arrayR.sort(function () {
      return Math.random() - 0.5;
    });
  };

  // устранение дребезга
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

  // фильтрация галереи
  var onFilterChange = function (changeEvent) {
    var target = changeEvent.target;
    var filteredGallery = window.gallery.allPhotos.concat();

    if (target === recommended) {
      // отображение фото по умолчанию
      debounce(function () {
        window.gallery.generateGallery(filteredGallery);
      });
    } else if (target === popular) {
      // сортировка по лайкам
      debounce(function () {
        sortByLikes(filteredGallery);
      });
    } else if (target === discussed) {
      // сортировка по комметариям
      debounce(function () {
        sortByComments(filteredGallery);
      });
    } else if (target === random) {
      // случайная перестановка фото
      debounce(function () {
        arrayRandomSort(filteredGallery);
        window.gallery.generateGallery(filteredGallery);
      });
    }
  };

  window.galleryFilters = {
    galleryFiltersForm: window.data.creatDOMElement(document, '.filters')
  };
  // DOM элементы формы с фильтрами
  var recommended = window.data.creatDOMElement(window.galleryFilters.galleryFiltersForm, '#filter-recommend');
  var popular = window.data.creatDOMElement(window.galleryFilters.galleryFiltersForm, '#filter-popular');
  var discussed = window.data.creatDOMElement(window.galleryFilters.galleryFiltersForm, '#filter-discussed');
  var random = window.data.creatDOMElement(window.galleryFilters.galleryFiltersForm, '#filter-random');

  // обработчик событий на изменение состояния чекбокса
  window.galleryFilters.galleryFiltersForm.addEventListener('change', onFilterChange);
})();
