// const fs = require('fs');
// const csv = require('fast-csv');
// const Papa = require('papaparse');
//
// class CSV {
//     read(){
//         let arr = [];
//         const stream = fs.createReadStream('./app/common/services/sample.csv');
//         const streamCsv = csv().on('data', data=> console.log(data));
//         stream.pipe(streamCsv);
//         console.log(arr);
//     }
//
//     readFromPost(file){
//         const stream = fs.createReadStream(file);
//         const streamCsv = csv().on('data', data=> console.log(data));
//         stream.pipe(streamCsv);
//     }
//
//     readPapa(file){
//         Papa.parse(file, {
//             complete: function(results) {
//                 console.log(results);
//             }
//         });
//     }
// }
//
// module.exports = new CSV();
