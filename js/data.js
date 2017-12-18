'use strict';

(function () {

  window.data = {
    // Возвращает случайное число между min (включительно) и max (не включая max)
    getRandomArbitrary: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    // создание DOM элемента
    creatDOMElement: function (root, elementName) {
      return root.querySelector(elementName);
    },

    // форма для сообщения об ошибке
    showError: function (errorMessage) {
      var node = document.createElement('canvas');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: darkred;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.width = 500;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;

      document.body.insertAdjacentElement('afterbegin', node);

      var ctx = node.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.textBaseline = 'hanging';
      // Текст сообщения
      ctx.fillText(errorMessage, 40, 50);
    },

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };
})();
