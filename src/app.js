import estimator from "./estimator.js";
console.log(estimator({
    region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 3,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
}
 ));