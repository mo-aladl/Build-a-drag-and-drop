// SortableList.js
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./SortableList.css";
const ITEM_TYPE = "sortableItem";
// eslint-disable-next-line react/prop-types
const SortableItem = ({ id, order, index, moveItem, handleDrop }) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: (item) => {
      const { index: dragIndex } = item;
      const { index: hoverIndex } = handleDrop(index);
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <ul ref={ref} style={{ opacity }}>
      <li className="list">
        ID {id}
        <li>Order {order}</li>
      </li>
    </ul>
  );
};

// eslint-disable-next-line react/prop-types
const SortableList = ({ items, onOrderChange }) => {
  const [sortedItems, setSortedItems] = useState(items);

  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = [...sortedItems];
    const item = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, item);
    setSortedItems(newItems);
    onOrderChange(
      newItems.map((item, index) => ({ id: item.id, order: index + 1 }))
    );
  };

  const handleDrop = (index) => {
    return { index };
  };

  return (
    <div>
      {sortedItems.map((item, index) => (
        <SortableItem
          key={item.id}
          index={index}
          id={item.id}
          order={index + 1}
          moveItem={moveItem}
          handleDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default SortableList;
