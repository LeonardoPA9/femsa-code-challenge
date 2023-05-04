import { useCallback } from "react";

const useDate = () => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return useCallback((date) => {
    const _date = new Date(date);
    return `${_date.getUTCDate()} de ${
      months[_date.getUTCMonth()]
    }, ${_date.getUTCFullYear()}`;
  }, []);
};

export default useDate;
