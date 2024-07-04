import AutoComplete from "../../../components/AutoComplete";

const AutoCompletePage = () => {
  return (
    <div className="w-60">
      <AutoComplete options={["User", "Admin", "Guest"]} />
    </div>
  );
};
export default AutoCompletePage;
