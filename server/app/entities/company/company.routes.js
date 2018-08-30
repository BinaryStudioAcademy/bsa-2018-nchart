const company = require('express').Router();
const CompanyService = require('../../entities/company/company.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');
const tokenInfoMiddleware = require('../../common/middleware/token-info.middleware');

company.use(tokenInfoMiddleware);

company.get('/', (req, res, next) => {
	CompanyService.findAllUserCompanies(res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = company;
