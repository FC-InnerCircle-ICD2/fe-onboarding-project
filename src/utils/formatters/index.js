/**
 * 숫자를 한국 로케일의 문자열로 포맷팅합니다.
 * @param {number} number - 포맷팅할 숫자
 * @returns {string} 포맷팅된 문자열
 */
export const formatNumber = (number) => {
  return number.toLocaleString('ko-KR');
};
