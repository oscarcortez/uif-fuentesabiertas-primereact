import Button from "primereact/button";
import ReactCountryFlag from "react-country-flag";

export const iconButtonTemplate = (icon) => {
  return (
    <Button outlined>
      <ReactCountryFlag
        countryCode={icon.countryCode}
        svg
        style={{
          width: "1em",
          height: "1em",
        }}
      />
    </Button>
  );
};
