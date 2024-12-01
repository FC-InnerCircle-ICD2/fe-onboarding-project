/**
 * 문자열 마지막 글자에 받침이 있는지 확인해주는 함수
 * @param {string} word
 * @returns boolean | null
 */
const checkBatchimEnding = (word) => {
  if (typeof word !== "string") return null;

  const lastLetter = word[word.length - 1];
  const uni = lastLetter.charCodeAt(0);
  const startOfKorean = 44032; // 한국어 첫 글자 '가'의 코드
  const endOfKorean = 55203; // 한국어 마지막 글자 '힣'의 코드

  if (uni < startOfKorean || uni > endOfKorean) return null;

  return (uni - 44032) % 28 !== 0;
};

/**
 * 입력 값 포맷팅 함수
 * @param {string | number} value
 * @returns string
 */
const formatNumber = (value) => {
  if (value === "" || isNaN(Number(value))) return "";
  return Number(value).toLocaleString(); // 쉼표 추가
};

export { checkBatchimEnding, formatNumber };
