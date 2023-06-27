export const getRandom = (min = 0, max: number) => {
  const slots = new Uint32Array(1)
  crypto.getRandomValues(slots)
  const rand = slots[0] / Math.pow(2, 32)
  return Math.floor((rand * (max - min + 1)) + min)
}