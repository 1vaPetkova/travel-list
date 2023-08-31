import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div>
      <Logo />
      <Form addItems={handleAddItems} />
      <PackingList
        items={items}
        removeItem={handleRemoveItem}
        pack={packAnItem}
        clearItems={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
