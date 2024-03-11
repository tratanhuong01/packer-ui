const ItemTransferList = ({
  items,
  handleChecked,
  type,
}: {
  items: any[];
  type: "left" | "right";
  handleChecked: Function;
}) => {
  return items.length === 0 ? (
    <p>No selected</p>
  ) : (
    <div>
      {items.map((item) => (
        <label
          htmlFor={`${type}-item-${item.id}`}
          key={Math.random()}
          className="flex items-center gap-5 p-3 hover:bg-gray-200 cursor-pointer"
        >
          <input
            onChange={() => {
              handleChecked(item, type === "left" ? true : false);
            }}
            checked={item.checked}
            type="checkbox"
            id={`${type}-item-${item.id}`}
            className="scale-150"
          />
          <span>{item.name}</span>
        </label>
      ))}
    </div>
  );
};

export default ItemTransferList;
