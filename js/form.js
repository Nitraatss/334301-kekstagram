'use strict';

(function () {
  window.form = {
    formUploadSelectImage: function () {
      return (window.data.creatDOMElement(document, '#upload-select-image'));
    },
    uploadOverlay: function () {
      return (window.data.creatDOMElement(window.form.formUploadSelectImage(), '.upload-overlay'));
    },
    effectImagePreview: function () {
      return (window.data.creatDOMElement(window.form.uploadEffect(), '.effect-image-preview'));
    },
    uploadEffect: function () {
      return (window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-effect'));
    }
  };

  // включение отображения формы загрузки
  var showUploadOverlay = function () {
    window.form.uploadOverlay().classList.remove('hidden');

    // закрытие формы загрузки при нажатии на крестик
    uploadCancel.addEventListener('click', onCancelClick);
    // отключение полноэкранного формы загрузки по нажатию Esc
    document.addEventListener('keydown', onKeyESC);
    // отправка формы по клику
    uploadSubmit.addEventListener('click', onSubmitClick);
    uploadHashtags.addEventListener('input', onHashtagsInput);
  };

  // отключение отображения формы загрузки
  var hideUploadOverlay = function () {
    setDefaultParams();
    window.form.uploadOverlay().classList.add('hidden');

    document.removeEventListener('keydown', onKeyESC);
    document.removeEventListener('click', onCancelClick);
  };

  var onKeyESC = function (key) {
    if (key.keyCode === window.data.ESC_KEYCODE && key.target !== uploadDescription) {
      hideUploadOverlay();
    }
  };

  var onCancelClick = function () {
    hideUploadOverlay();
  };

  var setDefaultParams = function () {
    // значения по умолчанию
    fieldUploadFile.value = '';
    imgOnPreview.classList = 'effect-image-preview';
    imgOnPreview.style.filter = null;
    imgOnPreview.src = '#';

    effectPreview.forEach(function (element) {
      element.style.backgroundImage = '#';
    });

    window.initializeScale.changeTargetScale(window.form.effectImagePreview(), 55);
    window.data.creatDOMElement(document, '#upload-effect-none').checked = true;
    window.data.creatDOMElement(document, '.upload-effect-level').classList.add('hidden');
  };

  // отправка формы по клику и проверка хэштегов
  var onSubmitClick = function (subEvent) {
    subEvent.preventDefault();

    if (!checkUploadHashtags()) {
      window.backend.save(
          new FormData(window.form.formUploadSelectImage()),
          function () {
            hideUploadOverlay();
          },
          function (errorMessage) {
            window.data.showError(errorMessage);
          });

      uploadSubmit.removeEventListener('click', onSubmitClick);
      uploadHashtags.removeEventListener('input', onHashtagsInput);
    } else {
      window.form.formUploadSelectImage().reportValidity();
    }
  };

  var onHashtagsInput = function () {
    uploadHashtags.setCustomValidity('');
    window.form.formUploadSelectImage().reportValidity();
  };


  // проверка хэш-тегов
  var checkUploadHashtags = function () {
    var hashtags = uploadHashtags.value.split(' ').filter(function (element) {
      return element !== '';
    });
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

    return errors;
  };

  var uploadForm = window.form.formUploadSelectImage();
  var fieldUploadFile = window.data.creatDOMElement(uploadForm, '#upload-file');
  var uploadCancel = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-cancel');
  var uploadSubmit = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-submit');
  var uploadDescription = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-description');
  var uploadHashtags = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-hashtags');
  var uploadFormPreview = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-form-preview');
  var imgOnPreview = window.data.creatDOMElement(uploadFormPreview, 'img');
  var effectPreview = document.querySelectorAll('.upload-effect-preview');

  uploadForm.dropzone = 'move';

  // разрешаем перетаскивание в поле загрузки
  uploadForm.addEventListener('dragover', function (dover) {
    dover.preventDefault();
    return false;
  });

  // сброс элемента
  uploadForm.addEventListener('drop', function (ddrop) {
    ddrop.preventDefault();

    if (ddrop.dataTransfer.files) {
      // сохраняем файл перенесенный с рабочего стола в поле файлов
      fieldUploadFile.files = ddrop.dataTransfer.files;
    }
  });

  // При изменении значения поля загрузки фотографии #upload-file показывается форма кадрирования изображения
  fieldUploadFile.addEventListener('change', function () {
    showUploadOverlay();
    var reader = new FileReader();
    var file = fieldUploadFile.files[0];

    // отображение файла в превью
    reader.onloadend = function () {
      imgOnPreview.src = reader.result;
      // изменение мини-превью эффектов
      effectPreview.forEach(function (element) {
        element.style.backgroundImage = 'url(\'' + reader.result + '\')';
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
}
)();
