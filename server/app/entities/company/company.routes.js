const company = require('express').Router();
const CompanyService = require('../../entities/company/company.service');
const tokenInfoMiddleware = require('../../common/middleware/token-info.middleware');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

company.use(tokenInfoMiddleware);

company.post('/', (req, res, next) => {
	CompanyService.saveFullCompany(req.body, res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = company;
