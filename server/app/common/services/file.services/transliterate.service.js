function transliterate(content) {
    const patt = /\n/;
    const index = content.search(patt);
    const header = content.slice(0, index);
    const body = content.slice(index);
    let answer = '';
    const a = {};
    a['Ё'] = 'YO'; a['Й'] = 'I'; a['Ц'] = 'TS'; a['У'] = 'U'; a['К'] = 'K'; a['Е'] = 'E'; a['Н'] = 'N';
    a['Г'] = 'G'; a['Ш'] = 'SH'; a['Щ'] = 'SCH'; a['З'] = 'Z'; a['Х'] = 'H'; a['Ъ'] = "'"; a['ё'] = 'yo';
    a['й'] = 'i'; a['ц'] = 'ts'; a['у'] = 'u'; a['к'] = 'k'; a['е'] = 'e'; a['н'] = 'n'; a['г'] = 'g';
    a['ш'] = 'sh'; a['щ'] = 'sch'; a['з'] = 'z'; a['х'] = 'h'; a['ъ'] = "'"; a['Ф'] = 'F'; a['Ы'] = 'I';
    a['В'] = 'V'; a['А'] = 'a'; a['П'] = 'P'; a['Р'] = 'R'; a['О'] = 'O'; a['Л'] = 'L'; a['Д'] = 'D';
    a['Ж'] = 'ZH'; a['Э'] = 'E'; a['ф'] = 'f'; a['ы'] = 'i'; a['в'] = 'v'; a['а'] = 'a'; a['п'] = 'p';
    a['р'] = 'r'; a['о'] = 'o'; a['л'] = 'l'; a['д'] = 'd'; a['ж'] = 'zh'; a['э'] = 'e'; a['Я'] = 'Ya';
    a['Ч'] = 'CH'; a['С'] = 'S'; a['М'] = 'M'; a['И'] = 'I'; a['Т'] = 'T'; a['Ь'] = "'"; a['Б'] = 'B';
    a['Ю'] = 'YU'; a['я'] = 'ya'; a['ч'] = 'ch'; a['с'] = 's'; a['м'] = 'm'; a['и'] = 'i'; a['т'] = 't';
    a['ь'] = "'"; a['б'] = 'b'; a['ю'] = 'yu';
    Object.keys(header).forEach((i) => {
        if (Object.prototype.hasOwnProperty.call(header, i)) {
            if (a[header[i]] === undefined) {
                answer += header[i];
            } else {
                answer += a[header[i]];
            }
        }
    });
    return answer + body;
}
module.exports = transliterate;