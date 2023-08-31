import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems((i) => [...i, newItem]);
  }

  function handleRemoveItem(id) {
    setItems((i) => i.filter((item) => item.id !== id));
  }

  function packAnItem(id) {
    setItems((i) =>
      i.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearList() {
    setItems([]);
  }

  return (
    <div>
      <Logo />
      <Form addItems={handleAddItems} />
      <PackingList
        items={items}
        removeItem={handleRemoveItem}
        pack={packAnItem}
        clearItems={clearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Travel Time !🧳</h1>;
}

function Form({ addItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    addItems(newItem);

    setDescription("");
    setQuantity(1);
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

function PackingList({ items, removeItem, pack, clearItems }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  switch (sortBy) {
    case "input":
      sortedItems = items;
      break;
    case "description":
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    case "packed":
      sortedItems = items
        .slice()
        .sort((a, b) => Number(b.packed) - Number(a.packed));
      break;
    default:
      sortedItems = items;
      break;
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            removeItem={() => removeItem(item.id)}
            packItem={() => pack(item.id)}
          />
        ))}
      </ul>
      {items.length > 0 ? (
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={() => clearItems()}>Clear items</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Item({ item, removeItem, packItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => packItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}: {item.quantity} pcs
      </span>
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list! 🎒</em>
      </footer>
    );
  }
  const packedItems = items.filter((i) => i.packed).length;
  const percentage = Math.round((100 * packedItems) / items.length);
  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `You have ${items.length} items on your list and you already packed ${packedItems} (${percentage}%)`
          : `You got everything! Ready to go! ✈`}
      </em>
    </footer>
  );
}
