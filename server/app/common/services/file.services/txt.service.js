const fs = require('fs');
const uuidv4 = require('uuid/v4');

const UNKNOWN_SYMBOL = 'Unknown';

const getData = (filePath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createReadStream(filePath);
        let buffers = [];
        file.on('data', data => {
            buffers = buffers.concat(data);
        });
        file.on('end', () => {
            try{
                const buffer = Buffer.concat(buffers);
                const rows = getRows(buffer);
                const rowsTokens = removeExtraSymbols(rows);
    
                const longestRowLength = getLongestRowLength(rowsTokens);
                console.log(longestRowLength);
                const completeRows = extendArrays(rowsTokens, longestRowLength);
                const [headers, ...body] = completeRows;
                const types = getTypes(body);
    
                const titles = headers.map((header, i) => ({
                    title: header,
                    type: types[i],
                    id: uuidv4()
                }));
        
                
                resolve({
                    columns: titles,
                    data: body
                });
            } catch(err) {
                console.log(err);
            }
           
        });
    });
}

const getRows = buffer => [...((buffer.toString()).split('\r\n'))];

const removeExtraSymbols = arr => arr.map(item => item.split(/\s|\t/));

const getLongestRowLength = arr => Math.max(...arr.map(tokens => tokens.length));

const extendArrays = (matrix, size) => matrix.map(array => 
    array.length < size ? array.concat(fillArray(size - array.length, UNKNOWN_SYMBOL)) : array);

const fillArray = (size, symbol) => Array(size).fill(symbol);

const transposeMatrix = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));

const getTypes = array => transposeMatrix(array).map(column => column.reduce((c, n) => c !== 'string' && Number(n) ? 'number' : 'string', 'number'));


const def = x => typeof x !== 'undefined';

const processTypesAllData = ([el, ...arr], types) => def(el) ? processTypesElement(processTypesAllData(arr, types), el) : types;

const processTypesElement = (types, [el, ...arr], i = 0) => def(el) ? changeType(processTypesElement(types, arr, i + 1), i, el) : types;

const changeType = (types, index, el) => {
    types[index] = Number(el) && types[index] !== 'string' ? 'number' : 'string';
    return types;
}

const parseFile = filePath => {
    console.log('worker');
    return getData(filePath);
}

module.exports = parseFile;