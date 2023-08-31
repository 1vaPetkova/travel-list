export default function Stats({ items }) {
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
