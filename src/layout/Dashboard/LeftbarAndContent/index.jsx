import { Menu } from "primereact/menu";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const LeftbarAndContent = ({ children, menuItems }) => {
  const navigate = useNavigate();
  const sidebarItemsNavigate = menuItems.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      command: () => {
        navigate(item.navigate);
      },
    })),
  }));

  return (
    <div className="flex h-screen bg-white">
      <div className="custom-left-sidebar">
        <Menu model={sidebarItemsNavigate} className="text-sm" />
      </div>
      <div className="custom-main-container">{children}</div>
    </div>
  );
};

LeftbarAndContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
