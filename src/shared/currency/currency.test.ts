import { describe, expect, it } from 'vitest';
import { formatCurrency } from '.';

describe('formatCurrency', () => {
  it('양수를 로케일에 맞게 포맷한다.', () => {
    const result = formatCurrency(1234567.89);
    expect(result).toBe('1,234,567.89');
  });

  it('0을 포맷하면 "0"을 반환한다.', () => {
    const result = formatCurrency(0);
    expect(result).toBe('0');
  });

  it('음수를 로케일에 맞게 포맷한다.', () => {
    const result = formatCurrency(-1234.56);
    expect(result).toBe('-1,234.56');
  });

  it('큰 숫자도 정확히 포맷한다.', () => {
    const result = formatCurrency(9876543210.123);
    expect(result).toBe('9,876,543,210.123');
  });

  it('소수점 이하가 없는 숫자를 포맷한다.', () => {
    const result = formatCurrency(1000);
    expect(result).toBe('1,000');
  });

  it('비정상 입력이 있으면 에러를 던지지 않고 NaN을 반환한다.', () => {
    const result = formatCurrency(NaN as unknown as number);
    expect(result).toBe('NaN');
  });
});
