/*eslint-disable */
const emailPattern = /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
/* eslint-enable */
const namePattern = /^[a-zа-яэіїє]{1,100}$/;
const passwordPattern = /^(?=.*[a-zа-яэіїє])(?=.*[A-ZА-ЯЭІЇЄ])(?=.*\d).{5,}$/;

const userSchema = {
	type: 'object',
	additionalProperties: true,
	required: ['name', 'email', 'password'],
	properties: {
		name: {
			type: 'string',
			maxLength: 100,
			regex: { pattern: namePattern.source, flags: 'i' }
		},
		email: {
			type: 'string',
			regex: { pattern: emailPattern.source, flags: 'i' }
		},
		password: {
			type: 'string',
			minLength: 5,
			pattern: passwordPattern.source
		}
	}
};

const loginSchema = {
	type: 'object',
	additionalProperties: true,
	required: ['email', 'password'],
	properties: {
		email: {
			type: 'string',
			regex: { pattern: emailPattern.source, flags: 'i' }
		},
		password: {
			type: 'string',
			minLength: 5,
			pattern: passwordPattern.source
		}
	}
};

module.exports = { userSchema, loginSchema };
