'use strict';

(function () {
  window.initializeFilters = {
    // применение фильтра к определенноиму элементу с определенным значением
    changeTargetFilter: function (target, filterName, filterValue) {
      switch (filterName) {
        case 'effect-chrome':
          target.style.filter = 'grayscale(' + (filterValue / 100) + ')';
          break;
        case 'effect-sepia':
          target.style.filter = 'sepia(' + (filterValue / 100) + ')';
          break;
        case 'effect-marvin':
          target.style.filter = 'invert(' + filterValue + '%)';
          break;
        case 'effect-phobos':
          target.style.filter = 'blur(' + ((filterValue * 3) / 100) + 'px)';
          break;
        case 'effect-heat':
          target.style.filter = 'brightness(' + ((filterValue * 3) / 100) + ')';
          break;
        case 'effect-none':
          target.style.filter = null;
          break;
      }
    },
    // удаление эффекта с элемента
    deleteEffect: function (target, oldEffectName) {
      if (oldEffectName !== null) {
        target.classList.remove(oldEffectName);
      }
    }
  };

  // создание DOM элемента для изображения с эффектом
  var effectsDOMelements = function (currentEffect) {
    switch (currentEffect) {
      case 'effect-chrome':
        afterEffectImage = window.data.creatDOMElement(window.form.uploadEffect(), '.effect-chrome');
        break;
      case 'effect-sepia':
        afterEffectImage = window.data.creatDOMElement(window.form.uploadEffect(), '.effect-sepia');
        break;
      case 'effect-marvin':
        afterEffectImage = window.data.creatDOMElement(window.form.uploadEffect(), '.effect-marvin');
        break;
      case 'effect-phobos':
        afterEffectImage = window.data.creatDOMElement(window.form.uploadEffect(), '.effect-phobos');
        break;
      case 'effect-heat':
        afterEffectImage = window.data.creatDOMElement(window.form.uploadEffect(), '.effect-heat');
        break;
    }
  };

  var effectControls = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-effect-controls');
  var effectsLevel = window.data.creatDOMElement(effectControls, '.upload-effect-level');
  var effectValue = window.data.creatDOMElement(effectControls, '.upload-effect-level-value');
  var effectPin = window.data.creatDOMElement(effectControls, '.upload-effect-level-pin');
  var effectValLine = window.data.creatDOMElement(effectControls, '.upload-effect-level-val');

  var maxX;
  var effectName;
  var oldEffect = null;
  var afterEffectImage;

  // перемещение ползунка регулируюещего эффекты
  effectPin.addEventListener('mousedown', function (dEvent) {
    dEvent.preventDefault();

    // задаем стартовые координаты
    var startCoords = {
      X: dEvent.clientX
    };

    // перемещение ползунка
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
      // изменение желтой полоски и инпута с цифрами
      if ((effectPin.offsetLeft - move.moveX) < maxX) {
        if ((effectPin.offsetLeft - move.moveX) > 0) {
          effectPin.style.left = ((effectPin.offsetLeft - move.moveX) * 100) / maxX + '%';
          effectValue.value = Math.floor(((effectPin.offsetLeft - move.moveX) * 100) / maxX);
          effectValLine.style.width = ((effectPin.offsetLeft - move.moveX) * 100) / maxX + '%';
        } else {
          effectPin.style.left = '0%';
          effectValLine.style.width = '0%';
          effectValue.value = 0;
        }
      } else {
        effectPin.style.left = '100%';
        effectValue.value = 100;
        effectValLine.style.width = '100%';
      }

      // изменение значений эффектов
      window.initializeFilters.changeTargetFilter(afterEffectImage, effectName, effectValue.value);
    };

    var onMouseUp = function (uEvent) {
      uEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  );

  // наложение эффектов на фото
  var uploadEffect = window.form.uploadEffect();
  var photoPreview = window.form.effectPreview();

  uploadEffect.addEventListener('click', function (eEvent) {
    if (eEvent.target.type === 'radio') {
      window.initializeFilters.deleteEffect(photoPreview, oldEffect);

      photoPreview.classList = 'upload-form-preview';
      effectName = eEvent.target.id.substring(7);
      oldEffect = effectName;
      photoPreview.classList.add(effectName);

      effectsDOMelements(effectName);

      if (effectName !== 'effect-none') {
        effectsLevel.classList.remove('hidden');

        effectPin.style.left = '20%';
        effectValLine.style.width = '20%';
        effectValue.value = '20';
        maxX = effectPin.offsetLeft * 5;

        window.initializeFilters.changeTargetFilter(afterEffectImage, effectName, effectValue.value);
      } else {
        effectsLevel.classList.add('hidden');

        window.initializeFilters.changeTargetFilter(afterEffectImage, effectName, effectValue.value);
      }
    }
  }
  );

})();
