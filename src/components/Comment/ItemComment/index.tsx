const ItemComment = () => {
  return (
    <div className="py-2 my-2">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <i className="bx bxs-user-circle text-5xl text-primary"></i>
          <div>
            <p className="font-semibold hover:text-primary">Packer.Tra</p>
            <p className="text-sm text-gray-400">4 years ago</p>
          </div>
          <span className="bg-gray-100 px-2 py-0.5 text-sm text-primary"></span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm text-gray-700 cursor-pointer hover:text-primary font-semibold">
            Delete
          </span>
          <span className="text-sm text-gray-700 cursor-pointer hover:text-primary font-semibold">
            Edit
          </span>
          <div
            className="flex items-center justify-center px-3 rounded-full py-1 cursor-pointer
            text-sm gap-2 text-xl text-primary border border-solid border-gray-300 hover:border-primary"
          >
            <span className="bx bx-heart"></span>
            <span className="text-base">0</span>
          </div>
        </div>
      </div>
      <p className="break-words">
        This is the actual comment. It's can be long or short. And must contain
        only text information.
      </p>
      <p className="bg-blue-100 text-xs p-2 font-normal text-gray-700 mt-2 flex items-center gap-2">
        <i className="bx bxs-check-shield text-sm text-primary"></i> Your
        comment will appear once approved by a moderator.
      </p>
    </div>
  );
};

export default ItemComment;
