//1. проверка длины строки
const checkLength = (string, maxLength) => (string.length <= maxLength);
checkLength ('', 4);


//2. проверка палиндрома
const checkPalindrome = (string) => {
  let newString = '';
  string = string.replaceAll(' ','').toLowerCase();
  for (let i = string.length - 1; i >= 0; i--){
    newString += string[i];
  }
  return (string === newString);
}
checkPalindrome ('');

