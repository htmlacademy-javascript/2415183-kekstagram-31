import { multiplePosts } from './data.js';

let count = 0;
const pictures = document.querySelector('.pictures');
const otherUsersTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoData = multiplePosts();
const otherUserFragment = document.createDocumentFragment();

// цикл создания миниатюр
photoData.forEach(({url, description, likes, comments}) => {
  const pictureElement = otherUsersTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  const text = pictureElement.querySelector('.picture__info');
  const numOfComments = pictureElement.querySelector('.picture__comments');
  const numOfLikes = pictureElement.querySelector('.picture__likes');
  // const id = pictureElement.querySelector('data-id');
  // const count = getNumber(image.src) - 1;
  pictures.appendChild(pictureElement);
  image.src = url;
  text.alt = description;
  numOfComments.textContent = comments.length;
  numOfLikes.textContent = likes;
  pictureElement.setAttribute('data-id', count++);
  otherUserFragment.append(pictureElement);
});

pictures.append(otherUserFragment);

export {pictures, photoData};
