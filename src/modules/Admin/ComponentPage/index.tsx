import { ColumnsProps } from "../../../components/Table/type";
import Table from "../../../components/Table";
import ModalAddComponent from "./ModalAddComponent";
import { countComponents, deleteComponent, getComponents } from "../apis";
import { GetItemParam, GetItemResponse } from "../../../components/Table/type";
const ContentComponentPage = () => {
  //
  const columns: ColumnsProps<any>[] = [
    {
      headerName: "Name",
      field: "name",
    },
  ];
  const getItems = async ({
    offset,
  }: GetItemParam): Promise<GetItemResponse<any>> => {
    const result = await getComponents({ limit: 5, index: offset * 5 }).then(
      (res) => res.json()
    );
    const length = await countComponents().then((res) => res.text());
    return {
      list: result || [],
      total: Number(length),
    };
  };
  //
  return (
    <Table
      getItems={getItems}
      columns={columns}
      commandBars={[
        {
          name: "Create component",
          type: "add",
          handle: () => true,
        },
      ]}
      limit={5}
      callbackButton={{
        delete: async (item: any, callback: Function) => {
          await deleteComponent(item.id);
          callback();
        },
        edit: (item: any, callback: Function) => {
          callback();
          return true;
        },
      }}
      ModalContainer={ModalAddComponent}
    />
  );
};

export default ContentComponentPage;
