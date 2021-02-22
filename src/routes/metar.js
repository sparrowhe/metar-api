const express = require('express');
const logger = require('../logger');
let router = express.Router();

const getMetar = require('../util/getMetar');
const axios = require('axios');

const {
    errCode
} = require('../errcode');

router.post("/:icao", async (req, res) => {
    var metar = "null";
    var txt = "null";
    await getMetar.getMaterFromIcao(req.params.icao).then(res => {
        metar = res.data
    }).catch((err) => {
        logger.errln(err);
        metar = {
            'status': 1,
            'msg': 'Something error'
        };
    });
    res.send(metar);
})

router.post("/awos/:icao", async (req, res) => {
    var awos = null;
    await axios.post('http://caac.xafande.com:8000/interface_v4/get_awos_info.do', {
        airport: req.params.icao
    }).then((res) => {
        awos = res.data;
    }).catch((err) => {
        logger.errln(err);
        awos = {
            'status': 1,
            'msg': 'Something error'
        };
    });
    res.send(awos);
});

router.post('/radar/:icao', async (req, res) => {
    const tres = res
    axios.post('http://caac.xafande.com:8000/interface_v4/search_image_radar.do', {
        airport: req.params.icao,
        scanRadius: "",
        scanType: ""
    }).then((res) => {
        tres.send(res.data);
    });
});
module.exports = router;