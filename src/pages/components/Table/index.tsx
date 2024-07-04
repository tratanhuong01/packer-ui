import Table from "../../../components/Table";

interface Product {
  createdAt: string;
  name: string;
  image: string;
  amount: number;
  price: number;
  sale: number;
  category: string;
  status: boolean;
  id: number;
}

const TablePage = () => {
  return (
    <div>
      <Table<Product, any>
        deleteMultiAPI={async (ids) => {
          for (let index = 0; index < ids.length; index++) {
            await fetch(
              `https://657bd1e1394ca9e4af14cfed.mockapi.io/api/v1/products/${ids[index]}`,
              { method: "DELETE" }
            );
          }
        }}
        columns={[
          {
            headerName: "Name",
            field: "name",
          },
          {
            headerName: "Image",
            field: "image",
            customColumn: ({ object }: any) => {
              return (
                <img
                  src={`https://picsum.photos/id/${
                    200 + Number(object.id) + 20
                  }/400/400`}
                  alt=""
                  className="w-32 h-20 mx-auto object-cover rounded-lg my-3"
                />
              );
            },
          },
        ]}
        getItems={async ({ limit, offset, search }) => {
          const result = await fetch(
            `https://657bd1e1394ca9e4af14cfed.mockapi.io/api/v1/products?limit=${limit}&page=${
              offset + 1
            }&search=${search}`
          ).then((res) => res.json());
          const list = await fetch(
            `https://657bd1e1394ca9e4af14cfed.mockapi.io/api/v1/products?search=${search}`
          ).then((res) => res.json());
          return {
            list: result === "Not found" ? [] : result,
            total: list.length,
          };
        }}
        limit={5}
        filters={[
          {
            field: "status",
            name: "Status",
            options: [
              {
                key: "OFF",
                value: "Offline",
              },
              {
                key: "ON",
                value: "Online",
              },
            ],
            type: "checkbox",
            defaultValue: "All",
          },
        ]}
      />
    </div>
  );
};

export default TablePage;
