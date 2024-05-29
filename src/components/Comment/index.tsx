import InputComment from "./InputComment";
import ItemComment from "./ItemComment";

const Comment = () => {
  return (
    <div className="w-2/3">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-2 py-3 border-b-2 border-solid border-gray-100">
          <i className="bx bx-comment text-xl"></i>
          <span className="font-semibold text-xl">Comments</span>
        </div>
      </div>
      <ItemComment />
      <ItemComment />
      <InputComment />
    </div>
  );
};

export default Comment;
