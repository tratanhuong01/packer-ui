import ItemCategoryAdmin from "./ItemCategoryAdmin";

const CategoryAdmin = () => {
  return (
    <div className="w-60 flex flex-col gap-2">
      <ItemCategoryAdmin />
      <div
        className="p-2 font-bold rounded-lg cursor-pointer hover:bg-primary 
      transition-colors hover:text-white"
      >
        Support
      </div>
    </div>
  );
};

export default CategoryAdmin;
