class countryService {
  findAllForDdl() {
    const result = [
      // { name: "Seleccione un Pais", code: "" },
      { name: "CHILE", code: "CL" },
      { name: "PERU", code: "PE" },
      { name: "SURINAME", code: "SR" },
      { name: "PANAMA", code: "PA" },
      { name: "EL SALVADOR", code: "SV" },
      { name: "HONDURAS", code: "HN" },
      { name: "PARAGUAY", code: "PY" },
      { name: "TRINIDAD Y TOBAGO", code: "TT" },
      { name: "GUATEMALA", code: "GT" },
      { name: "VENEZUELA", code: "VE" },
    ];
    //const countries = await this.country.getCountries();
    return result;
  }
}

export default new countryService();
