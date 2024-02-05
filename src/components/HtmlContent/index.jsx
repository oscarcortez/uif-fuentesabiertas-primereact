import PropTypes from "prop-types";

export const HtmlContent = ({ content }) => {
  return <p className="m-0" dangerouslySetInnerHTML={{ __html: content }} />;
};

HtmlContent.propTypes = {
  content: PropTypes.any.isRequired,
};
