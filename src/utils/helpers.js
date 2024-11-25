/** 유틸리티 함수들 */

/** 천단위 콤마 포맷팅 */
export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/** 로그 시간 포맷팅 */
export const formatTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

/** 상품 데이터 */
export const products = [
  { id: 1, name: '콜라', price: 1500 },
  { id: 2, name: '속이사이다', price: 1700 },
  { id: 3, name: '환타', price: 1500 },
  { id: 4, name: '오뎅국물', price: 1800 },
  { id: 5, name: '부장라떼', price: 800 },
  { id: 6, name: '판타지판타', price: 1500 },
  { id: 7, name: '레드뿔', price: 2500 },
  { id: 8, name: '핫세븐', price: 1900 },
  { id: 9, name: '커피우유', price: 1400 },
];
