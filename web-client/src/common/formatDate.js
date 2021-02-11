export const formatDate = (dateToFormat) => {
  const year = dateToFormat.getUTCFullYear().toString();
  const month = (dateToFormat.getUTCMonth() + 1).toString();
  const date = dateToFormat.getUTCDate().toString();

  const dateFormatted = `${year}-${"0".repeat(2 - month.length) + month}-${
    "0".repeat(2 - date.length) + date
  }`;

  return dateFormatted;
};
