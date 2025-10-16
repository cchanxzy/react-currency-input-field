import { safeMultiply } from '../safeMultiply';

describe('safeMultiply', () => {
  describe('handles floating-point precision issues', () => {
    it('should correctly multiply 4.1 * 1,000,000', () => {
      expect(safeMultiply(4.1, 1_000_000)).toBe(4_100_000);
    });

    it('should correctly multiply 1.025 * 1,000,000', () => {
      expect(safeMultiply(1.025, 1_000_000)).toBe(1_025_000);
    });

    it('should correctly multiply 4.111 * 1,000,000', () => {
      expect(safeMultiply(4.111, 1_000_000)).toBe(4_111_000);
    });

    it('should correctly multiply 3.1 * 1,000,000', () => {
      expect(safeMultiply(3.1, 1_000_000)).toBe(3_100_000);
    });

    it('should correctly multiply 2.1 * 1,000,000', () => {
      expect(safeMultiply(2.1, 1_000_000)).toBe(2_100_000);
    });
  });

  describe('handles abbreviation multipliers', () => {
    it('should handle k (thousands)', () => {
      expect(safeMultiply(1.5, 1000)).toBe(1500);
      expect(safeMultiply(2.25, 1000)).toBe(2250);
    });

    it('should handle m (millions)', () => {
      expect(safeMultiply(5.5, 1_000_000)).toBe(5_500_000);
      expect(safeMultiply(10.75, 1_000_000)).toBe(10_750_000);
    });

    it('should handle b (billions)', () => {
      expect(safeMultiply(1.1, 1_000_000_000)).toBe(1_100_000_000);
      expect(safeMultiply(2.5, 1_000_000_000)).toBe(2_500_000_000);
    });
  });

  describe('handles integer values', () => {
    it('should multiply integers correctly', () => {
      expect(safeMultiply(4, 1_000_000)).toBe(4_000_000);
      expect(safeMultiply(10, 1000)).toBe(10_000);
    });
  });

  describe('handles negative values', () => {
    it('should handle negative decimals', () => {
      expect(safeMultiply(-4.1, 1_000_000)).toBe(-4_100_000);
      expect(safeMultiply(-1.025, 1_000_000)).toBe(-1_025_000);
    });

    it('should handle negative integers', () => {
      expect(safeMultiply(-5, 1000)).toBe(-5000);
    });
  });

  describe('handles edge cases', () => {
    it('should handle zero', () => {
      expect(safeMultiply(0, 1_000_000)).toBe(0);
      expect(safeMultiply(0.0, 1000)).toBe(0);
    });

    it('should handle very small decimals', () => {
      expect(safeMultiply(0.001, 1000)).toBe(1);
      expect(safeMultiply(0.0001, 1_000_000)).toBe(100);
    });

    it('should handle many decimal places', () => {
      expect(safeMultiply(1.123456, 1_000_000)).toBe(1_123_456);
      expect(safeMultiply(0.999999, 1_000_000)).toBe(999_999);
    });

    it('should handle Infinity', () => {
      expect(safeMultiply(Infinity, 1000)).toBe(NaN);
      expect(safeMultiply(1.5, Infinity)).toBe(NaN);
    });

    it('should handle NaN', () => {
      expect(safeMultiply(NaN, 1000)).toBe(NaN);
      expect(safeMultiply(1.5, NaN)).toBe(NaN);
    });
  });

  describe('maintains precision with various decimal lengths', () => {
    it('should handle single decimal place', () => {
      expect(safeMultiply(1.2, 1000)).toBe(1200);
      expect(safeMultiply(9.9, 1000)).toBe(9900);
    });

    it('should handle two decimal places', () => {
      expect(safeMultiply(1.25, 1000)).toBe(1250);
      expect(safeMultiply(9.99, 1000)).toBe(9990);
    });

    it('should handle three decimal places', () => {
      expect(safeMultiply(1.125, 1000)).toBe(1125);
      expect(safeMultiply(9.999, 1000)).toBe(9999);
    });
  });
});
