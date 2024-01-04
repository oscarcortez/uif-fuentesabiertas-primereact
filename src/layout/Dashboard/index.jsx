import PropTypes from "prop-types";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup } from "primereact/confirmpopup";
import { useRef, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";

import ReactCountryFlag from "react-country-flag";

import { logout } from "../../service/authenticateService";
import { sidebarItems } from "../../config/sidebarConfig";
import { labels } from "../../config/navbarConfig";

import "./index.css";

export const Dashboard = ({ children }) => {
  const [visibleRightBar, setVisibleRightBar] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const languages = [
    { name: "Español", code: "ES" },
    { name: "English", code: "EN" },
    { name: "Portugues", code: "PT" },
  ];

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const refLogoutButton = useRef(null);
  const logout1 = () => {
    logout();
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
      <Sidebar
        visible={visibleRightBar}
        position="right"
        onHide={() => setVisibleRightBar(false)}
      >
        <div className="center-content">
          <h2>Bienvenido</h2>

          <Avatar label="OC" size="xlarge" />
        </div>

        <div className="card flex justify-content-center">
          <span className="p-buttonset">
            <Button outlined>
              <ReactCountryFlag
                countryCode="ES"
                svg
                style={{
                  width: "1em",
                  height: "1em",
                }}
              />
            </Button>
            <Button outlined>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: "1em",
                  height: "1em",
                }}
              />
            </Button>
            <Button outlined>
              <ReactCountryFlag
                countryCode="PT"
                svg
                style={{
                  width: "1em",
                  height: "1em",
                }}
              />
            </Button>
          </span>
        </div>
      </Sidebar>
      <ConfirmPopup
        target={refLogoutButton.current}
        visible={visible}
        onHide={() => setVisible(false)}
        message={labels.logout.popupMessage}
        icon={`pi pi-${labels.logout.popupIcon}`}
        accept={logout1}
        acceptLabel={labels.logout.popupYes}
        rejectLabel={labels.logout.popupNo}
        // reject={}
      />
      <Menubar
        // model={items}
        start={start}
        end={
          <>
            <Dropdown
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.value)}
              options={languages}
              optionLabel="name"
              placeholder="Idioma"
              className="w-full md:w-10rem bg-blue-100"
            />
            <Button
              ref={refLogoutButton}
              label={labels.logout.value}
              onClick={() => setVisible(true)}
              icon={`pi pi-${labels.logout.icon}`}
              className="bg-blue-700 text-xs border-1 border-blue-700 hover:bg-blue-800"
            />
            <Button
              icon="pi pi-arrow-left"
              onClick={() => setVisibleRightBar(true)}
            />
          </>
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
