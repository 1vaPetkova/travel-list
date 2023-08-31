import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, removeItem, pack, clearItems }) {
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
