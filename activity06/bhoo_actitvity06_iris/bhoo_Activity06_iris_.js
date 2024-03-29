// Name : Bo Oo
// email: bhoo@iastate.edu
// Date: 2/11/2024


// Activity 06 Javacript using Iris dataset

// data set is ordered by Class
const iris = "Sepal.Length,Sepal.Width,Petal.Length,Petal.Width,Class\n\
5.1,3.5,1.4,0.2,Iris-setosa\n\
4.9,3.0,1.4,0.2,Iris-setosa\n\
4.7,3.2,1.3,0.2,Iris-setosa\n\
4.6,3.1,1.5,0.2,Iris-setosa\n\
5.0,3.6,1.4,0.2,Iris-setosa\n\
5.4,3.9,1.7,0.4,Iris-setosa\n\
4.6,3.4,1.4,0.3,Iris-setosa\n\
5.0,3.4,1.5,0.2,Iris-setosa\n\
4.4,2.9,1.4,0.2,Iris-setosa\n\
4.9,3.1,1.5,0.1,Iris-setosa\n\
5.4,3.7,1.5,0.2,Iris-setosa\n\
4.8,3.4,1.6,0.2,Iris-setosa\n\
4.8,3.0,1.4,0.1,Iris-setosa\n\
4.3,3.0,1.1,0.1,Iris-setosa\n\
5.8,4.0,1.2,0.2,Iris-setosa\n\
5.7,4.4,1.5,0.4,Iris-setosa\n\
5.4,3.9,1.3,0.4,Iris-setosa\n\
5.1,3.5,1.4,0.3,Iris-setosa\n\
5.7,3.8,1.7,0.3,Iris-setosa\n\
5.1,3.8,1.5,0.3,Iris-setosa\n\
5.4,3.4,1.7,0.2,Iris-setosa\n\
5.1,3.7,1.5,0.4,Iris-setosa\n\
4.6,3.6,1.0,0.2,Iris-setosa\n\
5.1,3.3,1.7,0.5,Iris-setosa\n\
4.8,3.4,1.9,0.2,Iris-setosa\n\
5.0,3.0,1.6,0.2,Iris-setosa\n\
5.0,3.4,1.6,0.4,Iris-setosa\n\
5.2,3.5,1.5,0.2,Iris-setosa\n\
5.2,3.4,1.4,0.2,Iris-setosa\n\
4.7,3.2,1.6,0.2,Iris-setosa\n\
4.8,3.1,1.6,0.2,Iris-setosa\n\
5.4,3.4,1.5,0.4,Iris-setosa\n\
5.2,4.1,1.5,0.1,Iris-setosa\n\
5.5,4.2,1.4,0.2,Iris-setosa\n\
4.9,3.1,1.5,0.1,Iris-setosa\n\
5.0,3.2,1.2,0.2,Iris-setosa\n\
5.5,3.5,1.3,0.2,Iris-setosa\n\
4.9,3.1,1.5,0.1,Iris-setosa\n\
4.4,3.0,1.3,0.2,Iris-setosa\n\
5.1,3.4,1.5,0.2,Iris-setosa\n\
5.0,3.5,1.3,0.3,Iris-setosa\n\
4.5,2.3,1.3,0.3,Iris-setosa\n\
4.4,3.2,1.3,0.2,Iris-setosa\n\
5.0,3.5,1.6,0.6,Iris-setosa\n\
5.1,3.8,1.9,0.4,Iris-setosa\n\
4.8,3.0,1.4,0.3,Iris-setosa\n\
5.1,3.8,1.6,0.2,Iris-setosa\n\
4.6,3.2,1.4,0.2,Iris-setosa\n\
5.3,3.7,1.5,0.2,Iris-setosa\n\
5.0,3.3,1.4,0.2,Iris-setosa\n\
7.0,3.2,4.7,1.4,Iris-versicolor\n\
6.4,3.2,4.5,1.5,Iris-versicolor\n\
6.9,3.1,4.9,1.5,Iris-versicolor\n\
5.5,2.3,4.0,1.3,Iris-versicolor\n\
6.5,2.8,4.6,1.5,Iris-versicolor\n\
5.7,2.8,4.5,1.3,Iris-versicolor\n\
6.3,3.3,4.7,1.6,Iris-versicolor\n\
4.9,2.4,3.3,1.0,Iris-versicolor\n\
6.6,2.9,4.6,1.3,Iris-versicolor\n\
5.2,2.7,3.9,1.4,Iris-versicolor\n\
5.0,2.0,3.5,1.0,Iris-versicolor\n\
5.9,3.0,4.2,1.5,Iris-versicolor\n\
6.0,2.2,4.0,1.0,Iris-versicolor\n\
6.1,2.9,4.7,1.4,Iris-versicolor\n\
5.6,2.9,3.6,1.3,Iris-versicolor\n\
6.7,3.1,4.4,1.4,Iris-versicolor\n\
5.6,3.0,4.5,1.5,Iris-versicolor\n\
5.8,2.7,4.1,1.0,Iris-versicolor\n\
6.2,2.2,4.5,1.5,Iris-versicolor\n\
5.6,2.5,3.9,1.1,Iris-versicolor\n\
5.9,3.2,4.8,1.8,Iris-versicolor\n\
6.1,2.8,4.0,1.3,Iris-versicolor\n\
6.3,2.5,4.9,1.5,Iris-versicolor\n\
6.1,2.8,4.7,1.2,Iris-versicolor\n\
6.4,2.9,4.3,1.3,Iris-versicolor\n\
6.6,3.0,4.4,1.4,Iris-versicolor\n\
6.8,2.8,4.8,1.4,Iris-versicolor\n\
6.7,3.0,5.0,1.7,Iris-versicolor\n\
6.0,2.9,4.5,1.5,Iris-versicolor\n\
5.7,2.6,3.5,1.0,Iris-versicolor\n\
5.5,2.4,3.8,1.1,Iris-versicolor\n\
5.5,2.4,3.7,1.0,Iris-versicolor\n\
5.8,2.7,3.9,1.2,Iris-versicolor\n\
6.0,2.7,5.1,1.6,Iris-versicolor\n\
5.4,3.0,4.5,1.5,Iris-versicolor\n\
6.0,3.4,4.5,1.6,Iris-versicolor\n\
6.7,3.1,4.7,1.5,Iris-versicolor\n\
6.3,2.3,4.4,1.3,Iris-versicolor\n\
5.6,3.0,4.1,1.3,Iris-versicolor\n\
5.5,2.5,4.0,1.3,Iris-versicolor\n\
5.5,2.6,4.4,1.2,Iris-versicolor\n\
6.1,3.0,4.6,1.4,Iris-versicolor\n\
5.8,2.6,4.0,1.2,Iris-versicolor\n\
5.0,2.3,3.3,1.0,Iris-versicolor\n\
5.6,2.7,4.2,1.3,Iris-versicolor\n\
5.7,3.0,4.2,1.2,Iris-versicolor\n\
5.7,2.9,4.2,1.3,Iris-versicolor\n\
6.2,2.9,4.3,1.3,Iris-versicolor\n\
5.1,2.5,3.0,1.1,Iris-versicolor\n\
5.7,2.8,4.1,1.3,Iris-versicolor\n\
6.3,3.3,6.0,2.5,Iris-virginica\n\
5.8,2.7,5.1,1.9,Iris-virginica\n\
7.1,3.0,5.9,2.1,Iris-virginica\n\
6.3,2.9,5.6,1.8,Iris-virginica\n\
6.5,3.0,5.8,2.2,Iris-virginica\n\
7.6,3.0,6.6,2.1,Iris-virginica\n\
4.9,2.5,4.5,1.7,Iris-virginica\n\
7.3,2.9,6.3,1.8,Iris-virginica\n\
6.7,2.5,5.8,1.8,Iris-virginica\n\
7.2,3.6,6.1,2.5,Iris-virginica\n\
6.5,3.2,5.1,2.0,Iris-virginica\n\
6.4,2.7,5.3,1.9,Iris-virginica\n\
6.8,3.0,5.5,2.1,Iris-virginica\n\
5.7,2.5,5.0,2.0,Iris-virginica\n\
5.8,2.8,5.1,2.4,Iris-virginica\n\
6.4,3.2,5.3,2.3,Iris-virginica\n\
6.5,3.0,5.5,1.8,Iris-virginica\n\
7.7,3.8,6.7,2.2,Iris-virginica\n\
7.7,2.6,6.9,2.3,Iris-virginica\n\
6.0,2.2,5.0,1.5,Iris-virginica\n\
6.9,3.2,5.7,2.3,Iris-virginica\n\
5.6,2.8,4.9,2.0,Iris-virginica\n\
7.7,2.8,6.7,2.0,Iris-virginica\n\
6.3,2.7,4.9,1.8,Iris-virginica\n\
6.7,3.3,5.7,2.1,Iris-virginica\n\
7.2,3.2,6.0,1.8,Iris-virginica\n\
6.2,2.8,4.8,1.8,Iris-virginica\n\
6.1,3.0,4.9,1.8,Iris-virginica\n\
6.4,2.8,5.6,2.1,Iris-virginica\n\
7.2,3.0,5.8,1.6,Iris-virginica\n\
7.4,2.8,6.1,1.9,Iris-virginica\n\
7.9,3.8,6.4,2.0,Iris-virginica\n\
6.4,2.8,5.6,2.2,Iris-virginica\n\
6.3,2.8,5.1,1.5,Iris-virginica\n\
6.1,2.6,5.6,1.4,Iris-virginica\n\
7.7,3.0,6.1,2.3,Iris-virginica\n\
6.3,3.4,5.6,2.4,Iris-virginica\n\
6.4,3.1,5.5,1.8,Iris-virginica\n\
6.0,3.0,4.8,1.8,Iris-virginica\n\
6.9,3.1,5.4,2.1,Iris-virginica\n\
6.7,3.1,5.6,2.4,Iris-virginica\n\
6.9,3.1,5.1,2.3,Iris-virginica\n\
5.8,2.7,5.1,1.9,Iris-virginica\n\
6.8,3.2,5.9,2.3,Iris-virginica\n\
6.7,3.3,5.7,2.5,Iris-virginica\n\
6.7,3.0,5.2,2.3,Iris-virginica\n\
6.3,2.5,5.0,1.9,Iris-virginica\n\
6.5,3.0,5.2,2.0,Iris-virginica\n\
6.2,3.4,5.4,2.3,Iris-virginica\n\
5.9,3.0,5.1,1.8,Iris-virginica";

// read the data set and convert it to a matrix
function split_and_matrix(matrix){
    let arr = iris.split('\n');
    let irisArray = arr.map(row => row.split(','));
    return irisArray.slice(1);
}



// read matrix
function read_matrix(matrix) {
    
    let setosa_count = 0, versicolor_count = 0, virginica_count = 0;
    let setosa_sepal_Length = 0, setosa_sepal_Width = 0, setosa_petal_Length = 0, setosa_petal_Width = 0;
    let versicolor_sepal_Length = 0, versicolor_sepal_Width = 0, versicolor_petal_Length = 0, versicolor_petal_Width = 0;
    let virginica_sepal_Length = 0, virginica_sepal_Width = 0, virginica_petal_Length = 0, virginica_petal_Width = 0;

    

    for (let row of matrix) {
        switch (row[4]) {
            case 'Iris-setosa':
                setosa_count++;
                setosa_sepal_Length += Number(row[0]);
                setosa_sepal_Width += Number(row[1]);
                setosa_petal_Length += Number(row[2]);
                setosa_petal_Width += Number(row[3]);
                break;
            case 'Iris-versicolor':
                versicolor_count++;
                versicolor_sepal_Length += Number(row[0]);
                versicolor_sepal_Width += Number(row[1]);
                versicolor_petal_Length += Number(row[2]);
                versicolor_petal_Width += Number(row[3]);
                break;
            case 'Iris-virginica':
                virginica_count++;
                virginica_sepal_Length += Number(row[0]);
                virginica_sepal_Width += Number(row[1]);
                virginica_petal_Length += Number(row[2]);
                virginica_petal_Width += Number(row[3]);
                break;
        }
    }

    // Return the results
    return {
        setosa: { count: setosa_count, sepal_Length: setosa_sepal_Length, sepal_Width: setosa_sepal_Width, petal_Length: setosa_petal_Length, petal_Width: setosa_petal_Width },
        versicolor: { count: versicolor_count, sepal_Length: versicolor_sepal_Length, sepal_Width: versicolor_sepal_Width, petal_Length: versicolor_petal_Length, petal_Width: versicolor_petal_Width },
        virginica: { count: virginica_count, sepal_Length: virginica_sepal_Length, sepal_Width: virginica_sepal_Width, petal_Length: virginica_petal_Length, petal_Width: virginica_petal_Width }
    };
}

// compute the average of ever numeric column per Class type
function compute_averages(data) {
    let setosa = data.setosa;
    let versicolor = data.versicolor;
    let virginica = data.virginica;

    // Compute averages for Iris-setosa
    setosa.sepal_Length = (setosa.sepal_Length / setosa.count).toFixed(2);
    setosa.sepal_Width = (setosa.sepal_Width / setosa.count).toFixed(2);
    setosa.petal_Length = (setosa.petal_Length / setosa.count).toFixed(2);
    setosa.petal_Width = (setosa.petal_Width / setosa.count).toFixed(2);

    // Compute averages for Iris-versicolor
    versicolor.sepal_Length = (versicolor.sepal_Length / versicolor.count).toFixed(2);
    versicolor.sepal_Width = (versicolor.sepal_Width / versicolor.count).toFixed(2);
    versicolor.petal_Length = (versicolor.petal_Length / versicolor.count).toFixed(2);
    versicolor.petal_Width = (versicolor.petal_Width / versicolor.count).toFixed(2);

    // Compute averages for Iris-virginica
    virginica.sepal_Length = (virginica.sepal_Length / virginica.count).toFixed(2);
    virginica.sepal_Width = (virginica.sepal_Width / virginica.count).toFixed(2);
    virginica.petal_Length = (virginica.petal_Length / virginica.count).toFixed(2);
    virginica.petal_Width = (virginica.petal_Width / virginica.count).toFixed(2);

    return data;
}



//  ----  INIT -----
// setosa
let setosa_sepal_Length = 0;
let setosa_sepal_Width = 0;    
let setosa_petal_Length = 0;   
let setosa_petal_Width = 0;
let setosa_count = 0;
// versicolor
let versicolor_sepal_Length = 0;
let versicolor_sepal_Width = 0;    
let versicolor_petal_Length = 0;   
let versicolor_petal_Width = 0;
let versicolor_count = 0;
// virginica
let virginica_sepal_Length = 0;
let virginica_sepal_Width = 0;    
let virginica_petal_Length = 0;   
let virginica_petal_Width = 0;
let virginica_count = 0;

// Execute functions in sequence
let matrix = split_and_matrix(iris);
let aggregatedData = read_matrix(matrix);
let averages = compute_averages(aggregatedData);

// create a table
console.log("IRIS STATISTICS :");
console.table(averages);

