'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var loadURL = 'https://1510.dump.academy/kekstagram/data';
      var loadXHR = new XMLHttpRequest();
      loadXHR.responseType = 'json';

      var onLoadloadXHR = function () {
        if (loadXHR.status === 200) {
          onLoad(loadXHR.response);
        } else {
          onError('Неизвестный статус ' + loadXHR.status + ' ' + loadXHR.statusText);
        }
      };

      var onErrorloadXHR = function () {
        onError('Ошибка соединения');
      };

      var onTimeoutloadXHR = function () {
        onError('Запрос не успел выполниться за ' + loadXHR.timeout + 'мс');
      };

      loadXHR.addEventListener('load', onLoadloadXHR);
      loadXHR.addEventListener('error', onErrorloadXHR);
      loadXHR.addEventListener('timeout', onTimeoutloadXHR);

      loadXHR.timeout = 10000;
      loadXHR.open('GET', loadURL);
      loadXHR.send();
    },
    save: function (data, onLoad, onError) {
      var saveURL = 'https://1510.dump.academy/kekstagram';
      var saveXHR = new XMLHttpRequest();

      var onLoadsaveXHR = function () {
        if (saveXHR.status === 200) {
          onLoad();
        } else {
          onError('Неизвестный статус ' + saveXHR.status + ' ' + saveXHR.statusText);
        }
      };

      var onErrorsaveXHR = function () {
        onError('Ошибка соединения');
      };

      saveXHR.addEventListener('load', onLoadsaveXHR);
      saveXHR.addEventListener('error', onErrorsaveXHR);

      saveXHR.open('POST', saveURL);
      saveXHR.send(data);
    }
  };
})();
