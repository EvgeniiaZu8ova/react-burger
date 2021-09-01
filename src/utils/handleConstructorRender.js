export default function handleConstructorRender() {
  function sumPrices(data) {
    return data.reduce((acc, curr) => acc + curr.price, 0);
  }

  function findBun(data) {
    return data.find((el) => el.type === "bun");
  }

  function removeBuns(data) {
    return data.filter((el) => el.type !== "bun");
  }

  function calcFinalSum(data) {
    const bun = findBun(data);
    const otherItems = removeBuns(data);
    const bunPrice = bun && bun.price;
    return sumPrices(otherItems) + 2 * bunPrice;
  }

  return {
    findBun,
    removeBuns,
    calcFinalSum,
  };
}
