import React, { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import style from "./NotBunItem.module.css";

import { moveIngredients } from "../../../services/reducers/order";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface NotBunItemProps {
  index: number;
  text: string;
  price: number;
  thumbnail: string;
  handleClose: () => void;
  isHover: boolean;
}

const NotBunItem: FC<NotBunItemProps> = ({
  index,
  text,
  price,
  thumbnail,
  handleClose,
  isHover,
}) => {
  const dispatch = useDispatch();
  const moveItems = (dragIndex: number, hoverIndex: number) =>
    dispatch(moveIngredients({ dragIndex, hoverIndex }));

  const ref = useRef<HTMLElement>(null);

  const [{ isDragging }, dragItem] = useDrag({
    type: "item",
    item: { text, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropItem] = useDrop({
    accept: "item",
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;

      if (
        hoverClientY &&
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }

      if (
        hoverClientY &&
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }

      moveItems(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  dragItem(dropItem(ref));

  return (
    <article
      ref={ref}
      className={`${style.card}  ${isDragging && style.card_transparent} ${
        isHover && style.card_transparent
      }`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={handleClose}
      />
    </article>
  );
};

export default NotBunItem;
