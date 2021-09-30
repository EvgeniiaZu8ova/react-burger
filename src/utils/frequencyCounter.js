export function frequencyCounter(arr) {
  let quantity = {};
  let resultArr = [];

  arr.forEach((el) => {
    quantity[el] = (quantity[el] || 0) + 1;
  });

  Object.keys(quantity).forEach((el) =>
    resultArr.push({ id: el, quantity: quantity[el] })
  );

  return resultArr;
}
