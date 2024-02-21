const data1 = "1.5,Aldaco\n\
2.5,Aldaco\n\
5.8,Mitra\n\
5.7,Mitra\n\
5.9,Mitra\n\
3.1,Sukul\n\
3.2,Sukul\n\
3.3,Sukul";

let arr = data1.split('\n');
console.log(arr);

let matrix = [];
for (let element of arr){
    let arr2 = element.split(',');
    matrix.push(arr2);
}
console.log(matrix);

let profe = matrix[0][1];
console.log("first",profe);
let sumpoints = 0;
let countpoints = 0;
for (let element of matrix ) {
    if (element[1] == profe){
        countpoints += 1;
        sumpoints += Number(element[0]);
    } else {
        console.log(profe,countpoints,sumpoints/countpoints);
        countpoints = 1;
        sumpoints = Number(element[0]);
        profe = element[1];
    }
}
console.log(profe,countpoints,sumpoints/countpoints);