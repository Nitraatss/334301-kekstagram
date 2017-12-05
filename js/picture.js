'use strict';

(function () {
  window.picture = {
  // генерация шаблона фото
    generatePhoto: function (data) {
      var picture = window.gallery.pictureTemplate.cloneNode(true);

      window.data.creatDOMElement(picture, '.picture-comments').textContent = data.comments;
      window.data.creatDOMElement(picture, '.picture-likes').textContent = data.likes;
      window.data.creatDOMElement(picture, 'img').src = data.url;

      return picture;
    }
  };
})();
