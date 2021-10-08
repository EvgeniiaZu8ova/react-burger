import { TIngredient, TOrder } from "./types";

export function handleItemSearchWithName(
  arr: Array<TIngredient>,
  name: string
): TIngredient | undefined {
  const item = arr.find((el) => el.name === name);
  const result = item ? item : undefined;
  return result;
}

export function handleIngredientSearchWithId(
  arr: Array<TIngredient>,
  id: string | undefined
): TIngredient | undefined {
  const item = arr.find((el) => el._id === id);
  const result = item ? item : undefined;
  return result;
}

export function handleOrderSearchWithId(
  arr: Array<TOrder>,
  id: string | undefined
): TOrder | undefined {
  const item = arr.find((el) => el._id === id);
  const result = item ? item : undefined;
  return result;
}
