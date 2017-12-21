'use strict';

(function () {
  window.form = {
    formUploadSelectImage: function () {
      return (window.data.createDOMElement(document, '#upload-select-image'));
    },
    uploadOverlay: function () {
      return (window.data.createDOMElement(window.form.formUploadSelectImage(), '.upload-overlay'));
    },
    effectImagePreview: function () {
      return (window.data.createDOMElement(window.form.uploadEffect(), '.effect-image-preview'));
    },
    uploadEffect: function () {
      return (window.data.createDOMElement(window.form.uploadOverlay(), '.upload-effect'));
    }
  };

  var showUploadOverlay = function () {
    window.form.uploadOverlay().classList.remove('hidden');
    window.initializeScale.changeScale(window.form.effectImagePreview(), 100);
    window.data.createDOMElement(document, '#upload-effect-none').checked = true;
    window.data.createDOMElement(document, '.upload-effect-level').classList.add('hidden');

    uploadCancel.addEventListener('click', onCancelClick);
    document.addEventListener('keydown', onKeyESC);
    uploadSubmit.addEventListener('click', onSubmitClick);
    uploadHashtags.addEventListener('input', onHashtagsInput);
  };

  var hideUploadOverlay = function () {
    setDefaultParams();
    window.form.uploadOverlay().classList.add('hidden');

    document.removeEventListener('keydown', onKeyESC);
    document.removeEventListener('click', onCancelClick);
  };

  var onKeyESC = function (evtEsc) {
    if (evtEsc.keyCode === window.data.ESC_KEYCODE && evtEsc.target !== uploadDescription) {
      hideUploadOverlay();
    }
  };

  var onCancelClick = function () {
    hideUploadOverlay();
  };

  var setDefaultParams = function () {
    fieldUploadFile.value = '';
    imgOnPreview.classList = 'effect-image-preview';
    imgOnPreview.style.filter = null;
    imgOnPreview.src = '#';

    effectPreview.forEach(function (element) {
      element.style.backgroundImage = '#';
    });
  };

  var onSubmitClick = function (evtSubmitClick) {
    evtSubmitClick.preventDefault();

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
  var fieldUploadFile = window.data.createDOMElement(uploadForm, '#upload-file');
  var uploadCancel = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-form-cancel');
  var uploadSubmit = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-form-submit');
  var uploadDescription = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-form-description');
  var uploadHashtags = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-form-hashtags');
  var uploadFormPreview = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-form-preview');
  var imgOnPreview = window.data.createDOMElement(uploadFormPreview, 'img');
  var effectPreview = document.querySelectorAll('.upload-effect-preview');

  uploadForm.dropzone = 'move';

  uploadForm.addEventListener('dragover', function (evtDragover) {
    evtDragover.preventDefault();
    return false;
  });

  uploadForm.addEventListener('drop', function (evtDrop) {
    evtDrop.preventDefault();

    if (evtDrop.dataTransfer.files) {
      fieldUploadFile.files = evtDrop.dataTransfer.files;
    }
  });

  fieldUploadFile.addEventListener('change', function () {
    showUploadOverlay();
    var reader = new FileReader();
    var file = fieldUploadFile.files[0];

    reader.onloadend = function () {
      imgOnPreview.src = reader.result;
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
