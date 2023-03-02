// Generate random number
export const getRandom = (start: number, end: number): number => {
  return Math.floor(Math.random() * end + start);
};
