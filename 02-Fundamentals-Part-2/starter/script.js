'use strict';

/*

function logger() {
    console.log('1');
}


const x = logger();
console.log(x); // return undefined;


// Parameter is the name of the value
function describeCountry(country,population,capitalCity) {
    const info = `${country} has ${population} million people and it's capital city is ${capitalCity}`
    return info

}

// Argument  is the actual value in the placeholder
// Function declaration
const israelDescription = describeCountry('Israel',9.7,'Jerusalem');
const germanyDescription = describeCountry('Germany',82,'Berlin');
const franceDescription = describeCountry('France',67.5,'Paris');

console.log(israelDescription);
console.log(germanyDescription);
console.log(franceDescription);

// Function expression also called anonimus  function
const calcAge1 = function (birthYear) {
    return 2037 - birthYear
}

const age1 = calcAge1(1988);
console.log(age1);

function percentageOfWorld1(population) {
    return ( population / 7900 ) * 100;

}

const percentageOfWorld2 = function (population) {
    return ( population / 7900 ) * 100;

}

const percentageOfWorld3 = population => (population / 7900) * 100

const israelPrecentage1 = percentageOfWorld1(9.5);
const germanyPrecentage1 = percentageOfWorld1(82);
const francePrecentage1 = percentageOfWorld1(67);

const israelPrecentage2 = percentageOfWorld1(9.5);
const germanyPrecentage2 = percentageOfWorld1(82);
const francePrecentage2 = percentageOfWorld1(67);

const israelPrecentage3 = percentageOfWorld1(9.5);
const germanyPrecentage3 = percentageOfWorld1(82);
const francePrecentage3 = percentageOfWorld1(67);

console.log(`Israel has 9.5 million people, so it's about ${israelPrecentage1}% of the world population`);
console.log(`Germany has 82 million people, so it's about ${germanyPrecentage1}% of the world population`);
console.log(`France has 67 million people, so it's about ${francePrecentage1}% of the world population`);
console.log('----------------------------------------------------------------------------------------------');
console.log(`Israel has 9.5 million people, so it's about ${israelPrecentage2}% of the world population`);
console.log(`Germany has 82 million people, so it's about ${germanyPrecentage2}% of the world population`);
console.log(`France has 67 million people, so it's about ${francePrecentage2}% of the world population`);
console.log('----------------------------------------------------------------------------------------------');
console.log(`Israel has 9.5 million people, so it's about ${israelPrecentage3}% of the world population`);
console.log(`Germany has 82 million people, so it's about ${germanyPrecentage3}% of the world population`);
console.log(`France has 67 million people, so it's about ${francePrecentage3}% of the world population`);

function percentageOfWorld(population) {
    return ( population / 7900 ) * 100;

}

function describePopulation1(country,population) {
    const portionOfTheWorld = percentageOfWorld(9.5);
    return `${country} has ${population} million people, which is about ${portionOfTheWorld}% of the world`

}

const info = (country,population) => {
    const portionOfTheWorld = percentageOfWorld(9.5);
    return `${country} has ${population} million people, which is about ${portionOfTheWorld}% of the world`
}

console.log(describePopulation1('Israel',9.7));
console.log(info('Germany',82));



const calcAverage = (score1,score2,score3) => (score1 + score2 + score3) / 3;

function checkWinner(avgDolhins,avgKoalas) {
    if(avgDolhins >= avgKoalas * 2) {
        console.log(`The winer is Dolphins team with ${avgDolhins} victory points`);
    } else if (avgKoalas >= avgDolhins * 2) {  
        console.log(`The winer is Koalas team with ${avgKoalas} victory points`);
    } else {
        console.log(`No winer`);
    }
}

const scoreDolhins1 = calcAverage(44,23,71);
const scoreKoalas1 = calcAverage(65,54,49);
checkWinner(scoreDolhins1,scoreKoalas1);

const scoreDolhins2 = calcAverage(85,54,41);
const scoreKoalas2 = calcAverage(23,34,27);
checkWinner(scoreDolhins2,scoreKoalas2);



const populations = [9.7,320,59.1,47.2];

console.log(populations.length === 4);

function percentageOfWorld(population) {
    return ( population / 7900 ) * 100;

}

const israelPrecentage = percentageOfWorld(populations[0]);
const usaPrecentage = percentageOfWorld(populations[1]);
const italyPrecentage = percentageOfWorld(populations[2]);
const spainPrecentage = percentageOfWorld(populations[3]);

const percentages = [israelPrecentage,usaPrecentage,italyPrecentage,spainPrecentage];
console.log(percentages);



const neighbours = ['France','Austria','Poland'];

neighbours.push('Utopia');
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes('Germany')) {
    console.log('Probably not a central European country :D');
} else {
    console.log('central European country :D');
}

const indexToChange = neighbours.indexOf('France');
console.log(indexToChange);
neighbours[indexToChange] = 'Sweden'
console.log(neighbours);



const bills = [125,555,44];
console.log(bills);

function calcTip(bill) {
    const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
    return tip
}

const testBill = calcTip(100);
console.log(testBill);

const tips = [calcTip(bills[0]),calcTip(bills[1]),calcTip(bills[2])];
console.log(tips);

const total = [tips[0] + bills[0],tips[1] + bills[1],tips[2] + bills[2]];
console.log(total);



const myCountry = {
    country: 'Israel',
    capital: 'Jerusalem',
    language: 'Hebrew',
    population: 9.7,
    neighbours: ['Lebanon','Jordan','Egypt']
}

console.log(myCountry);

const jonas = {
    firstName :'Jonas',
    lastName : 'Scmetmann',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
}

console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);

const myCountry = {
    country: 'Israel',
    capital: 'Jerusalem',
    language: 'Hebrew',
    population: 9.7,
    neighbours: ['Lebanon','Jordan','Egypt']
}

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people,${myCountry.neighbours.length}
neighbouring countries and a capital called ${myCountry.capital}.'`);

myCountry.population += 2;
console.log(myCountry.population);

myCountry['population'] -= 2;
console.log(myCountry['population']);



const jonas = {
    firstName :'Jonas',
    lastName : 'Scmetmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasADriverLicense: true,
    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age
    },
    driverString: function () {
        const a = this.hasADriverLicense ? 'has a': "doesn't have";
        return a
    }
}

console.log(`${jonas.firstName} is a ${jonas.calcAge()}-year old ${jonas.job}, and he ${jonas.driverString()} driver's license`);



const myCountry = {
    country: 'Israel',
    capital: 'Jerusalem',
    language: 'Hebrew',
    population: 9.7,
    neighbours: ['Lebanon','Jordan','Egypt'],
    describe: function() {
        console.log(`${this.country} has ${this.population} million ${this.language}-speaking people,${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`);
    },
    checkIsland: function() {
        this.isIsland = this.neighbours.length > 0 ? false : true;
    }
}

myCountry.describe();
console.log(myCountry.checkIsland());
console.log(myCountry.isIsland);



const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    weight: 78,
    height: 1.69,
    calcBMI: function() {
        this.markBMI = this.weight / this.height ** 2
    }
}

const john = {
    firstName: 'John',
    lastName: 'Smith',
    weight: 92,
    height: 1.95,
    calcBMI: function() {
        this.johnBMI = this.weight / this.height ** 2
    }
}

mark.calcBMI();
john.calcBMI();

mark.markBMI > john.johnBMI ? 
console.log(`${mark.firstName}'s ${mark.lastName} BMI (${mark.markBMI} is higher than ${john.firstName}'s (${john.johnBMI})!`): 
console.log(`${john.firstName}'s ${john.lastName} BMI (${john.johnBMI} is higher than ${mark.firstName}'s (${mark.markBMI})!`);

for(let i=1; i <= 50; i++) {
    console.log(`Voter number ${i} is currently voting`);
}



const populations = [9.7,320,59.1,47.2];
const percentages2 = [];

for(let i = 0;i < populations.length;i++) {
    percentages2.push(percentageOfWorld1(populations[i]));
}

function percentageOfWorld1(population) {
    return ( population / 7900 ) * 100;
}
console.log(percentages2);



const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

for(let a = 0;a < listOfNeighbours.length;a++){
    for(let i = 0;i < listOfNeighbours[a].length;i++){
        console.log(`Neighbour:${listOfNeighbours[a][i]}`);
    }
}



const populations = [9.7,320,59.1,47.2];
const percentages2 = [];

for(let i = 0;i < populations.length;i++) {
    percentages2.push(percentageOfWorld1(populations[i]));
}

function percentageOfWorld1(population) {
    return ( population / 7900 ) * 100;
}
console.log(percentages2);


const populations1 = [9.7,320,59.1,47.2];
const percentages3 = [];

let m = 0;
while ( m < populations1.length) {
    console.log(populations1[m]);
    percentages3.push(percentageOfWorld1(populations[m]));
    m++;
}

console.log(percentages3);

*/

// Coding challange #4

const bills = [22,295,176,440,37,105,10,1100,86,52];
const tips = [];
const totals = [];
let sum = 0;

function calcTip(bill) {
    const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
    return tip
}

function calcAverage(arr){
    sum = 0;
    for(let i=0;i < arr.length;i++) {
        sum += arr[i];
    }
    return sum / arr.length
}

for(let i = 0 ; i < bills.length; i++) {
    tips.push(calcTip(bills[i]))
    totals.push(bills[i] + tips[i])
}
console.log(`Bills: ${bills}`);
console.log(`Tips: ${tips}`);
console.log(`Totals: ${totals}`);

console.log(sum);
console.log(calcAverage(totals));
console.log(calcAverage(tips));






