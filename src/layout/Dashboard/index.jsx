import PropTypes from "prop-types";
import { useState } from "react";

import { PopupRightbar } from "./PopupRightbar";
import { PopupLeftbar } from "./PopupLeftbar";
import { TopNavbar } from "./TopNavbar";
import { LeftbarAndContent } from "./LeftbarAndContent";

import "./index.css";

export const Dashboard = ({
  children,
  topbarItems,
  leftbarItems,
  rightbarItems,
  username,
  userRole,
}) => {
  const [visibleRightBar, setVisibleRightBar] = useState(false);
  const [visibleLeftBar, setVisibleLeftBar] = useState(false);

  const iconRole = {
    Administrador: "pi-lock-open",
    Supervisor: "pi-users",
    Cliente: "pi-user",
  };

  console.log("userrole", userRole);
  console.log("iconRole", iconRole[userRole]);

  return (
    <>
      <TopNavbar
        leftPopupIcon={topbarItems.leftPopupIcon}
        title={topbarItems.title}
        rightPopupIcon={iconRole[userRole]}
        onClickForLeftBar={() => setVisibleLeftBar(true)}
        onClickForRightbar={() => setVisibleRightBar(true)}
        username={username}
        userRole={userRole}
      />
      <PopupLeftbar
        visible={visibleLeftBar}
        onHide={() => setVisibleLeftBar(false)}
        menuItems={leftbarItems}
      />
      <PopupRightbar
        username={username}
        userRole={userRole}
        visible={visibleRightBar}
        onHide={() => setVisibleRightBar(false)}
        menuItems={rightbarItems.menuItems}
        title={rightbarItems.title}
        languageItems={rightbarItems.languageItems}
      />
      <LeftbarAndContent menuItems={leftbarItems}>{children}</LeftbarAndContent>
    </>
  );
};

Dashboard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  topbarItems: PropTypes.object.isRequired,
  leftbarItems: PropTypes.array.isRequired,
  rightbarItems: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};
