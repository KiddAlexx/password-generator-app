export interface PasswordOptions {
  includeUpper: boolean;
  includeLower: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  characterLength: number;
}

export type StrengthLevel = "empty" | "too-weak" | "weak" | "medium" | "strong";
