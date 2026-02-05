import calculateStrength from "../../src/utils/calculateStrength";

const baseOptions = {
  includeUpper: false,
  includeLower: false,
  includeNumbers: false,
  includeSymbols: false,
  characterLength: 0,
};

describe("calculateStrength", () => {
  it("should return empty when no character options selected", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 12,
    });

    expect(result).toBe("empty");
  });

  it("should return empty when characterLength is 0", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 0,
      includeUpper: true,
    });

    expect(result).toBe("empty");
  });

  it("should return too-weak when length is less than 6", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 5,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
      includeSymbols: true,
    });

    expect(result).toBe("too-weak");
  });

  it("should return weak when length is between 6 and 7", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 7,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
      includeSymbols: true,
    });

    expect(result).toBe("weak");
  });

  it("should return too-weak when only one set selected and length >= 8", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 12,
      includeNumbers: true,
    });

    expect(result).toBe("too-weak");
  });

  it("should return weak when two sets selected and length >= 8", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 12,
      includeUpper: true,
      includeNumbers: true,
    });

    expect(result).toBe("weak");
  });

  it("should return medium when three sets selected and length >= 8", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 12,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
    });

    expect(result).toBe("medium");
  });

  it("should return medium when four sets selected but length < 10", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 9,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
      includeSymbols: true,
    });

    expect(result).toBe("medium");
  });

  it("should return strong when four sets selected and length >= 10", () => {
    const result = calculateStrength({
      ...baseOptions,
      characterLength: 10,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
      includeSymbols: true,
    });

    expect(result).toBe("strong");
  });
});
