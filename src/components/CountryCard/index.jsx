import { Card } from "primereact/card";
import { Button } from "primereact/button";
import ReactCountryFlag from "react-country-flag";
import PropTypes from "prop-types";

export const CountryCard = ({ name, code, onClick }) => {
  return (
    <>
      <Card
        footer={
          <Button
            label={name}
            style={{ width: "100%" }}
            outlined
            onClick={() => onClick(code)}
          />
        }
        header={
          <div style={{ textAlign: "center", borderRadius: "30px" }}>
            <ReactCountryFlag
              countryCode={code}
              svg
              style={{
                fontSize: "7em",
              }}
            />
          </div>
        }
        className="md:w-12rem mr-5 mb-5"
      />
    </>
  );
};

CountryCard.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  onClick: PropTypes.func,
};
