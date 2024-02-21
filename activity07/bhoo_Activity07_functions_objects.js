/*
Name: Bo Oo
netid: bhoo
Date: 10/14/2015
*/

let n1 = 11;
let n2 = 10;

function maxOfTwo(first, last){
    return (first > last) ? first : last;
}

console.log(`The max  between ${n1} and ${n2} is :`, maxOfTwo(n1, n2)); //

let array = [10,11,1024,125,9,201];

function maxOfArray(array){
    let max = array[0];
    for(let i in array){
        if(array[i] > max){
            max = array[i];
        }
    }
    return max;
}
console.log(maxOfArray(array));



const movie = {
    title: 'Some Movie',
    releaseYear: 2018,
    rating: 4.5,
    director: 'Steven Spielberg',
};

// This function is named 'showProperties'
function showProperties(tiny){
    // It uses a for-in loop to iterate over all properties (keys) of the 'tiny' object
    console.log("List of Keys :")
    for (let key in tiny){
        console.log(key);
    }
    console.log ("List of Values :")
    for (let key in tiny){
        console.log(tiny[key]);
    }
}
console.log("\nThis is an object with for-in loop to iterate over all properties (keys) of the 'tiny' object");
showProperties(movie);


const circle ={
    radius: 1,
    value: 2,
    area: function(){
        return Math.PI * this.radius * this.radius;
    }
};
console.log("\nThis is an object");
console.log(circle.area());


const circle2 = {
    radius: 1,
    value: 2,
    get radiusValue(){
        return this.radius;
    },
    set radiusValue(value){
        this.radius = value;
    },
    area: function(){
        return Math.PI * this.radius * this.radius;
    }

};

console.log("\nThis is function with get and set method");
console.log(`Area with ${circle2.radiusValue} :`, circle2.area());
circle2.radiusValue = 3;
console.log(`Area with ${circle2.radiusValue} :`, circle2.area());

const circle3 = {
    radius: 1,
    value: 2,
    getRadiusValue: function(){
        return this.radius;
    },
    setRadiusValue: function(value){
        this.radius = value;
    },
    area: function(){
        return Math.PI * this.radius * this.radius;
    }
};

console.log("\nThis is function with get and set method");
console.log(`Area with ${circle3.getRadiusValue()} :`, circle3.area());
circle3.setRadiusValue(3);
console.log(`Area with ${circle3.getRadiusValue()} :`, circle3.area());

const grades = {
    math: 85,
    science: 90,
    history: 75,
    literature: 88
};

function calculateAverageGrades(grades){
    let total = 0;
    let count = 0;

    for (let subject in grades){
        total += grades[subject];
        count++;
    }
    
    return total / count;
}

console.log(`\nThe average grade is ${calculateAverageGrades(grades)}`);