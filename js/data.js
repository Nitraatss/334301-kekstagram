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

    // создание 25 фото
    generatePhotosData: function () {
      var dataArray = [];
      var comments = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
      ];
      var comment = [];

      for (var i = 0; i < 25; i++) {
        var k = i + 1;
        var url = 'photos/' + k + '.jpg';
        var likes = window.data.getRandomArbitrary(15, 201);

        var commentsNumber = window.data.getRandomArbitrary(0, 3);
        for (var j = 0; j < commentsNumber; j++) {
          comment[j] = comments[window.data.getRandomArbitrary(0, 6)];
        }

        dataArray[i] = {
          url: url,
          likes: likes,
          comments: comment
        };
      }

      return dataArray;
    },


    ESC_KEYCODE: 27,

    ENTER_KEYCODE: 13
  };


})();
