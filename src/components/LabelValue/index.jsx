import PropTypes from "prop-types";

export const LabelValue = ({ label, value }) => {
  return (
    <p>
      <span className="font-bold mr-2">{label}:</span>
      {value}
    </p>
  );
};

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};
