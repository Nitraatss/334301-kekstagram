'use strict';

(function () {
  window.initializeScale = {
    // изменение масштаба какго-либо элемента
    changeTargetScale: function (target, newScale) {
      target.style.transform = ('scale(' + (newScale / 100) + ')');
    }
  };

  // увеличение масштаба изображения в форме кадрирования
  var onResizeButtonIncClick = function () {
    var resize = parseInt(resizeValue.value, 10) + 25;

    if (resize > 99) {
      resize = 100;
    }

    window.initializeScale.changeTargetScale(previewPhoto, resize);
    resizeValue.value = resize + '%';
  };

  // уменьшение масштаба изображения
  var onResizeButtonDecClick = function () {
    var resize = parseInt(resizeValue.value, 10) - 25;

    if (resize < 26) {
      resize = 25;
    }

    window.initializeScale.changeTargetScale(previewPhoto, resize);
    resizeValue.value = resize + '%';
  };

  var previewPhoto = window.form.effectPreview();
  var resizeButtonInc = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-resize-controls-button-inc');
  var resizeButtonDec = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-resize-controls-button-dec');
  var resizeValue = window.data.creatDOMElement(window.form.uploadOverlay(), '.upload-resize-controls-value');

  // увеличение масштаба фото
  resizeButtonInc.addEventListener('click', onResizeButtonIncClick);

  // уменьшение масштаба фото
  resizeButtonDec.addEventListener('click', onResizeButtonDecClick);
})();
