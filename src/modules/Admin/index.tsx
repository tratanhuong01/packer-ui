import Header from "../UI Components/components/Header";
import Parent from "../../components/Parent";
import { ReactNode, useContext, useEffect, useState } from "react";
import AutoComplete from "../../components/AutoComplete";
import ComponentList from "../../routers/GenerateRoute/ComponentList";
import FeatureComponent from "./FeatureComponent";
import Button from "../../components/Button";
import {
  AdminContext,
  AdminProvider,
} from "../../contexts/AdminContext/AdminContext";
import { useLocation, useNavigate } from "react-router-dom";
import ContentComponent from "./ContentComponent";
import {
  ItemGenerateChild,
  ItemGenerateRoute,
} from "../../routers/GenerateRoute/type";
import MainAdmin from "./MainAdmin";

const ChildrenAdmin = () => {
  //
  const {
    admin: {
      props: { current },
    },
    dispatch,
    actions: { updateProps },
  } = useContext(AdminContext);
  const location = useLocation();
  const navigate = useNavigate();
  const ls = localStorage.getItem("components");
  const components: ItemGenerateRoute = ls ? JSON.parse(ls) : null;
  const handleSave = (listRender: any) => {
    if (!components || !current) return;
    if (components.items.findIndex((item) => item.name === current) !== -1) {
      alert("Component exist!");
      return;
    }
    let newComponent: ItemGenerateChild = {
      id: Math.random(),
      name: current,
      type: "app",
      component: [
        {
          id: Math.random(),
          content: "Button",
          type: "Title",
          renderType: "",
        },
      ],
    };
    localStorage.setItem(
      "components",
      JSON.stringify({
        ...components,
        items: [...components.items, newComponent],
      })
    );
    navigate("/");
  };
  //
  useEffect(() => {
    if (!localStorage.getItem("components"))
      localStorage.setItem(
        "components",
        JSON.stringify({
          id: Math.random(),
          name: "Components",
          items: [],
        })
      );
    navigate("/admin");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  //
  return (
    <div className="h-screen w-full overflow-y-scroll">
      <p className="text-2xl font-bold">Create component</p>
      <MainAdmin />
    </div>
  );
};

const Admin = () => {
  return (
    <WrapperAdmin>
      <ChildrenAdmin />
    </WrapperAdmin>
  );
};

const WrapperAdmin = ({ children }: { children?: ReactNode }) => {
  return (
    <AdminProvider>
      <div className="h-screen w-full overflow-hidden flex flex-col">
        <Header isAdmin />
        <Parent
          gap={10}
          className="flex-1 flex-col overflow-hidden p-4 w-full mx-auto"
        >
          {children}
        </Parent>
      </div>
    </AdminProvider>
  );
};

export default Admin;
