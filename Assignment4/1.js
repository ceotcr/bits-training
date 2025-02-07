function fetchData(callback) {
    const data = ["chetan", "tcr", "chetansapkal", "ch3t4n"];
    setTimeout(() => {
        const error = Math.random() > 0.5;
        if (!error) {
            callback(data, null);
        } else {
            callback(null, "Error occurred");
        }
    }, 2000);
}

const processData = (data, error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(data.map((name) => name.toUpperCase()));
    }
}

fetchData(processData);


/* 

Output: 

> node 1.js
[ 'CHETAN', 'TCR', 'CHETANSAPKAL', 'CH3T4N' ]

> node 1.js
Error occurred

*/