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
    // получаем данные о фото из следующего "брата" .picture-stats
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

// создание DOM элементов #picture-template и .pictures
var pictureTemplate = creatDOMElement(document, '#picture-template').content;
var pictures = creatDOMElement(document, '.pictures');
var galleryOverlay = creatDOMElement(document, '.gallery-overlay');
var galleryOverlayClose = creatDOMElement(galleryOverlay, '.gallery-overlay-close');

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

// отключение полноэкранного режима по нажатию Esc
document.addEventListener('keydown', function () {
  if (event.keyCode === ESC_KEYCODE) {
    hideGalleryOverlay();
  }
}
);

// отключение полноэкранного режима при нажатии на крестик
galleryOverlayClose.addEventListener('click', function () {
  hideGalleryOverlay();
}
);

// отключение полноэкранного режима при выборе крестика и нажтии Enter
galleryOverlayClose.addEventListener('keydown', function () {
  if (event.keyCode === ENTER_KEYCODE) {
    hideGalleryOverlay();
  }
}
);
