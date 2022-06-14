const capitalize = (str) => {
  const arrStr = str.split(" ");
  const arrCapitalize = arrStr.map(
    (word) => word[0].toUpperCase() + word.substring(1)
  );
  return arrCapitalize.join(" ");
};
module.exports = capitalize;
