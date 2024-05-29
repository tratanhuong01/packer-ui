import Content from "../interfaces/Content";

const path = process.env.REACT_APP_BASE_URL;

type FetchProps = {
  url: string;
  method?: "POST" | "PUT" | "DELETE" | "GET";
  body?: any;
  headers?: any;
};

const fetchCustom = ({ method, body, headers, url }: FetchProps) => {
  return fetch(`${path}/${url}`, {
    method: method || "GET",
    body: body ? JSON.stringify(body) : null,
    headers:
      method === "POST" || method === "PUT"
        ? { "Content-Type": "application/json" }
        : {},
  });
};

const getComponents = ({ limit, index }: { limit: number; index: number }) =>
  fetchCustom({ url: `components?index=${index}&limit=${limit}` });

const countComponents = () => fetchCustom({ url: "components/count" });

const addComponent = (body: any) =>
  fetchCustom({ url: "components", method: "POST", body });

const updateComponent = (body: any) =>
  fetchCustom({ url: "components", method: "PUT", body });

const deleteComponent = (id: number) =>
  fetchCustom({ url: `components?id=${id}`, method: "DELETE" });

const getComponentById = (id: number) =>
  fetchCustom({ url: `components/getById?id=${id}` });

const getAllComponents = () => fetchCustom({ url: `components/all` });

const getPropsByIdComponent = (id: number) =>
  fetchCustom({ url: `components/props?id=${id}` });

const addPropByIdComponent = (id: number, prop: any) =>
  fetchCustom({ url: `components/props?id=${id}`, body: prop, method: "POST" });

const deletePropByIdComponent = (idProps: number, idComponent: any) =>
  fetchCustom({
    url: `components/props?idProp=${idProps}&idComponent=${idComponent}`,
    method: "DELETE",
  });

const updatePropByIdComponent = (id: number, prop: any) =>
  fetchCustom({ url: `components/props?id=${id}`, body: prop, method: "PUT" });

const deleteContentByIdComponent = (idComponent: number, idContent: any) =>
  fetchCustom({
    url: `components/content?idComponent=${idComponent}&idContent=${idContent}`,
    method: "DELETE",
  });

const addContentListByIdComponent = (idComponent: number, content: Content) =>
  fetchCustom({
    url: `components/content-list?idComponent=${idComponent}`,
    body: content,
    method: "POST",
  });

const addContentByIdComponent = (idComponent: number, content: Content) =>
  fetchCustom({
    url: `components/content?idComponent=${idComponent}`,
    body: content,
    method: "POST",
  });

const deleteComponentMulti = (idList: number[]) =>
  fetchCustom({
    url: `components/multi`,
    body: {
      idList,
    },
    method: "POST",
  });

export {
  getComponents,
  countComponents,
  addComponent,
  updateComponent,
  deleteComponent,
  getComponentById,
  getAllComponents,
  getPropsByIdComponent,
  addPropByIdComponent,
  updatePropByIdComponent,
  deletePropByIdComponent,
  deleteComponentMulti,
  deleteContentByIdComponent,
  addContentByIdComponent,
  addContentListByIdComponent,
};
