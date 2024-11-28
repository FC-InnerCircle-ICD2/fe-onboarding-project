/**
 * 문자열 마지막 글자에 받침이 있는지 확인해주는 함수
 * @param {string} word
 * @returns boolean
 */
const checkBatchimEnding = (word) => {
  if (typeof word !== "string") return null;

  let lastLetter = word[word.length - 1];
  let uni = lastLetter.charCodeAt(0);

  if (uni < 44032 || uni > 55203) return null;

  return (uni - 44032) % 28 != 0;
};

export { checkBatchimEnding };
