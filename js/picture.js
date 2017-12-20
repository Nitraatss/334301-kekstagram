'use strict';

(function () {
  window.picture = {
    generatePhoto: function (data) {
      var picture = window.gallery.pictureTemplate.cloneNode(true);
      var pictureComments = window.data.createDOMElement(picture, '.picture-comments');
      pictureComments.textContent = data.comments[0];

      for (var i = 1; i < data.comments.length; i++) {
        pictureComments.textContent = pictureComments.textContent + '  ' + data.comments[i];
      }

      window.data.createDOMElement(picture, '.picture-likes').textContent = data.likes;
      window.data.createDOMElement(picture, 'img').src = data.url;

      return picture;
    }
  };
})();
