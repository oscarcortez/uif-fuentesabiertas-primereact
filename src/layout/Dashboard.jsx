import PropTypes from "prop-types";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";

import { authenticateService } from "../service/authenticateService";
import { sidebarItems } from "../config/configSidebar";
import { labels } from "../config/configNavbar";

export const Dashboard = ({ children }) => {
  const authService = new authenticateService();
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate("/login");
  };

  const start = (
    <>
      <span className="text-white ml-4 font-bold"> {labels.title}</span>
    </>
  );

  const sidebarItemsNavigate = sidebarItems.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      command: () => {
        navigate(item.navigate);
      },
    })),
  }));

  return (
    <>
      <Menubar
        // model={items}
        start={start}
        end={
          <Button
            label={labels.logout}
            onClick={logout}
            icon="pi pi-sign-out"
            className="bg-blue-700 text-xs border-1 border-blue-700 hover:bg-blue-800"
          />
        }
        className="bg-blue-700 fixed w-full"
        style={{ zIndex: 1000 }}
      />
      <div className="flex h-screen bg-white ">
        <div
          className=" w-64 bg-gray-100 p-4 mt-7 fixed"
          style={{ top: 0, left: 0, bottom: 0, overflowY: "auto" }}
        >
          <Menu model={sidebarItemsNavigate} className="text-sm" />
        </div>
        <div
          className="flex-grow h-80 mt-7 w-full"
          style={{ marginLeft: "250px" }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
