import Header from "../UI Components/components/Header";
import Parent from "../../components/Parent";
import { ReactNode, useEffect } from "react";
import { AdminProvider } from "../../contexts/AdminContext/AdminContext";
import { Outlet, useLocation } from "react-router-dom";
import CategoryAdmin from "./CategoryAdmin";

const Admin = () => {
  //
  const location = useLocation();

  useEffect(() => {
    // navigate("/admin/component");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  //
  return (
    <WrapperAdmin>
      <div className="h-screen w-full overflow-y-scroll">
        {/* <p className="text-2xl font-bold">Create component</p> */}
        <div className="flex h-full gap-3">
          <CategoryAdmin />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
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
        <div className="absolute fixed bottom-4 right-4"></div>
      </div>
    </AdminProvider>
  );
};

export default Admin;
