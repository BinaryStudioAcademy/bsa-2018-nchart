// const file = require('express').Router();
// const fileUpload = require('express-fileupload');
// const CsvService = require('../common/services/csv.service');
// const fs = require('fs');
// const multer = require('multer');
// const Papa = require('papaparse');
//
// file.use(fileUpload());
//
// file.get('/', (req, res, next) => {
//     res.json('file get');
// });
//
// file.get('/:id', (req, res, next) => {
//
// });
//
// file.post('/upload', (req, res, next) => {
//     if (!req.files) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     // fs.readFile(req.files.fileKey.data, "7bit", function(err, data) {
//     //     if(err){
//     //         console.log(err);
//     //         // res.json(err);
//     //     }
//     //     console.log(data);
//     //     res.json(data);
//     // });
//     let sampleFile = req.files;
//     // console.log(sampleFile.fileKey);
//     // CsvService.read(sampleFile.fileKey);
//     Papa.parse(sampleFile, {
//         complete: function (results) {
//             console.log(results);
//         }
//     });
//
//     // console.log(sampleFile.sampleFile)
//     res.json('upload');
// });
//
// file.put('/:id', (req, res, next) => {
//
// });
//
// file.delete('/:id', (req, res, next) => {
//
// });
//
// module.exports = file;
