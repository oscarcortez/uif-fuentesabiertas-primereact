import ReactCountryFlag from "react-country-flag";
import PropTypes from "prop-types";

export const CountryFlagItem = ({ countryCode }) => {
  return (
    <>
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "2em",
          height: "1.5em",
        }}
        className="mr-2"
      />
      <span>{countryCode}</span>
    </>
  );
};

CountryFlagItem.propTypes = {
  countryCode: PropTypes.string.isRequired,
};
