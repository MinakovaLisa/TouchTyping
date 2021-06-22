import {
  CurrentLetterType,
  StringItemType,
  State,
  ActionType,
} from "../types.ts";

export const changeText = (state: State, action: ActionType) => {
  const { payload: enteredLetter } = action;
  const { index, filledString, leftedString, currentLetter } = state.stringItem;

  /**
   * Any symbol with lenght 1
   */
  const handledKey: RegExp = /^.{1}$/gs;

  const ishHandledKey = enteredLetter.match(handledKey) ? true : false;
  console.log(ishHandledKey);
  const isCorrectLetter = checkLetter(currentLetter, enteredLetter);

  switch (ishHandledKey) {
    case false: {
      return state;
    }
    case true: {
      switch (isCorrectLetter) {
        case true: {
          const newIndex = index + 1;
          const newCurrentLetter = leftedString.charAt(0);
          const newLeftedString = leftedString.substr(1);
          const newFilledString = filledString + enteredLetter;

          const newState: State = {
            ...state,
            stringItem: {
              index: newIndex,
              filledString: newFilledString,
              leftedString: newLeftedString,
              currentLetter: { isMistake: false, value: newCurrentLetter },
            },
            amountEnteredLetter: state.amountEnteredLetter++,
          };
          return newState;
        }
        case false: {
          const newState: State = {
            ...state,
            stringItem: {
              ...state.stringItem,
              currentLetter: {
                ...state.stringItem.currentLetter,
                isMistake: true,
              },
            },
            amountEnteredLetter: state.amountEnteredLetter++,
          };
          return newState;
        }
        default: {
          return state;
        }
      }
    }
  }
};

const checkLetter = (
  currentLetter: CurrentLetterType,
  enteredLetter: string
) => {
  const expectedLetter = currentLetter.value;
  return expectedLetter === enteredLetter;
};