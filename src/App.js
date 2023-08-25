import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  function changeItems(value) {
    setItems(value);
  }
  function removeAnItem(id) {
    setItems(Array.from(items).filter((item) => item.id !== id));
  }

  function packAnItem(id) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.packed = !item.packed;
        }
        return item;
      })
    );
  }

  return (
    <div>
      <Logo />
      <Form items={items} setItems={changeItems} />
      <PackingList
        items={items}
        handleRemove={removeAnItem}
        handlePack={packAnItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Travel Time !🧳</h1>;
}

function Form({ items, setItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    setDescription("");
    setQuantity(1);
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setItems(Array.from([...items, newItem]));
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😎</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handleRemove, handlePack }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            removeItem={() => handleRemove(item.id)}
            packItem={() => handlePack(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, removeItem, packItem }) {
  return (
    <li>
      <button onClick={() => packItem(item.id)}>✅</button>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}: {item.quantity} pcs
      </span>
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you already packed X (X%)</em>
    </footer>
  );
}
