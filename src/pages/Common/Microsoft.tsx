const Microsoft = () => {
  return (
    <div
      className="w-full h-screen overflow-hidden flex items-center 
  justify-center"
    >
      <div className="w-40 h-40 grid grid-cols-2 grid-rows-2 gap-2">
        <div className="col-span-1 row-span-1 bg-gray-500"></div>
        <div className="col-span-1 row-span-1 bg-red-500"></div>
        <div className="col-span-1 row-span-1 bg-pink-500"></div>
        <div className="col-span-1 row-span-1 bg-yellow-500"></div>
      </div>
    </div>
  );
};

export default Microsoft;
