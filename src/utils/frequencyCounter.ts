export function frequencyCounter(
  arr: string[]
): { id: string; quantity: number }[] {
  let quantity: { [name: string]: number } = {};
  let resultArr: { id: string; quantity: number }[] = [];

  arr.forEach((el) => {
    quantity[el] = (quantity[el] || 0) + 1;
  });

  Object.keys(quantity).forEach((el) =>
    resultArr.push({ id: el, quantity: quantity[el] })
  );

  return resultArr;
}
