'use strict';

// Возвращает случайное число между min (включительно) и max (не включая max)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Создание массива из 25 объектов с описанием фото
function generatePhotosData(comments) {
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
}

// создание DOM элемента
function creatDOMElement(root, elementName) {
  return root.querySelector(elementName);
}

// генерирование шаблона фото
function generatePhoto(data) {
  var picture = pictureTemplate.cloneNode(true);

  creatDOMElement(picture, '.picture-comments').textContent = data.comments;
  creatDOMElement(picture, '.picture-likes').textContent = data.likes;
  creatDOMElement(picture, 'img').src = data.url;

  return picture;
}
// заполнение gallery-overlay данными из первого элемента массива
function getOverlay(photos) {
  galleryOverlay.querySelector('.comments-count').textContent = photos.comments.length;
  galleryOverlay.querySelector('.likes-count').textContent = photos.likes;
  galleryOverlay.querySelector('.gallery-overlay-image').src = photos.url;
}

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
var photo = creatDOMElement(document, '.pictures');

var fragment = document.createDocumentFragment();

for (var l = 0; l < 25; l++) {
  fragment.appendChild(generatePhoto(photos[l]));
}

photo.appendChild(fragment);

var galleryOverlay = creatDOMElement(document, '.gallery-overlay');

getOverlay(photos[0]);

// отображения элемента .gallery-overlay
galleryOverlay.classList.remove('hidden');
