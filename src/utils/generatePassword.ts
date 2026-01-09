import type { PasswordOptions } from "../types/passwordTypes";

type PasswordResult =
  | { ok: true; password: string }
  | { ok: false; error: string };

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

function getRandomIndex(max: number) {
  const array = new Uint32Array(1);
  // Fill array with cryptographically strong random number
  crypto.getRandomValues(array);
  // Convert large number into range between 0 and max -1
  return array[0] % max;
}

function generatePassword(options: PasswordOptions): PasswordResult {
  const {
    includeUpper,
    includeLower,
    includeNumbers,
    includeSymbols,
    characterLength,
  } = options;

  // Return if character length is 0
  if (characterLength <= 0) {
    return { ok: false, error: "Please select a password length" };
  }

  // Combine selected characters
  const selectedSets: string[] = [];

  if (includeUpper) selectedSets.push(UPPER);
  if (includeLower) selectedSets.push(LOWER);
  if (includeNumbers) selectedSets.push(NUMBERS);
  if (includeSymbols) selectedSets.push(SYMBOLS);

  // Return if no charcter options are selected
  if (selectedSets.length === 0) {
    return { ok: false, error: "Please select at least one character type" };
  }

  // Return if character length is less than options selected
  if (characterLength < selectedSets.length) {
    return {
      ok: false,
      error: "Password length is too short for selected options",
    };
  }

  // Add one charcter from each option selected
  const passwordCharacters: string[] = [];

  for (const set of selectedSets) {
    const randomCharacter = set[getRandomIndex(set.length)];
    passwordCharacters.push(randomCharacter);
  }

  // Combine all charcter options and fill remaining
  const allCharacters = selectedSets.join("");
  const remainingLength = characterLength - passwordCharacters.length;

  for (let i = 0; i < remainingLength; i++) {
    passwordCharacters.push(
      allCharacters[getRandomIndex(allCharacters.length)]
    );
  }

  // Shuffle using Fisher Yates method

  for (let i = passwordCharacters.length - 1; i > 0; i--) {
    const j = getRandomIndex(i + 1);
    [passwordCharacters[i], passwordCharacters[j]] = [
      passwordCharacters[j],
      passwordCharacters[i],
    ];
  }
  return { ok: true, password: passwordCharacters.join("") };
}

export default generatePassword;
