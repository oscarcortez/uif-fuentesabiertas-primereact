import PropTypes from "prop-types";
import classNames from "classnames";

import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";

export const ExperienceExchangeForm = ({ labels, formik, mutation, toast }) => {
  addLocale("es", {
    firstDayOfWeek: 1,
    showMonthAfterYear: true,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="pages-panel card flex flex-column"
      >
        <div className="form-container">
          <div className="form-column">
            <div className="p-inputgroup flex-1 mb-3">
              <span className="p-inputgroup-addon">
                <i className="pi pi-tag"></i>
              </span>
              <InputText
                type="text"
                id="name"
                name="name"
                placeholder={labels.name}
                autoComplete="name"
                {...formik.getFieldProps("name")}
                className={classNames("w-full", {
                  "p-invalid": formik.errors.name && formik.touched.name,
                })}
              />
            </div>

            <Editor
              style={{ height: "320px" }}
              value={formik.values.description}
              onTextChange={(e) => {
                formik.setFieldValue("description", e.htmlValue);
              }}
            />
          </div>

          <div
            className="surface-card p-4 w-full bg-blue-800 column"
            style={{ flex: "1" }}
          >
            <Panel header="Fecha Evento" className="my-panel">
              <div className="p-inputgroup flex-1">
                <Calendar
                  inputId="eventDate"
                  name="eventDate"
                  value={formik.values.eventDate}
                  onChange={(e) => {
                    formik.setFieldValue("eventDate", e.target.value);
                  }}
                  dateFormat="dd/mm/yy"
                  inline
                  locale="es"
                />
              </div>
            </Panel>
            <Panel header="Duracion Horas" className="my-panel">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-clock"></i>
                </span>
                <InputNumber
                  inputId="hoursDuration"
                  name="hoursDuration"
                  placeholder={labels.hoursDuration}
                  value={formik.values.hoursDuration}
                  onValueChange={(e) => {
                    formik.setFieldValue("hoursDuration", e.value);
                  }}
                  showButtons
                  step={0.5}
                  min={0}
                  className={classNames("w-full", {
                    "p-invalid": formik.errors.price && formik.touched.price,
                  })}
                />
              </div>
            </Panel>
            <div className="card flex justify-content-center mt-3">
              <span className="p-buttonset">
                <Button
                  type="submit"
                  label={labels.submit}
                  loading={mutation.isPending}
                  icon="pi pi-plus"
                />
                <Button
                  type="reset"
                  label="Reset"
                  icon="pi pi-trash"
                  onClick={formik.handleReset}
                  outlined
                />
              </span>
            </div>
          </div>
          <Toast ref={toast} position="center" />
        </div>
      </form>
    </>
  );
};

ExperienceExchangeForm.propTypes = {
  labels: PropTypes.object.isRequired,
  formik: PropTypes.object.isRequired,
  mutation: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
};
