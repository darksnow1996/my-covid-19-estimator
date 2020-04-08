class estimatorService{
static getDays(period, periodType = "days") {
    switch (periodType) {
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
static getInfectedFactor(period = 28, periodType = "days") {
    const days = this.getDays(period, periodType);
    let power = days / 3;
    const factor = Math.pow(2, power);

    return factor;


}

static availableBeds(totalBeds, patients) {
    const available = totalBeds * 0.35;
    const hospitalBeds = available - patients;
    return hospitalBeds;
}
static covid19ImpactEstimator ({ region = {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
},
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds }) {


    const currentlyInfected = reportedCases * 10;

    const currentlyInfectedSevere = reportedCases * 50;

    const infectionsByRequestedTime = currentlyInfected * this.getInfectedFactor(timeToElapse, periodType);


    const infectionsByRequestedTimeSevere = currentlyInfectedSevere * this.getInfectedFactor();
    const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
    const severeCasesByRequestedTimeSevere = infectionsByRequestedTimeSevere * 0.15;
    const hospitalBedsByRequestedTime = this.availableBeds(totalHospitalBeds, severeCasesByRequestedTime);
    const hospitalBedsByRequestedTimeSevere = this.availableBeds(totalHospitalBeds, severeCasesByRequestedTimeSevere);
    const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;
    const casesForICUByRequestedTimeSevere = infectionsByRequestedTimeSevere * 0.05;
    const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;
    const casesForVentilatorsByRequestedTimeSevere = infectionsByRequestedTimeSevere * 0.02;
    const dollarsInFlight = infectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * this.getDays(timeToElapse, periodType);
    const dollarsInFlightSevere = infectionsByRequestedTimeSevere * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * this.getDays(timeToElapse, periodType);

    const outputData = {
        data: {
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
        severe: {
            currentlyInfected: currentlyInfectedSevere,
            infectionsByRequestedTime: infectionsByRequestedTimeSevere,
            severeCasesByRequestedTime: severeCasesByRequestedTimeSevere,
            hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevere,
            casesForICUByRequestedTime: casesForICUByRequestedTimeSevere,
            casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevere,
            dollarsInFlight: dollarsInFlightSevere
        }
    };

    return outputData;





}

}
module.exports = estimatorService;