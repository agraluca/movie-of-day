export const isJSON = (string) => {
  try {
    JSON.parse(string);
    return true;
  } catch {
    return false;
  }
};
