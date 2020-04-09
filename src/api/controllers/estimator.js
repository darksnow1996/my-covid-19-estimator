const estimateService = require('../services/estimator.service');
const xml = require('xml');
const o2x = require('object-to-xml');
const fs = require('fs');
const path = require('path');
class estimator{

static async estimates(req,res,next){
    try{
     //   console.log(req.route);
        const responseType = req.params.responseType || "json";

    const { region, periodType,
        timeToElapse,
        reportedCases,
        population,
        totalHospitalBeds } = req.body;
    const estimates = estimateService.covid19ImpactEstimator({
        region, periodType,
        timeToElapse,
        reportedCases,
        population,
        totalHospitalBeds});
        if(responseType == "json"){
       return res.status(200).json({
            ...estimates
        });
    }
        if (responseType == "xml"){
            res.set('Content-Type', 'application/xml');
            res.send(o2x({
                '?xml version="1.0" encoding="utf-8"?': null,
                ...estimates
            }));

    }
    }
    catch(error){
        next(error);
    }


}

static async logs(req,res,next){
    try{
        var appRoot = process.env.PWD
        const filePath = path.join(__dirname,'../', 'access.log');
        var contents = fs.readFileSync(filePath);
        // const logs = JSON.parse(JSON.stringify(contents));
        
        
       // console.log(logs);
        return res.send(contents);

    }
    catch(error){
        next(error);
    }

}

}

module.exports = estimator;