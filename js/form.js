'use strict';

(function () {
  // отключение отображения формы загрузки
  var hideUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
  };

  // включение отображения формы загрузки
  var showUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
  };

  // увеличение масштаба изображения в форме кадрирования
  var onResizeButtonIncClick = function () {
    var resize = parseInt(resizeValue.value, 10) + 25;

    if (resize > 99) {
      resize = 100;
    }

    effectPreview.style.transform = ('scale(' + (resize / 100) + ')');
    resizeValue.value = resize + '%';
  };

  // уменьшение масштаба изображения
  var onResizeButtonDecClick = function () {
    var resize = parseInt(resizeValue.value, 10) - 25;

    if (resize < 26) {
      resize = 25;
    }

    effectPreview.style.transform = ('scale(' + (resize / 100) + ')');
    resizeValue.value = resize + '%';
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

  var formUploadSelectImage = window.data.creatDOMElement(document, '#upload-select-image');
  var fieldUploadFile = window.data.creatDOMElement(formUploadSelectImage, '#upload-file');
  var uploadOverlay = window.data.creatDOMElement(formUploadSelectImage, '.upload-overlay');
  var uploadCancel = window.data.creatDOMElement(uploadOverlay, '.upload-form-cancel');
  var uploadSubmit = window.data.creatDOMElement(uploadOverlay, '.upload-form-submit');
  var uploadDescription = window.data.creatDOMElement(uploadOverlay, '.upload-form-description');
  var resizeButtonInc = window.data.creatDOMElement(uploadOverlay, '.upload-resize-controls-button-inc');
  var resizeButtonDec = window.data.creatDOMElement(uploadOverlay, '.upload-resize-controls-button-dec');
  var resizeValue = window.data.creatDOMElement(uploadOverlay, '.upload-resize-controls-value');
  var uploadEffect = window.data.creatDOMElement(uploadOverlay, '.upload-effect');
  var effectPreview = window.data.creatDOMElement(uploadEffect, '.effect-image-preview');
  var uploadHashtags = window.data.creatDOMElement(uploadOverlay, '.upload-form-hashtags');

  // отключение полноэкранного формы загрузки по нажатию Esc
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === window.data.ESC_KEYCODE && event.target !== uploadDescription) {
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

  // увеличение масштаба фото
  resizeButtonInc.addEventListener('click', onResizeButtonIncClick);

  // уменьшение масштаба фото
  resizeButtonDec.addEventListener('click', onResizeButtonDecClick);

  // наложение эффектов на фото
  uploadEffect.addEventListener('click', function (event) {
    if (event.target.type === 'radio') {
      effectPreview.classList = 'upload-form-preview';
      var c = event.target.id.substring(7);
      effectPreview.classList.add(c);
    }
  }
  );

  // отправка формы по клику
  uploadSubmit.addEventListener('click', function () {
    checkUploadHashtags();
  }
  );
}
)();
