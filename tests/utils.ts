// Functions to check password validity
export const containsCharFromSet = (password: string, set: string) => {
  return [...password].some((c) => set.includes(c));
};

export const containsOnlyCharFromSet = (password: string, set: string) => {
  return [...password].every((c) => set.includes(c));
};
