import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > handleKeyDown', () => {
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not change value if no step prop', () => {
    const view = shallow(
      <CurrencyInput id={id} prefix="£" defaultValue={100} onChange={onChangeSpy} />
    );

    // Arrow up
    view.find(`#${id}`).simulate('keyDown', { key: 'ArrowUp' });
    expect(onChangeSpy).not.toBeCalled();
    expect(view.update().find(`#${id}`).prop('value')).toBe('£100');

    // Arrow down
    view.find(`#${id}`).simulate('keyDown', { key: 'ArrowDown' });
    expect(onChangeSpy).not.toBeCalled();
    expect(view.update().find(`#${id}`).prop('value')).toBe('£100');
  });

  it('should handle negative step', () => {
    const view = shallow(
      <CurrencyInput id={id} prefix="£" defaultValue={100} step={-2} onChange={onChangeSpy} />
    );

    view.find(`#${id}`).simulate('keyDown', { key: 'ArrowUp' });
    expect(onChangeSpy).toHaveBeenCalledWith('98', undefined);
    expect(view.update().find(`#${id}`).prop('value')).toBe('£98');

    view.find(`#${id}`).simulate('keyDown', { key: 'ArrowDown' });
    expect(onChangeSpy).toHaveBeenCalledWith('100', undefined);
    expect(view.update().find(`#${id}`).prop('value')).toBe('£100');
  });

  describe('without value ie. default 0', () => {
    it('should handle arrow down key', () => {
      const view = shallow(<CurrencyInput id={id} prefix="£" step={1} onChange={onChangeSpy} />);

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowDown' });
      expect(onChangeSpy).toBeCalledWith('-1', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('-£1');
    });

    it('should handle arrow down key', () => {
      const view = shallow(<CurrencyInput id={id} prefix="£" step={1} onChange={onChangeSpy} />);

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowUp' });
      expect(onChangeSpy).toBeCalledWith('1', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('£1');
    });
  });

  describe('with value 99 and step 1.25', () => {
    it('should handle arrow down key', () => {
      const view = shallow(
        <CurrencyInput id={id} prefix="£" value={99} step={1.25} onChange={onChangeSpy} />
      );

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowDown' });
      expect(onChangeSpy).toHaveBeenCalledWith('97.75', undefined);
    });

    it('should handle arrow up key', () => {
      const view = shallow(
        <CurrencyInput id={id} prefix="£" value={99} step={1.25} onChange={onChangeSpy} />
      );

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowUp' });
      expect(onChangeSpy).toHaveBeenCalledWith('100.25', undefined);
    });
  });

  describe('with defaultValue 100 and step 5.5', () => {
    it('should handle arrow down key', () => {
      const view = shallow(
        <CurrencyInput id={id} prefix="£" defaultValue={100} step={5.5} onChange={onChangeSpy} />
      );

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowDown' });
      expect(onChangeSpy).toBeCalledWith('94.5', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('£94.5');

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowDown' });
      expect(onChangeSpy).toBeCalledWith('89', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('£89');
    });

    it('should handle arrow up key', () => {
      const view = shallow(
        <CurrencyInput id={id} prefix="£" defaultValue={100} step={5.5} onChange={onChangeSpy} />
      );

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowUp' });
      expect(onChangeSpy).toBeCalledWith('105.5', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('£105.5');

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowUp' });
      expect(onChangeSpy).toBeCalledWith('111', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('£111');
    });
  });

  describe('with max length 2', () => {
    it('should handle negative value', () => {
      const view = shallow(
        <CurrencyInput
          id={id}
          prefix="£"
          defaultValue={-99}
          step={1}
          maxLength={2}
          onChange={onChangeSpy}
        />
      );

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowDown' });
      expect(onChangeSpy).not.toBeCalled();
      expect(view.update().find(`#${id}`).prop('value')).toBe('-£99');

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowUp' });
      expect(onChangeSpy).toHaveBeenCalledWith('-98', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('-£98');
    });

    it('should handle positive value', () => {
      const view = shallow(
        <CurrencyInput
          id={id}
          prefix="£"
          defaultValue={99}
          step={1}
          maxLength={2}
          onChange={onChangeSpy}
        />
      );

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowUp' });
      expect(onChangeSpy).not.toBeCalled();
      expect(view.update().find(`#${id}`).prop('value')).toBe('£99');

      view.find(`#${id}`).simulate('keyDown', { key: 'ArrowDown' });
      expect(onChangeSpy).toHaveBeenCalledWith('98', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('£98');
    });
  });
});
