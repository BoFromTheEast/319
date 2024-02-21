/* 
Name : Bo Oo
Feb 11, 2024
Activity06 - Variables
*/


console.log("---- I am in V A R I A B L E S ----");

// Q1 : Is it permited the next ? Yes it is permitted as it is declared with var.
console.log("Q1 ---------------")
var var1 = "Iowa";
console.log(var1);
var var1 = 124;
console.log(var1);
// Is it permited ?
console.log("Yes or Not ? Yes");


// Q2 : Is it valid ? No it is not valid as the same variable cannot be declared twice with let.
console.log("Q2 ----------------");
let var2 = "Ames";
console.log(var2);
// let var2 = 124;
// Is it valid ? Uncaught SyntaxError: Identifier 'var2' has already been declared
console.log("Yes or Not ? No");


// Q3 : Is it valid ? Yes it is valid as it is declared only once.
console.log("Q3 ----------------");
let var3 = "ISU";
console.log(var3);
var3 = 2023;
console.log(var3);
console.log("Valid ? Yes")

// Q4 : Explain the Error. The error
console.log("Q4 ----------------");
let var4;
// const var5;
console.log("What's the error : Uncaught SyntaxError: Missing initializer in const declaration")

// Q5 : Explain the Error.
console.log("Q5 ----------------");
const var6 = 3.1415;
// var6 = 2.8;
console.log("What's the error : Uncaught TypeError: Assignment to constant variable.")
//The value of the const variable cannot be changed.

// Q6 : Explain the Error.
// let first name = "Abraham";
console.log(" ...Uncaught SyntaxError: Unexpected identifier 'name'.... ");
// let 2numbers = [1,2];
console.log(" ...Uncaught SyntaxError: Invalid or unexpected token.... ");
// let city-state = "Ames Iowa";
console.log(" ...Uncaught SyntaxError: Unexpected token '-'.... ");


// Q7 : What !! ??
let mainCity = "DesMoines";
// console.log("This is the Capital :", MainCity)
console.log(" ....What's going on ? ....Uncaught ReferenceError: MainCity is not defined" )

// Q8 : "let" and "const" scope vs "var" scope
if (5 === 5) {
    var var7 = 100;
    }
    console.log(var7);
    if (5 === 5) {
    let var8 = 100;
    }
    // console.log(var8);
    console.log("... Uncaught ReferenceError: var8 is not defined ...")

    
