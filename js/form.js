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
  var effectControls = window.data.creatDOMElement(uploadOverlay, '.upload-effect-controls');
  var effectsLevel = window.data.creatDOMElement(effectControls, '.upload-effect-level');
  
  var effectValue = window.data.creatDOMElement(effectControls, '.upload-effect-level-value');
  var effectPin = window.data.creatDOMElement(effectControls, '.upload-effect-level-pin');
  var effectValLine = window.data.creatDOMElement(effectControls, '.upload-effect-level-val');
 

  var maxX;
  var effectName;
  effectsLevel.classList.add('hidden');
  effectPin.classList.add('hidden');
  effectValLine.classList.add('hidden');
  effectValue.classList.add('hidden');
  var afterEffectImage;

  
  

  effectPin.addEventListener('mousedown', function (dEvent) {
    dEvent.preventDefault();
    console.log(effectName);

    // задаем стартовые координаты
    var startCoords = {
      X: dEvent.clientX
    };

    // перемещаем  пин
    var onMouseMove = function (mEvent) {
      mEvent.preventDefault();

      // расчет смещения
      var move = {
        moveX: startCoords.X - mEvent.clientX,
      };

      // переопределение стартовой позиции
      startCoords = {
        X: mEvent.clientX,
      };

      // смена позиции по мере движения
      if ((effectPin.offsetLeft - move.moveX) < maxX)
      
      {
        if ((effectPin.offsetLeft - move.moveX) > 0){
        effectPin.style.left = ((effectPin.offsetLeft - move.moveX)*100)/maxX + '%';
          effectValue.value = Math.floor(((effectPin.offsetLeft - move.moveX) * 100) / maxX) ;
          effectValLine.style.width = ((effectPin.offsetLeft - move.moveX) * 100) / maxX + '%';
          
          


         
          
        
        }
        else {
          effectPin.style.left = '0%';
          effectValLine.style.width = '0%';
          effectValue.value=0;
        }
      }
      else {
        effectPin.style.left = '100%';
        effectValue.value = 100;
        effectValLine.style.width = '100%';
      }

      if (effectName === 'effect-chrome') {
        afterEffectImage.style.filter = 'grayscale(' + (effectValue.value / 100) + ')';
      }

      if (effectName === 'effect-sepia') {
        afterEffectImage.style.filter = 'sepia(' + (effectValue.value / 100) + ')';
      }

      if (effectName === 'effect-marvin') {
        afterEffectImage.style.filter = 'invert(' + (effectValue.value) + '%)';
      }

      if (effectName === 'effect-phobos') {
        afterEffectImage.style.filter = 'blur(' + ((effectValue.value * 3) / 100) + 'px)';
      }

      if (effectName === 'effect-heat') {
        afterEffectImage.style.filter = 'brightness(' + ((effectValue.value * 3) / 100) + ')';
      }
    };

    var onMouseUp = function (uEvent) {
      uEvent.preventDefault();
      console.log(startCoords.X);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  );
  
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
      effectName = event.target.id.substring(7);
      effectPreview.classList.add(effectName);

      if (effectName === 'effect-chrome') {
        afterEffectImage = window.data.creatDOMElement(uploadEffect, '.effect-chrome');
      }

      if (effectName === 'effect-sepia') {
        afterEffectImage = window.data.creatDOMElement(uploadEffect, '.effect-sepia');
      }

      if (effectName === 'effect-marvin') {
        afterEffectImage = window.data.creatDOMElement(uploadEffect, '.effect-marvin');
      }

      if (effectName === 'effect-phobos') {
        afterEffectImage = window.data.creatDOMElement(uploadEffect, '.effect-phobos');
      }

      if (effectName === 'effect-heat') {
        afterEffectImage = window.data.creatDOMElement(uploadEffect, '.effect-heat');
      }


      if (effectName !== 'effect-none'){
      effectPin.classList.remove('hidden');
      effectValLine.classList.remove('hidden');
      effectValue.classList.remove('hidden');
        effectsLevel.classList.remove('hidden');
        effectPin.style.left = '20%';
        effectValLine.style.width = '20%';
        effectValue.value = '20';
      maxX = effectPin.offsetLeft * 5;

        if (effectName === 'effect-chrome') {
          afterEffectImage.style.filter = 'grayscale(' + (effectValue.value / 100) + ')';
        }

        if (effectName === 'effect-sepia') {
          afterEffectImage.style.filter = 'sepia(' + (effectValue.value / 100) + ')';
        }

        if (effectName === 'effect-marvin') {
          afterEffectImage.style.filter = 'invert(' + (effectValue.value) + '%)';
        }

        if (effectName === 'effect-phobos') {
          afterEffectImage.style.filter = 'blur(' + ((effectValue.value * 3) / 100) + 'px)';
        }

        if (effectName === 'effect-heat') {
          afterEffectImage.style.filter = 'brightness(' + ((effectValue.value * 3) / 100) + ')';
        }
    }
    else {
        effectPin.classList.add('hidden');
        effectValLine.classList.add('hidden');
        effectValue.classList.add('hidden');
        effectsLevel.classList.add('hidden');
        if (effectName === 'effect-none') {
          afterEffectImage.style.filter = null;
        }
        }
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
