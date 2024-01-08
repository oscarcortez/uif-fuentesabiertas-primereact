import PropTypes from "prop-types";

import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { DataView } from "primereact/dataview";
import { useNavigate } from "react-router-dom";
import { usernameFormated, usernameAvatar } from "../../../utils/strings";

import { iconButtonTemplate } from "./iconButttonTemplate";
import { logout as logoutService } from "../../../service/authenticateService";

import "./index.css";

export const PopupRightbar = ({
  visible,
  onHide,
  menuItems,
  title,
  languageItems,
  username,
}) => {
  const navigate = useNavigate();

  const itemsNavigate = menuItems.map((item) => ({
    ...item,
    command: () => {
      item.isLogout && logoutService();
      navigate(item.navigate);
    },
  }));

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      style={{ width: "250px" }}
      position="right"
    >
      <div className="center-content">
        <h2>{title}</h2>
        <Avatar label={usernameAvatar(username)} size="xlarge" />
        <h4>{usernameFormated(username)}</h4>
        <Menu model={itemsNavigate} className="text-sm mt-3" />
      </div>
      <div className="card flex justify-content-center mt-3">
        <span className="p-buttonset">
          <DataView value={languageItems} itemTemplate={iconButtonTemplate} />
        </span>
      </div>
    </Sidebar>
  );
};

PopupRightbar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  languageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  username: PropTypes.string.isRequired,
};
