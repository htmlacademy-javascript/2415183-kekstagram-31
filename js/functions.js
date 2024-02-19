//1. проверка длины строки.
const checkLength = (string, maxLength) => (string.length <= maxLength);
checkLength ('', 4);


//2. проверка палиндрома.
const checkPalindrome = (string) => {
  let newString = '';
  string = string.replaceAll(' ','').toLowerCase();
  for (let i = string.length - 1; i >= 0; i--){
    newString += string[i];
  }
  return (string === newString);
};
checkPalindrome ('');

//3. дополнительное задание. найти цифры в строке.
const findNumbers = (string) => {
  let number = '';
  string = string.toString().replaceAll(' ', '');
  for (let i = 0; i < string.length; i++) {
    if((Number(string[i]))) {
      number += string[i].trim();
    }
  }
  return parseInt(number, 10);
};
findNumbers (' a g e n t.00 7 ');
console.log(findNumbers(' a g e n t.00 7 '))

