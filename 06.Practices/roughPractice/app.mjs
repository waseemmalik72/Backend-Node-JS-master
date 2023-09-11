// console.log("hello world");

// let arr = new Array()
// arr.push("name");
// arr.push("waseem")
// arr.push("nadeem")

// let obj = {
//     firstName: "waseem",
//     lastName: "malik",
//     uni: "iqra uni",
//     age: 25
// }
// let i = 0
// do {
//     console.log(arr[i])
// } while (i > arr.length);
// i++

// let checkFunc = arr.map(e => {
//     return e
// })

// console.log(eachLoop)
// let copy = arr.splice(2,2, "faheem", "salman")
// console.log(copy)
// console.log(arr)

// let obj = {
//     name: "waseem",
//     lName: "Malik",
//     age: 27,
// }

// let myFunc = ({name, age, lName})=> {
//     console.log(name, age, lName + " hello world")
// }

// myFunc(obj)


// let arr = ["name", "waseem", "malik"];

// let [name, waseem, malik] = [...arr];

// console.log(name, waseem, malik);

// let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,]

// let find = 100;

// for (let i = 0; i < arr.length; i++) {
//     console.log(i);
//     let change = i + 50;
//     if (find === change) {
//         console.log("match is good")
//         break;
//     }
// }


// import { addFunc } from './check.mjs'


// addFunc()

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

for (let i = 0; i < 7; i++) {
    const date = new Date();
    // console.log(date.getDate())
    date.setDate(date.getDate() + i);
    console.log(date)
    date.setDate(date.getDate() + i); // Current date + i days

    const dayIndex = date.getDay(); // Get the day index (0 for Sunday, 1 for Monday, etc.)
    const dayName = daysOfWeek[dayIndex]; // Get the day name from the array

    console.log(`Day ${i + 1}: ${dayName}`);
}
