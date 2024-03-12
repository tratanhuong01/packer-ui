const PopupVersionChat = () => {
  return (
    <div className="w-72 p-1 rounded-lg border shadow-lg">
      <div className="flex items-center justify-between hover:bg-gray-100 cursor-pointer px-2">
        <div className="flex items-center gap-2 p-2">
          <i className="bx bxs-bolt"></i>
          <div>
            <p className="mb-1 font-semibold">GPT-3.5</p>
            <p className="text-gray-500 text-sm">Great for everyday tasks</p>
          </div>
        </div>
        <input type="radio" checked />
      </div>
      <div className="flex items-center justify-between hover:bg-gray-100 cursor-pointer px-2">
        <div className="flex items-center gap-2 p-2">
          <i className="bx bxs-bolt"></i>
          <div>
            <p className="mb-1 font-semibold">GPT-3.5</p>
            <p className="text-gray-500 text-sm">Great for everyday tasks</p>
          </div>
        </div>
        <input type="radio" checked={false} />
      </div>
    </div>
  );
};

export default PopupVersionChat;
