const potrace = require('potrace');
const PngService = require('../export.services/png.service');

function serveSvg(id) {
	return new Promise(async resolve => {
		const buffer = await PngService.createPng(id);
		const trace = new potrace.Potrace();
		trace.loadImage(buffer, err => {
			if (err) throw err;
			resolve(trace.getSVG());
		});
	});
}
exports.createSvg = id => {
	const value = serveSvg(id).then(svg => svg);
	return value;
};
