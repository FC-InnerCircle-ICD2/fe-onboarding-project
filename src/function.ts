export function formmatedPrice(value: string) {
  // 숫자만
  const onlyNumbers = String(value).replace(/[^0-9]/g, "");
  // 세 자리마다 쉼표 추가
  const formattedValue = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedValue;
}
