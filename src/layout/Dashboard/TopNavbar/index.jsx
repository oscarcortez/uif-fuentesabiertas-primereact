import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

export const TopNavbar = ({
  leftPopupIcon,
  title,
  rightPopupIcon,
  onClickForLeftBar,
  onClickForRightbar,
  username,
  userRole,
}) => {
  const start = (
    <div className="flex">
      <Button
        icon={`pi pi-${leftPopupIcon}`}
        onClick={onClickForLeftBar}
        className="bg-blue-700 hover:bg-blue-800 text-xs border-blue-700 border-1 custom-leftbar-icon" //text-xs border-1 border-blue-700 hidden"
      />
      <div className="text-blue-100 custom-navbar-title">{title}</div>
    </div>
  );
  return (
    <Menubar
      start={start}
      end={
        <div className="flex align-items-center gap-2">
          <span className="text-blue-100">{username}</span>
          <span className="text-blue-100">|</span>
          <span className="text-blue-100">{userRole}</span>
          <span className="text-blue-100">|</span>
          <Button
            icon={`pi pi-${rightPopupIcon}`}
            onClick={onClickForRightbar}
            className="bg-blue-700 text-xs border-1 border-blue-700 hover:bg-blue-800"
          />
        </div>
      }
      className="bg-blue-700  top-navbar"
      // style={{ zIndex: 1000 }}
    />
  );
};

TopNavbar.propTypes = {
  onClickForLeftBar: PropTypes.func.isRequired,
  onClickForRightbar: PropTypes.func.isRequired,
  leftPopupIcon: PropTypes.string.isRequired,
  rightPopupIcon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
