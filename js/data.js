import { getRandomInteger, getUniqueNumber } from './util.js';

let id = 0;

const POST_COUNT = 25; //количество итерраций
// const PHOTO_ID_LOWEST = 1; //диапазон ID картинок
// const PHOTO_ID_HIGHEST = 25;
const POST_URL_COUNT = 25; //количество фотографий
const AVATAR_LOWEST = 1; //диапазон количества аватарок
const AVATAR_HIGHEST = 6;
const LIKES_LOWEST = 15; //диапазон количества лайков
const LIKES_HIGHEST = 200;
const COMMENTS_LOWEST = 0; //диапазон количества комментариев
const COMMENTS_HIGHEST = 30;

//массив имён
const NAMES = [
  'Ярослав',
  'Дарья',
  'Виктория',
  'Андрей',
  'Семён',
  'Савелий',
  'Артём',
  'Ева',
  'Полина',
  'Кирилл',
  'Лука',
  'Ярослава',
  'Амелия',
  'Максим',
  'Владимир',
  'Кира',
  'Никита',
  'Денис',
  'Даниил',
  'Агата',
  'Александра',
  'Алёна',
  'Софья',
  'Маргарита',
  'София'
];

//массив комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//массив описаний
const DESCRIPTIONS = [
  'Сила – не в бабках. Ведь бабки – уже старые.',
  'Из проведённых 64-х боёв у меня 64 победы. Все бои были с тенью.',
  'Взял нож - режь, взял дошик - ешь.',
  'Никогда не сдавайтесь, идите к своей цели! А если будет сложно – сдавайтесь.',
  'Если заблудился в лесу, иди домой.',
  'Запомни: всего одна ошибка – и ты ошибся.',
  'В жизни всегда есть две дороги: одна — первая, а другая — вторая.',
  'Мы должны оставаться мыми, а они – оними.',
  'Делай, как надо. Как не надо, не делай.',
  'Работа — это не волк. Работа — ворк. А волк — это ходить.',
  'Как говорил мой дед, «Я твой дед».'
];

// const photoId = getUniqueNumber (1, PHOTO_ID_HIGHEST);
const urlNumber = getUniqueNumber (1, POST_URL_COUNT);
const commentId = getUniqueNumber (1, COMMENTS_HIGHEST);

//функция получения случайного элемента массива
const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//функция создания комментария
const getComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_LOWEST, AVATAR_HIGHEST)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES)
});

//функция создания поста
const createPost = () =>({
  id: id++,
  url: `photos/${urlNumber()}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_LOWEST, LIKES_HIGHEST),
  comments: Array.from({length: getRandomInteger(COMMENTS_LOWEST, COMMENTS_HIGHEST)}, getComment)
});

//массив нескольких постов
const multiplePosts = () => Array.from({length:POST_COUNT}, createPost);
export {multiplePosts};
