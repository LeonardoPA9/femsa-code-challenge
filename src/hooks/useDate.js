import { useMemo } from "react";

const useDate = (date) => {
  date = new Date(date);
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

  return useMemo(
    () =>
      `${date.getDate() + 1} de ${
        months[date.getMonth()]
      }, ${date.getFullYear()}`,
    [date]
  );
};

export default useDate;
