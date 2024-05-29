import { useNavigate } from "react-router-dom";
import {
  ColumnsProps,
  CommandBarProps,
  FilterItemProps,
  GetItemParam,
  GetItemResponse,
  SelectBarProps,
} from "../../components/Table/type";
import { deleteData, deleteMultiData, searchData } from "../../api";
import Table from "../../components/Table";
import Loading from "../../components/Loading";

type Model<T> = T & { id: number };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ContentAdminProps<T, O> = {
  url: string;
  title: string;
  columns: ColumnsProps<T>[];
  addUrl?: string;
  limit?: number;
  hidden?: ("edit" | "delete" | "checkbox")[];
  callbackButton?: {
    edit?: (item: T, callback: Function) => void;
    delete?: (item: T, callback: Function) => void;
  };
  selectBars?: SelectBarProps<O>[];
  commandBars?: CommandBarProps[];
  ModalContainer?: any;
  filters?: FilterItemProps<T>[];
  filterDefault?: { [key: string]: (string | number)[] };
  loading?: boolean;
};

const ContentAdmin = <T, O>({
  url,
  columns,
  addUrl,
  limit,
  selectBars,
  commandBars,
  ModalContainer,
  filters,
  filterDefault,
  loading,
}: ContentAdminProps<T, O>) => {
  const navigate = useNavigate();
  const getItems = async ({
    offset,
    limit = 10,
    search = "",
    filters,
  }: GetItemParam): Promise<GetItemResponse<T>> => {
    try {
      const result = await searchData({
        url,
        offset,
        limit,
        search,
        filters,
      });
      return {
        list: result.list?.filter((item: any) => item),
        total: result.total,
      };
    } catch (error) {
      return {
        list: [],
        total: 0,
      };
    }
  };
  return (
    <div className="w-full h-screen relative">
      {loading && (
        <div
          className="absolute top-0 right-0 left-0 bottom-0 bg-white bg-opacity-70 z-50 flex items-center 
      justify-center"
        >
          <Loading />
        </div>
      )}
      <Table<T, O>
        commandBars={[
          {
            name: "Add data",
            icon: "bx bx-plus",
            handle: () => {
              if (!addUrl) return true;
              navigate(`${addUrl}/create`);
            },
            type: "add",
          },
          ...(commandBars ? commandBars : []),
        ]}
        getItems={getItems}
        selectBars={selectBars}
        columns={columns}
        callbackButton={{
          delete: async (item: any, callback: Function) => {
            await deleteData({
              url,
              params: {
                path: url,
                id: item.id,
              },
            });
            callback();
          },
          edit: (item: Model<T>, callback: Function) => {
            if (addUrl) {
              navigate(`${addUrl}/edit?id=${item.id}`);
            } else {
              callback();
              return true;
            }
          },
        }}
        limit={limit}
        debounce
        ModalContainer={ModalContainer}
        filters={filters}
        filterDefault={filterDefault}
        deleteMultiAPI={async (ids) => {
          await deleteMultiData({
            url: `${url}/delete/multi`,
            data: ids,
          });
        }}
      />
    </div>
  );
};

export default ContentAdmin;
