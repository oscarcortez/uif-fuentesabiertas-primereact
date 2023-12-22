import { BreadCrumb } from "primereact/breadcrumb";
import { useRef, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import axios from "axios";
import "./index.css";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
import { authenticateService } from "../../service/authenticateService";

const deleteAction = (rowData) => {
  console.log("deleteAction", rowData);
};

const editAction = (rowData) => {
  console.log("editAction", rowData);
};

const actionBodyTemplate = (rowData) => {
  return (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded"
        text
        onClick={() => editAction(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded"
        severity="danger"
        text
        onClick={() => deleteAction(rowData)}
      />
    </>
  );
};

export const OpenSourceAdmin = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Administrar" }];
  const home = { icon: "pi pi-home", url: "/" };

  // const cols = [
  //   { field: "description", header: "Descripcion" },
  //   { field: "inputSearch", header: "Busquedas" },
  //   { field: "isSubscribed", header: "Suscrito" },
  //   { field: "price", header: "Precio" },
  //   { field: "url", header: "Url" },
  // ];

  const [openSourceList, setOpenSourceList] = useState([]);
  const dt = useRef(null);
  // const exportColumns = cols.map((col) => ({
  //   title: col.header,
  //   dataKey: col.field,
  // }));
  useEffect(() => {
    const authService = new authenticateService();
    const response = authService.currentUser();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${response.token}`,
    };
    axios
      .get(
        `http://localhost:8075/api/v1/opensources/page?nroPage=1&pageSize=50`,
        { headers }
      )
      .then((response) => {
        setOpenSourceList(response.data);
        //console.log("posts", openSourceList.data.dataList);
        console.log("openSourceList", response.data);
        //console.log("openSourceList");
      });
  }, []);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  // const exportPdf = () => {
  //   import("jspdf").then((jsPDF) => {
  //     import("jspdf-autotable").then((autoTable) => {
  //       const doc = new jsPDF.jsPDF();
  //       autoTable.jsPDFAutoTable(doc, {
  //         columns: exportColumns,
  //         body: openSourceList,
  //       });
  //       doc.save("openSourceList.pdf");
  //     });
  //   });
  // };

  // const saveAsExcelFile = (buffer, fileName) => {
  //   import("file-saver").then((module) => {
  //     if (module && module.default) {
  //       let EXCEL_TYPE =
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //       let EXCEL_EXTENSION = ".xlsx";
  //       const data = new Blob([buffer], {
  //         type: EXCEL_TYPE,
  //       });

  //       module.default.saveAs(
  //         data,
  //         fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  //       );
  //     }
  //   });
  // };

  // const exportExcel = () => {
  //   import("xlsx").then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(openSourceList);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //     const excelBuffer = xlsx.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array",
  //     });

  //     saveAsExcelFile(excelBuffer, "openSourceList");
  //   });
  // };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
      {/* <Button
        type="button"
        icon="pi pi-file-excel"
        severity="success"
        rounded
        onClick={exportExcel}
        data-pr-tooltip="XLS"
      /> */}
      {/* <Button
        type="button"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      /> */}
    </div>
  );

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable
        value={openSourceList.data ? openSourceList.data.dataList : []}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        dataKey="id"
        ref={dt}
        header={header}
        paginator
        emptyMessage="No data found."
        className="datatable-responsive"
        currentPageReportTemplate="Mostrando desde {first} hasta {last} de {totalRecords} fuentes abiertas"
        rows={10}
      >
        <Column field="id" header="ID" sortable></Column>

        <Column
          field="inputSearch"
          header="Busquedas"
          sortable
          filter
          filterPlaceholder="Por busqueda"
        ></Column>
        <Column
          field="isSuscribed"
          header="Esta suscrito"
          sortable
          body={(rowData) => (rowData.isSuscribed ? "Si" : "No")}
          filter
          filterPlaceholder="Suscrito"
        ></Column>
        <Column
          field="price"
          header="Precio $"
          sortable
          filter
          filterPlaceholder="Precio"
        ></Column>
        <Column
          field="url"
          header="Url"
          sortable
          filter
          filterPlaceholder="Url"
        ></Column>
        <Column header="Acciones" body={actionBodyTemplate}></Column>
      </DataTable>
    </>
  );
};
