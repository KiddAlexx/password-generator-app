import { PASSWORD_CHAR_SETS } from "../src/constants/passwordCharacters";
import type { Password, PasswordOptions } from "../src/types/passwordTypes";

interface CheckPasswordValidProps {
  password: Password;
  options: PasswordOptions;
}

export function checkPasswordValid({
  password,
  options,
}: CheckPasswordValidProps) {
  const { UPPER, LOWER, NUMBERS, SYMBOLS } = PASSWORD_CHAR_SETS;

  const {
    includeUpper,
    includeLower,
    includeNumbers,
    includeSymbols,
    characterLength,
  } = options;

  // Check length matches
  if (password.length !== characterLength) {
    return false;
  }

  // Combine options + character sets
  const selectedSets: Array<[boolean, string]> = [
    [includeUpper, UPPER],
    [includeLower, LOWER],
    [includeNumbers, NUMBERS],
    [includeSymbols, SYMBOLS],
  ];

  // Create array from password
  const passwordArray = [...password];

  // Iterates over password options + sets
  // Returns true if password containes at least one value
  // from each set where selected option is true.
  return selectedSets.every(([isSelected, set]) => {
    if (!isSelected) return true;
    return passwordArray.some((char) => set.includes(char));
  });
}
