'use strict';

// Возвращает случайное число между min (включительно) и max (не включая max)
var getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// создание DOM элемента
var creatDOMElement = function (root, elementName) {
  return root.querySelector(elementName);
};

// Создание массива из 25 объектов с описанием фото
var generatePhotosData = function (comments) {
  var dataArray = [];
  var comment = [];

  for (var i = 0; i < 25; i++) {
    var k = i + 1;
    var url = 'photos/' + k + '.jpg';
    var likes = getRandomArbitrary(15, 201);

    var commentsNumber = getRandomArbitrary(0, 3);
    for (var j = 0; j < commentsNumber; j++) {
      comment[j] = comments[getRandomArbitrary(0, 7)];
    }

    dataArray[i] = {
      url: url,
      likes: likes,
      comments: comment
    };
  }

  return dataArray;
};

// генерирование шаблона фото
var generatePhoto = function (data) {
  var picture = pictureTemplate.cloneNode(true);

  creatDOMElement(picture, '.picture-comments').textContent = data.comments;
  creatDOMElement(picture, '.picture-likes').textContent = data.likes;
  creatDOMElement(picture, 'img').src = data.url;

  return picture;
};

// отображение фото в поноэкранном режиме
var showGalleryOverlay = function () {
  galleryOverlay.classList.remove('hidden');
};

// отключение отображения фото в поноэкранном режиме
var hideGalleryOverlay = function () {
  galleryOverlay.classList.add('hidden');
};

// заполнение формы в полноэкранном режиме данными о фото
var fillGalleryOverlay = function (target, nextSibling) {
  creatDOMElement(galleryOverlay, '.gallery-overlay-image').src = target.src;
  creatDOMElement(galleryOverlay, '.comments-count').textContent = creatDOMElement(nextSibling, '.picture-comments').textContent.split('. ').length;
  creatDOMElement(galleryOverlay, '.likes-count').textContent = creatDOMElement(nextSibling, '.picture-likes').textContent;
};

// вывод фото на полный экран по клику
var onPictureClick = function (event) {
  // отменяем действие браузера при нажатии на ссылку
  event.preventDefault();

  var target = event.target;

  // при нажатии на картинку
  if (target.tagName === 'IMG') {
    // получаем данные о фото из следующего 'брата' .picture-stats
    var nextSibling = target.nextElementSibling;

    // заполняем
    fillGalleryOverlay(target, nextSibling);

    // отображаем
    showGalleryOverlay();

    // при клике на span с комментариями
  } else if (target.tagName === 'SPAN') {
    // получаем данные о фото
    // находим picture
    var root = event.path[2];
    // находим img для информации о пути к фото
    var image = root.querySelector('img');
    // находим .picture-stats для дополнительной информции
    var span = image.nextElementSibling;

    fillGalleryOverlay(image, span);

    showGalleryOverlay();
  }
};

// вывод фото на полный экран при нажатии Enter
var onEnterPress = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    event.preventDefault();

    var target = event.target;
    var image = target.children[0];
    var span = image.nextElementSibling;

    fillGalleryOverlay(image, span);

    showGalleryOverlay();
  }
};

// отключение отображения формы загрузки
var hideUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
};

// включение отображения формы загрузки
var showUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
};

// увеличение масштаба изображения в форме кадрирования
var onResizeButtonIncClick = function () {
  var resize = parseInt(resizeValue.value, 10) + 25;

  if (resize > 99) {
    resize = 100;
  }

  effectPreview.style.transform = ('scale(' + (resize / 100) + ')');
  resizeValue.value = resize + '%';
};

// уменьшение масштаба изображения
var onResizeButtonDecClick = function () {
  var resize = parseInt(resizeValue.value, 10) - 25;

  if (resize < 26) {
    resize = 25;
  }

  effectPreview.style.transform = ('scale(' + (resize / 100) + ')');
  resizeValue.value = resize + '%';
};

// проверка хэш-тегов
var checkUploadHashtags = function () {
  var hashtags = uploadHashtags.value.split(' ');
  var errors = 0;

  if (uploadHashtags.value !== '') {
    for (var k = 0; k < hashtags.length; k++) {
      var hashSymbols = hashtags[k].match(/#/gi);

      if (hashtags[k][0] !== '#') {
        uploadHashtags.setCustomValidity('# должен быть первым символом');
        errors = 1;
        break;
      } else if (hashtags[k].length < 3) {
        uploadHashtags.setCustomValidity('Длина хэш-тега минимум 2 символа');
        errors = 1;
        break;
      } else if (hashtags[k].length > 21) {
        uploadHashtags.setCustomValidity('Максимальная длина хэш-тэга 20 символов');
        errors = 1;
        break;
      } else if (hashtags.length > 5) {
        uploadHashtags.setCustomValidity('Максимум 5 хэш-тегов');
        errors = 1;
        break;
      } else if (hashSymbols.length > 1) {
        uploadHashtags.setCustomValidity('В хэш-теге может быть только один символ #');
        errors = 1;
      } else {
        for (var m = k + 1; m < hashtags.length; m++) {
          if ((hashtags[m].toLowerCase()) === (hashtags[k].toLowerCase())) {
            uploadHashtags.setCustomValidity('Уберите повторяющиеся хэш-теги');
            errors = 1;
            break;
          }
        }
      }
    }
  }

  if (errors === 0) {
    uploadHashtags.setCustomValidity('');
  }
};

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// массив комментариев
var sentences = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// массив хранящий информацию о фотографиях
var photos = generatePhotosData(sentences);

// создание DOM элементов
var pictureTemplate = creatDOMElement(document, '#picture-template').content;
var pictures = creatDOMElement(document, '.pictures');
var galleryOverlay = creatDOMElement(document, '.gallery-overlay');
var galleryOverlayClose = creatDOMElement(galleryOverlay, '.gallery-overlay-close');
var formUploadSelectImage = creatDOMElement(document, '#upload-select-image');
var fieldUploadFile = creatDOMElement(formUploadSelectImage, '#upload-file');
var uploadOverlay = creatDOMElement(formUploadSelectImage, '.upload-overlay');
var uploadCancel = creatDOMElement(uploadOverlay, '.upload-form-cancel');
var uploadSubmit = creatDOMElement(uploadOverlay, '.upload-form-submit');
var uploadDescription = creatDOMElement(uploadOverlay, '.upload-form-description');
var resizeButtonInc = creatDOMElement(uploadOverlay, '.upload-resize-controls-button-inc');
var resizeButtonDec = creatDOMElement(uploadOverlay, '.upload-resize-controls-button-dec');
var resizeValue = creatDOMElement(uploadOverlay, '.upload-resize-controls-value');
var uploadEffect = creatDOMElement(uploadOverlay, '.upload-effect');
var effectPreview = creatDOMElement(uploadEffect, '.effect-image-preview');
var uploadHashtags = creatDOMElement(uploadOverlay, '.upload-form-hashtags');

var fragment = document.createDocumentFragment();

for (var l = 0; l < 25; l++) {
  fragment.appendChild(generatePhoto(photos[l]));

}

pictures.appendChild(fragment);

var picture = pictures.querySelectorAll('.picture');

// отображение фото в полноэкранном режиме по клику и по нажатие enter
for (var i = 0; i < picture.length; i++) {
  picture[i].addEventListener('click', onPictureClick);
  picture[i].addEventListener('keydown', onEnterPress);
}

// отключение полноэкранного режима фото и формы загрузки по нажатию Esc
document.addEventListener('keydown', function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    hideGalleryOverlay();
    if (event.target !== uploadDescription) {
      hideUploadOverlay();
    }
  }
}
);

// отключение полноэкранного режима фото при нажатии на крестик
galleryOverlayClose.addEventListener('click', function () {
  hideGalleryOverlay();
}
);

// отключение полноэкранного режима фото при выборе крестика и нажтии Enter
galleryOverlayClose.addEventListener('keydown', function () {
  if (event.keyCode === ENTER_KEYCODE) {
    hideGalleryOverlay();
  }
}
);

// При изменении значения поля загрузки фотографии #upload-file показывается форма кадрирования изображения
fieldUploadFile.addEventListener('change', function () {
  showUploadOverlay();
}
);

// закрытие формы загрузки при нажатии на крестик
uploadCancel.addEventListener('click', function () {
  hideUploadOverlay();
}
);

// увеличение масштаба фото
resizeButtonInc.addEventListener('click', onResizeButtonIncClick);

// уменьшение масштаба фото
resizeButtonDec.addEventListener('click', onResizeButtonDecClick);

// наложение эффектов на фото
uploadEffect.addEventListener('click', function (event) {
  if (event.target.type === 'radio') {
    effectPreview.classList = 'upload-form-preview';
    var c = event.target.id.substring(7);
    effectPreview.classList.add(c);
  }
}
);

// отправка формы по клику
uploadSubmit.addEventListener('click', function () {
  checkUploadHashtags();
}
);
