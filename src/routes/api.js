const express = require('express');
const axios = require('axios');
const logger = require('../logger');
const fs = require('fs');
const path = require('path');


let router = express.Router();

const getMetar = require('../util/getMetar');

router.post("/whazzup", async (req, res) => {
    var whazzup = "null";
    await axios.get('https://map.sinofsx.com/whazzup.txt').then((res) => {
        whazzup = res.data;
    }).catch((err) => {
        logger.errln(err);
        whazzup = {
            'status': 1,
            'msg': 'Something error'
        };
    })
    res.send(whazzup);
})
router.post("/available", async (req, res) => {
    // var json = "null";
    // await axios.get('https://aip.sparrowhe.top/api/available.json').then((res) => {
    //     json = res.data;
    // }).catch((err) => {
    //     logger.errln(err);
    //     json = {'status':1, 'msg':'Something error'};
    // })
    res.send(fs.readFileSync(path.join(__dirname, '../../aip_json/available.json')));
})
router.post("/getCycleJson/:cycle", async (req, res) => {
    // var json = "null";
    // await axios.get(`https://aip.sparrowhe.top/api/${req.params.cycle}.json`).then((res) => {
    //     json = res.data;
    // }).catch((err) => {
    //     logger.errln(err);
    //     json = {'status':1, 'msg':'Something error'};
    // })
    if (parseInt(req.params.cycle).toString() == 'NaN') {
        res.send('Oh, Stop Your Stupid Behavior');
    } else {
        try {
            res.send(fs.readFileSync(path.join(__dirname, `../../aip_json/${parseInt(req.params.cycle).toString()}.json`)))
        } catch (error) {
            res.send('Something Error');
        }
    }
    res.send();
});
router.post("/getCycleNotam/:cycle", async (req, res) => {
    // var json = "null";
    // await axios.get(`https://aip.sparrowhe.top/api/${req.params.cycle}.json`).then((res) => {
    //     json = res.data;
    // }).catch((err) => {
    //     logger.errln(err);
    //     json = {'status':1, 'msg':'Something error'};
    // })
    if (parseInt(req.params.cycle).toString() == 'NaN') {
        res.send('Oh, Stop Your Stupid Behavior');
    } else {
        try {
            res.send(fs.readFileSync(path.join(__dirname, `../../aip_json/updataNotam/${parseInt(req.params.cycle).toString()}.json`)))
        } catch (error) {
            res.send('Something Error');
        }
    }
    res.send();
})
router.get('/cesoc/onlineList', async (req, res) => {
    let token = '';
    let rres = res;
    axios.get('https://oc.cesair.net').then((res) => {
        for (let i = 7; i < 7 + 32; i++) token += res.data[res.data.indexOf('token') + i];
        axios.get(`https://oc.cesair.net/get_table_data.php?page=1&limit=10&type=Live_Flight&token=${token}`).then((res) => {
            rres.send(res.data);
        });
    });
});
// router.get('/image/:file', async (req, res) => {
//     let r=null;
//     res.setHeader('Content-Type', 'image/gif')
//     let rrr = res;
//     axios.get(`http://caac.xafande.com:8000/image/${req.params.file.replace('_','/')}`,{ responseType: 'blob'}).then((res) => {
//         rrr.send(res.data);
//     });
// })

module.exports = router;