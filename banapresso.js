const axios = require("axios");

// https://banapresso.com/query에서 매장 정보를 불러오는 payload
const formData = {
  ws: "fprocess",
  query: "BPPW3RNZA5O1VJGFFT5M",
  params: {
    nFCode: "",
    sSearchText: ""
  }
};

// 받아온 데이터 가공 (매장이름, 매장주소, 매장Open시간대, 매장사진)
const getData = (array) => {
  let resultData = [];
  array.forEach((item) => {
    const sName = item[1];
    const sAddress = item[13];
    const sStart = new Date(item[18])
      .toLocaleTimeString("ko-KR", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      })
      .split(":")
      .join("");
    const sEnd = new Date(item[19])
      .toLocaleTimeString("ko-KR", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      })
      .split(":")
      .join("");
    const sImg = item[27];

    resultData.push({
      매장이름: sName,
      매장주소: sAddress,
      매장Open시간대: sStart + "~" + sEnd,
      매장사진: sImg
    });
  });

  return resultData;
};

const getShopData = async () => {
  try {
    const response = await axios.post(
      "https://banapresso.com/query",
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const result = getData(response.data.rows);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

getShopData();
