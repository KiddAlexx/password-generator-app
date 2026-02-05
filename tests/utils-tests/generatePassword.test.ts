import { PASSWORD_CHAR_SETS } from "../../src/constants/passwordCharacters";
import generatePassword from "../../src/utils/generatePassword";
import { containsOnlyCharFromSet, containsCharFromSet } from "../utils";

const baseOptions = {
  includeUpper: false,
  includeLower: false,
  includeNumbers: false,
  includeSymbols: false,
  characterLength: 0,
};

const { NUMBERS, UPPER, SYMBOLS, LOWER } = PASSWORD_CHAR_SETS;

describe("generatePassword", () => {
  it("should return error when characterLength <=0", () => {
    const result = generatePassword({
      ...baseOptions,
      characterLength: 0,
      includeUpper: true,
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/password length/i);
  });

  it("should return error when no character options selected", () => {
    const result = generatePassword({
      ...baseOptions,
      characterLength: 8,
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/(?=.*select)(?=.*one)(?=.*character)/i);
  });

  it("should return error when generating with length value less than number of options selected", () => {
    const result = generatePassword({
      ...baseOptions,
      characterLength: 2,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/too short/i);
  });

  it("should generate number only password with provided length ", () => {
    const length = 12;
    const result = generatePassword({
      ...baseOptions,
      characterLength: length,
      includeNumbers: true,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).toHaveLength(length);
    expect(containsOnlyCharFromSet(result.password, NUMBERS)).toBe(true);
  });

  it("should generate password containing upper case letters and symbols", () => {
    const length = 10;
    const result = generatePassword({
      ...baseOptions,
      characterLength: length,
      includeUpper: true,
      includeSymbols: true,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).toHaveLength(length);
    expect(containsCharFromSet(result.password, UPPER)).toBe(true);
    expect(containsCharFromSet(result.password, SYMBOLS)).toBe(true);
  });

  it("should generate password with at least one character from each selected set", () => {
    const length = 20;
    const result = generatePassword({
      ...baseOptions,
      characterLength: length,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
      includeSymbols: true,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).toHaveLength(length);
    expect(containsCharFromSet(result.password, UPPER)).toBe(true);
    expect(containsCharFromSet(result.password, LOWER)).toBe(true);
    expect(containsCharFromSet(result.password, NUMBERS)).toBe(true);
    expect(containsCharFromSet(result.password, SYMBOLS)).toBe(true);
  });
});
