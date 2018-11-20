const fs = require('fs');
const uuidv4 = require('uuid/v4');
const csv = require("fast-csv");
var txtService = require('../file.services/txt.service');

const getData = (filePath) => {
    return new Promise((resolve, reject) => {      
        var stream = fs.createReadStream(filePath);
        let buffers = [];
        var csvStream = csv()
        .on("data", (data) => {
            buffers.push(data);
        })
        .on("end",() => {
            try{
                const data = buffers.filter(x => x !== buffers[0]);
                const types = txtService.getTypes(data);
                const titles = buffers[0].map((header, i) => ({
                                title: header,
                                 type: types[i],
                                id: uuidv4()
                             }));
                resolve(
                    {
                    columns: titles,
                    data: data
                });
            }
            catch(err){
                console.log(err);
            }
        });

        stream.pipe(csvStream);
    });
}

const parseFile = filePath => {
    return getData(filePath);
}

module.exports = parseFile;