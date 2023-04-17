'use strict';
// Combine 2 arrays and calculate the temperature amplitude
const temperatures1 = [3,-2,-6,-1,'error',9,13,17,15,9,5];
const temperatures2 = [3,-2,-6,-1,'error',9,13,17,15,9,35];

let minTemperature = temperatures1[0];
let maxTemperature = temperatures1[0];

function calcMin(temperature) {
    if (temperature < minTemperature) minTemperature = temperature;
};
function calcMax(temperature){
    if (temperature > maxTemperature) maxTemperature = temperature; 
};

function calcAmplitude(arr1,arr2) {
    let temperaturesCombined = arr1.concat(arr2);
    let tempAmplitude = 0;

    for(let i = 0; i < temperaturesCombined.length ;i++) {
        if(typeof temperaturesCombined[i] == 'number') {
            calcMin(temperaturesCombined[i]);
            calcMax(temperaturesCombined[i]);
        }
    }
    tempAmplitude = maxTemperature - minTemperature;
    console.log(`Temperature amplitude: ${tempAmplitude}`);
}

calcAmplitude(temperatures1,temperatures2);

// Coding Challenge #1
// Given an array of forecasted maximum temperatures, the thermometer displays a 
// string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1 
// days ... 21ºC in 2 days ... 23ºC in 3 days ..."
// Your tasks:
// 1. Create a function 'printForecast' which takes in an array 'arr' and logs a 
// string like the above to the console. Try it with both test datasets.
// 2. Use the problem-solving framework: Understand the problem and break it up 
// into sub-problems!
// Test data:
// § Data 1: [17, 21, 23]
// § Data 2: [12, 5, -5, 0, 4]
// GOOD LUCK �

const maxTemperatures1 = [17, 21, 23];
const maxTemperatures2 = [12, 5, -5, 0, 4];

function printForecast(arr) {
    let forcast = '...';
    for(let i = 0; i < arr.length; i++) {
        forcast += `${arr[i]}ºC in ${i + 1} days ...`
    }
    console.log(forcast);
}

printForecast(maxTemperatures1);
printForecast(maxTemperatures2);

