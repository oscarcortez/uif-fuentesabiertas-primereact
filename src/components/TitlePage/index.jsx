import { Divider } from "primereact/divider";

export const TitlePage = ({ title }) => {
  return (
    <>
      <h3 className="ml-3 text-gray-600">{title}</h3>
      <Divider />
    </>
  );
};
