import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

import { usernameAvatar } from "../../../utils/strings";

import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";

export const TopNavbar = ({
  leftPopupIcon,
  title,
  onClickForLeftBar,
  onClickForRightbar,
  username,
  countryCode,
}) => {
  const navigate = useNavigate();

  const start = (
    <div className="flex">
      <Button
        icon={`pi pi-${leftPopupIcon}`}
        onClick={onClickForLeftBar}
        className="bg-blue-700 hover:bg-blue-800 text-xs border-blue-700 border-1 custom-leftbar-icon" //text-xs border-1 border-blue-700 hidden"
      />
      <Button
        label={title}
        link
        className="text-blue-100 custom-navbar-title p-0"
        onClick={() => {
          console.log("click");
          navigate("/dashboard");
        }}
      />
    </div>
  );
  return (
    <Menubar
      start={start}
      end={
        <div className="flex align-items-center gap-2">
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
              width: "1em",
              height: "1em",
            }}
          />
          <Button
            label={username}
            onClick={onClickForRightbar}
            className="custom-large-config bg-blue-700 text-xs border-1 border-blue-700 hover:bg-blue-800 pl-2 pr-2"
          />
          <Button
            label={usernameAvatar(username)}
            onClick={onClickForRightbar}
            className="custom-short-config bg-blue-700 text-xs border-1 border-blue-700 hover:bg-blue-800"
          />
        </div>
      }
      className="bg-blue-700  top-navbar"
    />
  );
};

TopNavbar.propTypes = {
  onClickForLeftBar: PropTypes.func.isRequired,
  onClickForRightbar: PropTypes.func.isRequired,
  leftPopupIcon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
};
