import { useContext, useEffect } from "react";
import Input from "../../../components/Input";
import { AdminContentType } from "../../../contexts/AdminContext/types";
import { AdminContext } from "../../../contexts/AdminContext/AdminContext";

const TextComponent = ({ item }: { item: AdminContentType }) => {
  //
  const {
    admin: { content },
    dispatch,
    actions: { updateContent },
  } = useContext(AdminContext);
  const handleChange = (e: any) => {
    const index = content.findIndex((_: any) => _.id === item.id);
    if (index === -1) return;
    const newRender = [...content];
    newRender[index].content = e;
    dispatch(updateContent(newRender));
  };
  useEffect(() => {
    return () => {};
  }, []);
  //
  return (
    <Input
      width={410}
      type="text"
      value={item.content + ""}
      mode="outlined"
      placeholder={item.type}
      handleChange={handleChange}
    />
  );
};

export default TextComponent;
