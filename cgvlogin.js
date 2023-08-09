const axios = require("axios");

const convertToArray = (data) => {
  return JSON.parse("[" + data.match(/\[(.*?)\]/)[1] + "]");
};

const convertToAsciiString = (array) => {
  return array.map((num) => String.fromCharCode(num)).join("");
};

const getKeyData = async () => {
  try {
    const response = await axios.get(
      "https://img.cgv.co.kr/R2014//js/system/crypto.js",
      {
        headers: {
          "Content-Type": "application/javascript"
        }
      }
    );
    const kBytesPattern = /kBytes\s*=\s*\[([\d,\s]+)\];/g;
    const iBytesPattern = /iBytes\s*=\s*\[([\d,\s]+)\];/g;

    const kBytesMatch = response.data.match(kBytesPattern);
    const iBytesMatch = response.data.match(iBytesPattern);

    let resultData = { 알고리즘: "AES" };

    if (kBytesMatch && kBytesMatch[0]) {
      const originalKBytesArray = convertToArray(kBytesMatch[0]);
      const originalKBytesAscii = convertToAsciiString(originalKBytesArray);
      resultData["original key"] = originalKBytesAscii;
    }

    if (iBytesMatch && iBytesMatch[0]) {
      const originalIBytesArray = convertToArray(iBytesMatch[0]);
      const originalIBytesAscii = convertToAsciiString(originalIBytesArray);
      resultData["original iv"] = originalIBytesAscii;
    }

    if (kBytesMatch && kBytesMatch[1]) {
      const nonOriginalKBytesArray = convertToArray(kBytesMatch[1]);
      const nonOriginalKBytesAscii = convertToAsciiString(
        nonOriginalKBytesArray
      );
      resultData["nonOriginal key"] = nonOriginalKBytesAscii;
    }

    if (iBytesMatch && iBytesMatch[1]) {
      const nonOriginalIBytesArray = convertToArray(iBytesMatch[1]);
      const nonOriginalIBytesAscii = convertToAsciiString(
        nonOriginalIBytesArray
      );
      resultData["nonOriginal iv"] = nonOriginalIBytesAscii;
    }
    console.log(resultData);
    return resultData;
  } catch (error) {
    console.error(error);
  }
};

getKeyData();
