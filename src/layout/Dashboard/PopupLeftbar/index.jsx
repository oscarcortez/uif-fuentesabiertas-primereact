import { Sidebar } from "primereact/sidebar";
import { Menu } from "primereact/menu";

// import { sidebarItems } from "../../../config/sidebarConfig";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PopupLeftbar = ({ visible, onHide, menuItems }) => {
  const navigate = useNavigate();

  const itemsNavigate = menuItems.map((section) => ({
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
        style={{ width: "250px" }}
        visible={visible}
        position="left"
        onHide={onHide}
      >
        <Menu model={itemsNavigate} className="text-sm" />
      </Sidebar>
    </>
  );
};

PopupLeftbar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
