type RepositionCursorProps = {
  selectionStart?: number | null;
  value: string;
  lastKeyStroke: string | null;
  stateValue?: string;
  groupSeparator?: string;
};

/**
 * Based on the last key stroke and the cursor position, update the value
 * and reposition the cursor to the right place
 */
export const repositionCursor = ({
  selectionStart,
  value,
  lastKeyStroke,
  stateValue,
  groupSeparator,
}: RepositionCursorProps): {
  modifiedValue: string;
  cursorPosition: number | null | undefined;
} => {
  let cursorPosition = selectionStart;
  let modifiedValue = value;
  if (stateValue && cursorPosition) {
    const splitValue = value.split('');
    // if cursor is to right of groupSeparator and backspace pressed, delete the character to the left of the separator and reposition the cursor
    if (lastKeyStroke === 'Backspace' && stateValue[cursorPosition] === groupSeparator) {
      splitValue.splice(cursorPosition - 1, 1);
      cursorPosition -= 1;
    }
    // if cursor is to left of groupSeparator and delete pressed, delete the character to the right of the separator and reposition the cursor
    if (lastKeyStroke === 'Delete' && stateValue[cursorPosition] === groupSeparator) {
      splitValue.splice(cursorPosition, 1);
      cursorPosition += 1;
    }
    modifiedValue = splitValue.join('');
    return { modifiedValue, cursorPosition };
  }

  return { modifiedValue, cursorPosition: selectionStart };
};
