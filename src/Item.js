export default function Item({ item, removeItem, packItem }) {
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
