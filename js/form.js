'use strict';

(function () {
  window.form = {
    formUploadSelectImage: function () {
      return (window.data.creatDOMElement(document, '#upload-select-image'));
    },
    uploadOverlay: function () {
      return (window.data.creatDOMElement(window.form.formUploadSelectImage(), '.upload-overlay'));
    },
    effectPreview: function () {
      return (window.data.creatDOMElement(window.form.uploadEffect(), '.effect-image-preview'));
    },
    uploadEffect: function () {
      return (window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-effect'));
    }
  };

  // отключение отображения формы загрузки
  var hideUploadOverlay = function () {
    window.form.uploadOverlay().classList.add('hidden');
  };

  // включение отображения формы загрузки
  var showUploadOverlay = function () {
    window.form.uploadOverlay().classList.remove('hidden');
    window.initializeScale.changeTargetScale(window.form.effectPreview(), 55);
    window.data.creatDOMElement(document, '.upload-effect-level').classList.add('hidden');
  };

  // проверка хэш-тегов
  var checkUploadHashtags = function () {
    var hashtags = uploadHashtags.value.split(' ');
    var errors = 0;

    if (uploadHashtags.value !== '') {
      for (var k = 0; k < hashtags.length; k++) {
        var hashSymbols = hashtags[k].match(/#/gi);

        if (hashtags[k][0] !== '#') {
          uploadHashtags.setCustomValidity('# должен быть первым символом');
          errors = 1;
          break;
        } else if (hashtags[k].length < 3) {
          uploadHashtags.setCustomValidity('Длина хэш-тега минимум 2 символа');
          errors = 1;
          break;
        } else if (hashtags[k].length > 21) {
          uploadHashtags.setCustomValidity('Максимальная длина хэш-тэга 20 символов');
          errors = 1;
          break;
        } else if (hashtags.length > 5) {
          uploadHashtags.setCustomValidity('Максимум 5 хэш-тегов');
          errors = 1;
          break;
        } else if (hashSymbols.length > 1) {
          uploadHashtags.setCustomValidity('В хэш-теге может быть только один символ #');
          errors = 1;
        } else {
          for (var m = k + 1; m < hashtags.length; m++) {
            if ((hashtags[m].toLowerCase()) === (hashtags[k].toLowerCase())) {
              uploadHashtags.setCustomValidity('Уберите повторяющиеся хэш-теги');
              errors = 1;
              break;
            }
          }
        }
      }
    }

    if (errors === 0) {
      uploadHashtags.setCustomValidity('');
    }
  };

  var fieldUploadFile = window.data.creatDOMElement(window.form.formUploadSelectImage(), '#upload-file');
  var uploadCancel = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-cancel');
  var uploadSubmit = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-submit');
  var uploadDescription = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-description');
  var uploadHashtags = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-hashtags');

  // отключение полноэкранного формы загрузки по нажатию Esc
  document.addEventListener('keydown', function (key) {
    if (key.keyCode === window.data.ESC_KEYCODE && key.target !== uploadDescription) {
      hideUploadOverlay();
    }
  }
  );

  // При изменении значения поля загрузки фотографии #upload-file показывается форма кадрирования изображения
  fieldUploadFile.addEventListener('change', function () {
    showUploadOverlay();
  }
  );

  // закрытие формы загрузки при нажатии на крестик
  uploadCancel.addEventListener('click', function () {
    hideUploadOverlay();
  }
  );

  // отправка формы по клику
  uploadSubmit.addEventListener('click', function (subEvent) {
    subEvent.preventDefault();

    window.backend.save(
        new FormData(window.form.formUploadSelectImage()),
        function () {
          hideUploadOverlay();
        },
        function (errorMessage) {
          window.data.showError(errorMessage);
        }
    );

    checkUploadHashtags();
  }
  );
}
)();
