import { shuffle } from '../util/shuffle.util.js';

export const generatePassword = (option = {}) => {
  let charset = 'abcdefghijklmnopqrstuvwxyz';
  if (option.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (option.numbers) charset += '0123456789';
  if (option.special) charset += '!@#$%^&*()_+';

  const arr = shuffle(charset.split(''));
  arr.length = option.length;
  const password = arr.join('');
  return password;
};
