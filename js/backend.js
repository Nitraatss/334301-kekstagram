'use strict';

(function () {
  window.backend = {
    // загрузка данных с сервера
    load: function (onLoad, onError) {
      var loadURL = 'https://1510.dump.academy/kekstagram/data';
      var loadXHR = new XMLHttpRequest();
      loadXHR.responseType = 'json';

      loadXHR.addEventListener('load', function () {
        if (loadXHR.status === 200) {
          onLoad(loadXHR.response);
        } else {
          onError('Неизвестный статус ' + loadXHR.status + ' ' + loadXHR.statusText);
        }
      });

      loadXHR.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      loadXHR.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + loadXHR.timeout + 'мс');
      });

      loadXHR.timeout = 10000;
      loadXHR.open('GET', loadURL);
      loadXHR.send();
    },
    // сохранение данных на сервер
    save: function (data, onLoad, onError) {
      var saveURL = 'https://1510.dump.academy/kekstagram';
      var saveXHR = new XMLHttpRequest();

      saveXHR.addEventListener('load', function () {
        if (saveXHR.status === 200) {
          onLoad();
        } else {
          onError('Неизвестный статус ' + saveXHR.status + ' ' + saveXHR.statusText);
        }
      });

      saveXHR.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      saveXHR.open('POST', saveURL);
      saveXHR.send(data);
    }
  };
})();
