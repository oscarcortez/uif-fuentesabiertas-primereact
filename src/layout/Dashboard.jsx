import PropTypes from "prop-types";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup } from "primereact/confirmpopup";
import { useRef, useState } from "react";

import { authenticateService } from "../service/authenticateService";
import { sidebarItems } from "../config/sidebarConfig";
import { labels } from "../config/navbarConfig";

export const Dashboard = ({ children }) => {
  const authService = new authenticateService();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const refLogoutButton = useRef(null);
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
      <ConfirmPopup
        target={refLogoutButton.current}
        visible={visible}
        onHide={() => setVisible(false)}
        message={labels.logout.popupMessage}
        icon={`pi pi-${labels.logout.popupIcon}`}
        accept={logout}
        acceptLabel={labels.logout.popupYes}
        rejectLabel={labels.logout.popupNo}
        // reject={}
      />
      <Menubar
        // model={items}
        start={start}
        end={
          <Button
            ref={refLogoutButton}
            label={labels.logout.value}
            onClick={() => setVisible(true)}
            icon={`pi pi-${labels.logout.icon}`}
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
