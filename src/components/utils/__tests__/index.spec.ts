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

  it('should export getIntlSuffix function', () => {
    expect(utils.getIntlSuffix).toBeDefined();
    expect(typeof utils.getIntlSuffix).toBe('function');
  });

  it('should export formatValueWithSuffix function', () => {
    expect(utils.formatValueWithSuffix).toBeDefined();
    expect(typeof utils.formatValueWithSuffix).toBe('function');
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

    it('getIntlSuffix should get the suffix from the parts', () => {
      const parts = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' });
      expect(utils.getIntlSuffix(parts.formatToParts(100))).toBe('\u00a0kr');
    });

    it('formatValueWithSuffix should format the value and return its suffix', () => {
      const result = utils.formatValueWithSuffix({
        value: '100',
        intlConfig: { locale: 'sv-SE', currency: 'SEK' },
      });
      expect(result).toEqual({ formatted: '100\u00a0kr', suffix: '\u00a0kr' });
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
  });
});
