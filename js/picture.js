'use strict';

(function () {
  window.picture = {
  // генерация шаблона фото
    generatePhoto: function (data) {
      var picture = window.gallery.pictureTemplate.cloneNode(true);

      var pictureComments = window.data.creatDOMElement(picture, '.picture-comments');
      pictureComments.textContent = data.comments[0];
      for (var i = 1; i < data.comments.length; i++) {
        pictureComments.textContent = pictureComments.textContent + '  ' + data.comments[i];
      }
      window.data.creatDOMElement(picture, '.picture-likes').textContent = data.likes;
      window.data.creatDOMElement(picture, 'img').src = data.url;

      return picture;
    }
  };
})();
