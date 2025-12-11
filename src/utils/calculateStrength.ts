import type { PasswordOptions, StrengthLevel } from "../types/passwordTypes";

function calculateStrength(options: PasswordOptions): StrengthLevel {
  const {
    includeUpper,
    includeLower,
    includeNumbers,
    includeSymbols,
    characterLength,
  } = options;

  // option conditions
  const sets =
    (includeUpper ? 1 : 0) +
    (includeLower ? 1 : 0) +
    (includeNumbers ? 1 : 0) +
    (includeSymbols ? 1 : 0);

  if (sets === 0) return "empty";

  // length conditions
  if (characterLength === 0) return "empty";
  if (characterLength < 6) return "too-weak";
  if (characterLength < 8) return "weak";

  // combined score
  if (sets === 1) return "too-weak";
  if (sets === 2) return "weak";
  if (sets === 3) return "medium";
  if (sets === 4 && characterLength >= 10) return "strong";

  // fallback if sets=4 but length < 10
  return "medium";
}

export default calculateStrength;
