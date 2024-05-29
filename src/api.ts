export type DataLimit = {
  url: string;
  offset: number;
  limit: number;
  search: string;
  filters?: Object;
};

type Data = {
  url: string;
  data?: any;
  params?: any;
};
type FetchProps = {
  url: string;
  method?: "POST" | "PUT" | "DELETE" | "GET";
  body?: any;
  params?: any;
  headers?: any;
};

const path = process.env.REACT_APP_BASE_URL;

const fetchCustom = ({ method, body, url, params }: FetchProps) => {
  return fetch(
    `${path}/${url}${
      params
        ? `?${Object.keys(params)
            .map((item) => `${item}=${params[item]}`)
            .join("&")}`
        : ""
    }`,
    {
      method: method || "GET",
      body: body ? JSON.stringify(body) : null,
      headers:
        method === "POST" || method === "PUT"
          ? { "Content-Type": "application/json" }
          : {},
    }
  );
};

const addData = ({ url, data }: Data) => {
  return fetchCustom({
    url: "",
    method: "POST",
    body: data,
  }).then((res) => res.json());
};

const updateData = ({ url, data }: Data) => {
  return fetchCustom({
    url,
    method: "PUT",
    body: data,
  }).then((res) => res.json());
};

const deleteData = ({ url, params }: Data) => {
  return fetchCustom({
    url,
    method: "DELETE",
    params,
  }).then((res) => res.json());
};

const deleteMultiData = ({ url, data }: Data) => {
  return fetchCustom({
    url,
    method: "POST",
    body: data,
  }).then((res) => res.json());
};

const searchData = ({ url, offset, limit, search, filters }: DataLimit) => {
  return fetchCustom({
    url: `custom/search`,
    body: {
      path: url,
      object: {
        offset: offset * limit,
        limit: limit,
        search: search || "",
        filters: filters || {},
      },
    },
    method: "POST",
  }).then((res) => res.json());
};

const getDataById = ({ url, id }: { url: string; id: number }) => {
  return fetchCustom({
    url,
    params: { id },
  }).then((res) => res.json());
};

export {
  addData,
  updateData,
  deleteData,
  searchData,
  getDataById,
  deleteMultiData,
};
