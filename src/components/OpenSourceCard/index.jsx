import { Card } from "primereact/card";
import { SplitButton } from "primereact/splitbutton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { HtmlContent } from "../HtmlContent";
import { LabelValue } from "../LabelValue";
import { CountryFlagItem } from "../CountryFlagItem";

import PropTypes from "prop-types";

export const OpenSourceCard = ({
  item,
  buttonItems = null,
  onJoin = null,
  footer = false,
}) => {
  return (
    <Card
      key={item.id}
      title={item.shortUrl}
      subTitle={
        <Tag
          icon={item.typeListTagIcon}
          value={item.typeList}
          className={item.typeListTagBackground}
        />
      }
      footer={
        footer && (
          <SplitButton
            label="Entrar"
            icon="pi pi-link"
            className={item.buttonClassname}
            onClick={() => onJoin(item)}
            model={buttonItems(item)}
            rounded
          />
        )
      }
      className="md:w-25rem mr-2 mt-2"
    >
      <div className="m-0">
        <LabelValue label="URL" value={item.spacedUrl} />
        <LabelValue
          label="Pais"
          value={<CountryFlagItem countryCode={item.countryCode} />}
        />
        <LabelValue label="Busquedas" value={item.entryValue} />
        <LabelValue label="Salida" value={item.exitValue} />
        <LabelValue label="Precio" value={item.price} />
        <LabelValue label="Ultimo acceso" value={item.lastJoin} />
        <LabelValue label="Accesos" value={item.joins} />
        <Divider />
      </div>
      <HtmlContent content={item.description} />
    </Card>
  );
};

OpenSourceCard.propTypes = {
  item: PropTypes.object.isRequired,
  buttonItems: PropTypes.any,
  onJoin: PropTypes.func,
};
