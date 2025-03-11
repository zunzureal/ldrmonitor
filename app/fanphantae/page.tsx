import React, { useState } from 'react';
import './Wheel.css'; // Make sure to create this CSS file

const Wheel = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [selectedItem, setSelectedItem] = useState(null);

  const spinWheel = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setSelectedItem(items[randomIndex]);
  };

  const editItem = (index, newItem) => {
    const newItems = [...items];
    newItems[index] = newItem;
    setItems(newItems);
  };

  return (
    <div className="wheel-container">
      <div className="wheel">
        {items.map((item, index) => (
          <div key={index} className="wheel-item">
            {item}
          </div>
        ))}
      </div>
      <button onClick={spinWheel}>Spin</button>
      {selectedItem && (
        <div>
          <h2>Selected Item: {selectedItem}</h2>
          <input
            type="text"
            placeholder="Edit item"
            onBlur={(e) => editItem(items.indexOf(selectedItem), e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Wheel;