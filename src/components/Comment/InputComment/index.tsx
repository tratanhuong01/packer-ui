import Button from "../../Button";

const InputComment = () => {
  return (
    <div className="my-2">
      <textarea
        className="w-full h-28 rounded-sm border border-solid border-gray-300 focus:border-primary 
      resize-none p-2.5"
        placeholder="Comment..."
        spellCheck={false}
      />
      <div className="flex mt-2 justify-end gap-2">
        <Button mode="outlined">Cancel</Button>
        <Button mode="primary">Save</Button>
      </div>
    </div>
  );
};

export default InputComment;
