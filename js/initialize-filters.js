'use strict';

(function () {
  window.initializeFilters = {
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
    deleteEffect: function (target, oldEffectName) {
      if (oldEffectName !== null) {
        target.classList.remove(oldEffectName);
      }
    }
  };

  var effectsDOMelements = function (currentEffect) {
    switch (currentEffect) {
      case 'effect-chrome':
        afterEffectImage = window.data.createDOMElement(window.form.uploadEffect(), '.effect-chrome');
        break;
      case 'effect-sepia':
        afterEffectImage = window.data.createDOMElement(window.form.uploadEffect(), '.effect-sepia');
        break;
      case 'effect-marvin':
        afterEffectImage = window.data.createDOMElement(window.form.uploadEffect(), '.effect-marvin');
        break;
      case 'effect-phobos':
        afterEffectImage = window.data.createDOMElement(window.form.uploadEffect(), '.effect-phobos');
        break;
      case 'effect-heat':
        afterEffectImage = window.data.createDOMElement(window.form.uploadEffect(), '.effect-heat');
        break;
    }
  };

  var onEffectPinMouseDown = function (dEvent) {
    dEvent.preventDefault();

    var startCoords = {
      X: dEvent.clientX
    };

    var onMouseMove = function (evtMouseMove) {
      evtMouseMove.preventDefault();

      var move = {
        moveX: startCoords.X - evtMouseMove.clientX,
      };

      startCoords = {
        X: evtMouseMove.clientX,
      };

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

      window.initializeFilters.changeTargetFilter(afterEffectImage, effectName, effectValue.value);
    };

    var onMouseUp = function (evtMouseUp) {
      evtMouseUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onUploadEffectClick = function (evtClick) {
    if (evtClick.target.type === 'radio') {
      window.initializeFilters.deleteEffect(photoPreview, oldEffect);

      photoPreview.classList = 'effect-image-preview';
      effectName = evtClick.target.id.substring(7);
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
        photoPreview.classList.remove(effectName);
        window.initializeFilters.changeTargetFilter(afterEffectImage, effectName, effectValue.value);
      }
    }
  };

  var effectControls = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-effect-controls');
  var effectsLevel = window.data.createDOMElement(effectControls, '.upload-effect-level');
  var effectValue = window.data.createDOMElement(effectControls, '.upload-effect-level-value');
  var effectPin = window.data.createDOMElement(effectControls, '.upload-effect-level-pin');
  var effectValLine = window.data.createDOMElement(effectControls, '.upload-effect-level-val');

  effectValue.disabled = true;
  var maxX;
  var effectName;
  var oldEffect = null;
  var afterEffectImage;

  effectPin.addEventListener('mousedown', onEffectPinMouseDown);

  var uploadEffect = window.form.uploadEffect();
  var photoPreview = window.form.effectImagePreview();

  uploadEffect.addEventListener('click', onUploadEffectClick);
})();
