export function handleItemSearch(arr, item) {
  return arr.find((el) => el.name === item);
}

export function handleItemSearchWithId(arr, id) {
  return arr.find((el) => el._id === id);
}
