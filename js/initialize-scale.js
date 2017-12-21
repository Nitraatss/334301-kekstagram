'use strict';

(function () {
  window.initializeScale = {
    changeScale: function (target, newScale) {
      target.style.transform = ('scale(' + (newScale / 100) + ')');
      resizeValue.value = newScale + '%';
    }
  };

  var onResizeButtonIncClick = function () {
    var resize = parseInt(resizeValue.value, 10) + 25;

    if (resize > 99) {
      resize = 100;
    }

    window.initializeScale.changeScale(previewPhoto, resize);
  };

  var onResizeButtonDecClick = function () {
    var resize = parseInt(resizeValue.value, 10) - 25;

    if (resize < 26) {
      resize = 25;
    }

    window.initializeScale.changeScale(previewPhoto, resize);
  };

  var previewPhoto = window.form.effectImagePreview();
  var resizeButtonInc = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-resize-controls-button-inc');
  var resizeButtonDec = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-resize-controls-button-dec');
  var resizeValue = window.data.createDOMElement(window.form.uploadOverlay(), '.upload-resize-controls-value');

  resizeButtonInc.addEventListener('click', onResizeButtonIncClick);

  resizeButtonDec.addEventListener('click', onResizeButtonDecClick);
})();
