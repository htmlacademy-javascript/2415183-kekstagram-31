import { multiplePosts } from './data.js';

const otherUsersPictures = document.querySelector('.pictures');
const otherUsersTemplate = document.querySelector('#picture').content.querySelector('.picture');

const otherUserPost = multiplePosts;
const otherUserFragment = document.createDocumentFragment();

otherUserPost.forEach(({url, descrioption, likes, comments}) => {
  const otherUsersPictureElement = otherUsersTemplate.cloneNode(true);
  const image = otherUsersPictureElement.querySelector('.picture__img');
  const text = otherUsersPictureElement.querySelector('.picture__info');
  const numOfComments = otherUsersPictureElement.querySelector('.picture__comments');
  const numOfLikes = otherUsersPictureElement.querySelector('.picture__likes');
  otherUsersPictures.appendChild(otherUsersPictureElement);
  image.src = url;
  text.alt = descrioption;
  numOfComments.textContent = comments.length;
  numOfLikes.textContent = likes;
  otherUserFragment.append(otherUsersPictureElement);
});

otherUsersPictures.append(otherUserFragment);

export
{otherUsersPictures};
