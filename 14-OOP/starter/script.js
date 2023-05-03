'use strict';

/*

const Person = function (firstName,birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
};

const max = new Person('Max',1988);
console.log(max);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda =  new Person('Matilda', 2017);

console.log(max instanceof Person);//Output: true

//---------------------------------------------------------------------------

// Prototypes
// We will see that we have access to the calcAge method even that the max object dosen't carry the calcAge method
// this is possivble due to prototype inheritance better for performance and will be used only where is needed
console.log(Person.prototype);

// Only one copy
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}

max.calcAge();

console.log(max.__proto__);
console.log(max.__proto__ === Person.prototype);//Output: true
console.log(Person.prototype.isPrototypeOf(max));

Person.prototype.species = 'Homo sapiens';
console.log(max.species, matilda.species);

console.log(max.hasOwnProperty('firstName'));//Output: true
// false because it dosen't contain species property
console.log(max.hasOwnProperty('species'));//Output: false

//-----------------------------------------------------------------------

console.log(matilda.__proto__);
// Object.protype (top of prototype chain)
console.log(matilda.__proto__.__proto__);
console.log(matilda.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3,5,6,4,5,2,8];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);//Output: true

console.log(arr.__proto__.__proto__);

// Better not to do 
Array.prototype.unique = function() {
    return [...new Set(this)];
}

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);



//-----------------------------------------------------------------------------------------

// Coding Challenge #1

// Your tasks:
// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
// 'speed' property. The 'speed' property is the current speed of the car in 
// km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, 
// and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
// the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
// 'brake' multiple times on each of them
// Test data:
// § Data car 1: 'BMW' going at 120 km/h
// § Data car 2: 'Mercedes' going at 95 km/h
// GOOD LUCK �

// 1)
const Car = function(make,speed) {
    this.make = make;
    this.speed = speed;
}

const bmw = new Car('BMW',120);
const mercedes = new Car('Mercedes',95);
console.log(bmw);

// 2)
Car.prototype.accelerate = function() {
    return this.speed + 10;
}
console.log(bmw.accelerate());

// 3)
Car.prototype.brake = function() {
    return this.speed -5;
}
console.log(bmw.brake());


console.log(mercedes.accelerate());
console.log(mercedes.brake());

//---------------------------------------------------------------------------

// Part 2



// Classes

// class expression
const PersonC1 = class{}

// class declaration
// Same as before with prototype example
class PersonC2 {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance methods
    // Methods will be added to .prototype property
    calAge() {
        console.log(2037 - this.birthYear);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    // Set a property that already exists
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    // Static method
    static hey() {
        console.log('Hey there');
        console.log(this);
    }
}

const jessica = new PersonC2('Jessica Davis',1996);
console.log(jessica);
jessica.calAge();

PersonC2.prototype.greet = function() {
    console.log(`Hey ${this.fullName}`);
}

jessica.greet();

// 1. Classes are not hoisted
// 2. Classs are first-class citizens
// 3. Classes are executed in strict mode

//--------------------------------------------------------------------------------------



// Setters and Getters

const account = {
    owner: 'Max',
    movements: [200,530,120,300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest);

account.latest = 50;
console.log(account.movements);
console.log(jessica.age);
const walter = new PersonC2('walter white',1955)

//--------------------------------------------------------------------------

console.log(Array.from(document.querySelectorAll('h1')));
PersonC2.hey();

//------------------------------------------------------------------------------



const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName,birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

// Set properties manually
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);// Output: true

// Set properties with a method
const sarah = Object.create(PersonProto);
sarah.init('Sarah',1979);
sarah.calcAge();

//----------------------------------------------------------------------------------

// Coding Challenge #2

// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide 
// by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but 
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km/h
// GOOD LUCK �

class carCl {
    constructor(make,speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        return this.speed + 10;
    }

    brake() {
        return this.speed -5;
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}


const ford = new carCl('Ford',120);
console.log(ford.speedUS);

ford.speedUS = 50;
ford.accelerate(ford);
console.log(ford);

//------------------------------------------------------------------------------------------------------------

// Part 3

const PersonC3 = function(fullName,birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
}

PersonC3.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}

const Student = function(fullName,birthYear,course){
    PersonC3.call(this,fullName,birthYear);
    this.course = course;
}

// Linking prototypes
Student.prototype = Object.create(PersonC3.prototype);

Student.prototype.introduce = function() {
    console.log(`My name is ${this.fullName} and i study ${this.course}`);
}

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();

mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof PersonC3);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

//---------------------------------------------------------------------------------------------------

// Coding Challenge #3

// Your tasks:
// 1. Use a constructor function to implement an Electric Car (called 'EV') as a child
// "class" of 'Car'. Besides a make and current speed, the 'EV' also has the 
// current battery charge in % ('charge' property)
// 2. Implement a 'chargeBattery' method which takes an argument 
// 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, 
// and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 
// km/h, with a charge of 22%'
// 4. Create an electric car object and experiment with calling 'accelerate', 
// 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when 
// you 'accelerate'! Hint: Review the definiton of polymorphism �
// Test data:
// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
// GOOD LUCK �

const CarN = function(make,speed) {
    this.make = make;
    this.speed = speed;
}

const EV = function(make,speed,charge) {
    CarN.call(this,make,speed)
    this.charge  = charge;
}

CarN.prototype.accelerate = function() {
    return this.speed + 10;
}

CarN.prototype.brake = function() {
    return this.speed -= 5;
}

EV.prototype = Object.create(CarN.prototype);

EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo;
    console.log(this.charge);
}

EV.prototype.accelerate = function() {
    this.speed += 20;
    this.charge --;
    console.log(`Tesla going at ${this.speed} km/h with a charge of ${this.charge}`);
}

const tesla = new EV('Tesla',120, 23);
tesla.chargeBattery(70);
console.log(tesla);

console.log(tesla.brake());
tesla.accelerate();




//----------------------------------------------------------

// Part 4

class StudentCl extends PersonC3 {
    constructor(fullName,birthYear,course) {
        // Always need to happen first!
        super(fullName,birthYear);
        this.course = course
    }
    introduce = function() {
        console.log(`My name is ${this.fullName} and i study ${this.course}`);
    }

    // Will overwrite the old method
    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old,but as a student i feel like ${2037 - this.birthYear + 10}`);
    }
}
const martha = new StudentCl('Martha Jones',2012,'Computer Science');
console.log(martha);
martha.introduce();

martha.calcAge();

//---------------------------------------------------------------------------------------------------

const PersonProto1 = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName,birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const stevenNew = Object.create(PersonProto1);

const StudentProto = Object.create(PersonProto1);

StudentProto.init = function(firstName, birthYear,course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}
StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and i study ${this.course}`);
}
const jay = Object.create(StudentProto);
jay.init('Jay',2010, 'Computer Science');
jay.introduce();
jay.calcAge();

*/

class Account {
    // 1) Public fields
    locale = navigator.language
    
    // 2) Public fields
    #movements = [];
    #pin;

    constructor(owner,currency,pin) {
        this.owner = owner;
        this.currency = currency;

        //Protected property
        this.#pin = pin;


    }

    // 3) Public methods
    getMovemements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this
    }
    withdraw(val) {
        this.deposit(-val)
        return this
    }

    
    requestLoan(val) {
        if(this.#approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }
        return this
    }
    // 4) Private methods (not work as private method but like private property)
    #approveLoan(val) {
        return true
    }
    static helper() {
        console.log('Helper');
    }
}

const acc1 = new Account('Max','EUR',1111);


acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);
acc1.requestLoan(1000);
acc1.getMovemements();
console.log(acc1);

//------------------------------------------------------------------------------------------

// Will give an error because it's a private field
// console.log(acc1.#movements);
// console.log(acc1.#pin);

//------------------------------------------------------------------------------------------------

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovemements());

//------------------------------------------------------------------------------------------------

// Coding Challenge #4

// Your tasks:
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!
// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
// GOOD LUCK �

class CarCl2 {
    constructor(make,speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this
    }

    
    get speedUS() {
        return this.speed / 1.6;
    }
    
    set speedUS(speed) {
        return speed * 1.6;
    }
    
}

class EVCl extends CarCl2 {

    #charge;

    constructor(make,speed,charge) {
        super(make,speed);
        this.#charge = charge
    }
    chargeBattery = function(chargeTo) {
        this.#charge = chargeTo;
       
        console.log(this.#charge);
        return this
    }
}

const rivian = new EVCl('Rivian',120,23)

rivian.brake().chargeBattery(90)
console.log(rivian);











