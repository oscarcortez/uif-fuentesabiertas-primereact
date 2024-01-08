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
}) => {
  const [visibleRightBar, setVisibleRightBar] = useState(false);
  const [visibleLeftBar, setVisibleLeftBar] = useState(false);

  return (
    <>
      <TopNavbar
        leftPopupIcon={topbarItems.leftPopupIcon}
        title={topbarItems.title}
        rightPopupIcon={topbarItems.rightPopupIcon}
        onClickForLeftBar={() => setVisibleLeftBar(true)}
        onClickForRightbar={() => setVisibleRightBar(true)}
      />
      <PopupLeftbar
        visible={visibleLeftBar}
        onHide={() => setVisibleLeftBar(false)}
        menuItems={leftbarItems}
      />
      <PopupRightbar
        username={username}
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
