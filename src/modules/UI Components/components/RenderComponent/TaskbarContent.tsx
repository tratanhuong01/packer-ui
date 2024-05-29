import ChangeContent from "../../../Admin/ContentComponent/ChangeContent";
import Content from "../../../Admin/interfaces/Content";

const TaskbarContent = ({
  handleDelete,
  handleSave,
  deleteLoading,
  saveLoading,
  edit,
  content,
  hidden,
}: {
  handleDelete: Function;
  handleSave: Function;
  deleteLoading: boolean;
  saveLoading: boolean;
  edit: boolean;
  content: Content;
  hidden: string[];
}) => {
  return (
    <div className="flex gap-4 items-center">
      {hidden.findIndex((_) => _ === "delete") === -1 && (
        <span
          onClick={() => handleDelete()}
          className={`bx bx-${
            deleteLoading ? "loader animate-spin" : "x"
          } text-red-500 text-xl cursor-pointer`}
        ></span>
      )}
      {hidden.findIndex((_) => _ === "save") === -1 && (
        <span
          onClick={() => handleSave()}
          className={`bx bx-${
            saveLoading ? "loader animate-spin" : edit ? "check" : "pencil"
          } text-primary text-base cursor-pointer`}
        ></span>
      )}
      {hidden.findIndex((_) => _ === "change") === -1 && (
        <ChangeContent content={content} />
      )}
    </div>
  );
};

export default TaskbarContent;
