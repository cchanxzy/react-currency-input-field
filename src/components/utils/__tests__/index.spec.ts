import * as utils from '../index';

describe('utils index exports', () => {
  it('should export cleanValue function', () => {
    expect(utils.cleanValue).toBeDefined();
    expect(typeof utils.cleanValue).toBe('function');
  });

  it('should export fixedDecimalValue function', () => {
    expect(utils.fixedDecimalValue).toBeDefined();
    expect(typeof utils.fixedDecimalValue).toBe('function');
  });

  it('should export formatValue function', () => {
    expect(utils.formatValue).toBeDefined();
    expect(typeof utils.formatValue).toBe('function');
  });

  it('should export getLocaleConfig function', () => {
    expect(utils.getLocaleConfig).toBeDefined();
    expect(typeof utils.getLocaleConfig).toBe('function');
  });

  it('should export getSuffix function', () => {
    expect(utils.getSuffix).toBeDefined();
    expect(typeof utils.getSuffix).toBe('function');
  });

  it('should export isNumber function', () => {
    expect(utils.isNumber).toBeDefined();
    expect(typeof utils.isNumber).toBe('function');
  });

  it('should export padTrimValue function', () => {
    expect(utils.padTrimValue).toBeDefined();
    expect(typeof utils.padTrimValue).toBe('function');
  });

  it('should export repositionCursor function', () => {
    expect(utils.repositionCursor).toBeDefined();
    expect(typeof utils.repositionCursor).toBe('function');
  });

  it('should export safeMultiply function', () => {
    expect(utils.safeMultiply).toBeDefined();
    expect(typeof utils.safeMultiply).toBe('function');
  });

  describe('exported functions should work correctly', () => {
    it('cleanValue should clean values', () => {
      const result = utils.cleanValue({ value: '1,000' });
      expect(result).toBe('1000');
    });

    it('fixedDecimalValue should fix decimals', () => {
      const result = utils.fixedDecimalValue('123', '.', 2);
      expect(result).toBe('1.23');
    });

    it('formatValue should format values', () => {
      const result = utils.formatValue({ value: '1000' });
      expect(result).toBe('1,000');
    });

    it('getLocaleConfig should return locale config', () => {
      const result = utils.getLocaleConfig({ locale: 'en-US', currency: 'USD' });
      expect(result).toHaveProperty('prefix');
      expect(result).toHaveProperty('groupSeparator');
      expect(result).toHaveProperty('decimalSeparator');
    });

    it('getSuffix should get suffix', () => {
      const result = utils.getSuffix('100%', { groupSeparator: ',', decimalSeparator: '.' });
      expect(result).toBe('%');
    });

    it('isNumber should validate numbers', () => {
      expect(utils.isNumber('123')).toBe(true);
      expect(utils.isNumber('abc')).toBe(false);
    });

    it('padTrimValue should pad/trim values', () => {
      const result = utils.padTrimValue('1.5', '.', 2);
      expect(result).toBe('1.50');
    });

    it('repositionCursor should calculate cursor position', () => {
      const result = utils.repositionCursor({
        selectionStart: 1,
        value: '1000',
        lastKeyStroke: '1',
        stateValue: '',
        groupSeparator: ',',
      });
      expect(result).toHaveProperty('modifiedValue');
      expect(result).toHaveProperty('cursorPosition');
      expect(typeof result.modifiedValue).toBe('string');
    });

    it('safeMultiply should multiply safely', () => {
      const result = utils.safeMultiply(4.1, 1000000);
      expect(result).toBe(4100000);
    });
  });
});
