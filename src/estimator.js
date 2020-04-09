
function getDays(period,periodType = "days"){
    switch(periodType){
    case "days":
        var days = period 
        break;
    case "months":
        var days = period * 30;
        break;
    case "weeks":
        var days = period * 7;
        
}
return days;
}
function getInfectedFactor(period=28,periodType="days"){
    const days = getDays(period,periodType);
    let power = days / 3;
    const factor = Math.pow(2, power);

return factor;
    
 
}

function availableBeds(totalBeds, patients){
    const available = totalBeds * 0.35;
    const hospitalBeds = available - patients;
    return hospitalBeds;
}
const covid19ImpactEstimator = ({ region = {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
},
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds }) => {
   

    const currentlyInfected = reportedCases * 10;

    const  currentlyInfectedSevere = reportedCases * 50;
    
    const infectionsByRequestedTime =currentlyInfected * getInfectedFactor(timeToElapse, periodType);


    const infectionsByRequestedTimeSevere = currentlyInfectedSevere *getInfectedFactor();
    const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
    const severeCasesByRequestedTimeSevere = infectionsByRequestedTimeSevere * 0.15;
    const hospitalBedsByRequestedTime = availableBeds(totalHospitalBeds, severeCasesByRequestedTime);
    const hospitalBedsByRequestedTimeSevere = availableBeds(totalHospitalBeds, severeCasesByRequestedTimeSevere);
    const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;
    const casesForICUByRequestedTimeSevere = infectionsByRequestedTimeSevere * 0.05;
    const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;
    const casesForVentilatorsByRequestedTimeSevere = infectionsByRequestedTimeSevere * 0.02;
    const dollarsInFlight = infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * getDays(timeToElapse,periodType);
    const dollarsInFlightSevere = infectionsByRequestedTimeSevere * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * getDays(timeToElapse, periodType);

    const outputData = {
        data:{
            region,
            periodType,
            timeToElapse,
            reportedCases,
            population,
            totalHospitalBeds
        },
        impact: {
            currentlyInfected,
            infectionsByRequestedTime,
            severeCasesByRequestedTime,
            hospitalBedsByRequestedTime,
            casesForICUByRequestedTime,
            casesForVentilatorsByRequestedTime,
            dollarsInFlight

        },
        severe:{
            currentlyInfected: currentlyInfectedSevere,
            infectionsByRequestedTime: infectionsByRequestedTimeSevere,
            severeCasesByRequestedTime: severeCasesByRequestedTimeSevere,
            hospitalBedsByRequestedTime : hospitalBedsByRequestedTimeSevere,
            casesForICUByRequestedTime: casesForICUByRequestedTimeSevere,
            casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevere,
            dollarsInFlight: dollarsInFlightSevere
        }
    };

    return outputData;

    



    };



export default covid19ImpactEstimator;
