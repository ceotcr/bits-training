const processData = (array, callBack) => {
    return callBack(array);
}

const filterOdd = (array) => {
    return array.filter((num) => num % 2 !== 0);
}

const doubleNumbers = (array) => {
    return array.map((num) => num * 2);
}

const calculateSum = (array) => {
    return array.reduce((acc, num) => acc + num, 0);
}

const maxNumber = (array) => {
    return array.reduce((acc, num) => Math.max(acc, num), 0);
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log("Array: |" + arr.join("|") + "|")
console.log("Odd Numbers: |" + processData(arr, filterOdd).join("|") + "|")
console.log("Double Numbers: |" + processData(arr, doubleNumbers).join("|") + "|")
console.log("Sum: ", processData(arr, calculateSum))


/*

Output:

> node 5.js

Array: |1|2|3|4|5|6|7|8|9|10|
Odd Numbers: |1|3|5|7|9|
Double Numbers: |2|4|6|8|10|12|14|16|18|20|
Sum:  55

*/