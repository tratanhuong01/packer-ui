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
          htmlFor={`${type}-item-${item.key}`}
          key={`${type}-item-${item.key}`}
          className="flex items-center gap-5 p-3 hover:bg-gray-200 cursor-pointer"
        >
          <input
            onChange={() => {
              handleChecked(item, type === "left" ? true : false);
            }}
            checked={item.checked}
            type="checkbox"
            id={`${type}-item-${item.key}`}
            className="scale-150"
          />
          <span>{item.value}</span>
        </label>
      ))}
    </div>
  );
};

export default ItemTransferList;
