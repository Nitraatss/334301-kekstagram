'use strict';

(function () {
  window.picture = {
    generatePhoto: function (data) {
      var picture = window.gallery.pictureTemplate.cloneNode(true);
      var pictureComments = window.data.createDOMElement(picture, '.picture-comments');
      pictureComments.textContent = data.comments[0];
      pictureComments.textContent = data.comments.length;

      window.data.createDOMElement(picture, '.picture-likes').textContent = data.likes;
      window.data.createDOMElement(picture, 'img').src = data.url;

      return picture;
    }
  };
})();
