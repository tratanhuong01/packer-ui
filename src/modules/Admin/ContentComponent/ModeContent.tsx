const ModeContent = ({ handleClick }: { handleClick: Function }) => {
  //
  //
  return (
    <div className="border border-solid border-gray-200 w-full">
      {["Title", "Description", "Show", "List", "Normal"].map((_) => (
        <div
          key={_}
          onClick={() => handleClick(_)}
          className="border-b border-solid border-gray-200 p-2 hover:bg-gray-100 
          cursor-pointer"
        >
          {_}
        </div>
      ))}
    </div>
  );
};

export default ModeContent;
