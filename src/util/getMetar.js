const axios = require('axios');

var baseUrl = "http://caac.xafande.com:8000/interface_v4/get_index_info.do";

async function getMaterFromIcao(icao) {
    var request = axios.post(baseUrl,{airport:icao});
    return request;
}

async function getSimpleJson(icao) {
    var request = axios.get(`http://aviation.nmc.cn/json_data/simple/${icao}.json?${new Date().getTime()}`);
    return request;
}

module.exports = {
    getMaterFromIcao,
    getSimpleJson
};