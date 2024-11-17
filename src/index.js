export const Ship = (length) => {
  let hits = 0;
  const length = length;
  const hit = () => {
    hits += 1
  }
  const isSunk = () => {
    return hits >= length
  }
  return { hits, length, hit, isSunk }
}