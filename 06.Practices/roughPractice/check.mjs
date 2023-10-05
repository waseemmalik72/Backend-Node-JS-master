// let num = 10;

// let addFunc = () => {
//     console.log(num + 10)
// }

// export { addFunc }

let check = setInterval(() => {
  console.log("hello world");
}, 1000);

let newCheck = setTimeout(() => {
  clearInterval(check);
}, 5000);

// clearTimeout(newCheck);
