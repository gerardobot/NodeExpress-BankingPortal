const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/payment', (request, response) => {
	response.render('payment', { account: accounts.credit });
});

router.post('/payment', (request, response) => {
	accounts.credit.balance -= request.body.amount;
	accounts.credit.available =
		parseInt(accounts.credit.available) + parseInt(request.body.amount);
	response.render('payment', { account: accounts.credit });
	writeJSON();
	response.render('payment', {
		message: 'Payment Successful',
		account: accounts.credit
	});
});

router.get('/transfer', (request, response) => {
	response.render('transfer');
});

router.post('/transfer', (request, response) => {
	accounts[request.body.from].balance -= request.body.amount;
	accounts[request.body.to].balance =
		parseInt(accounts[request.body.to].balance) + parseInt(request.body.amount);
	writeJSON();
	response.render('transfer', { message: 'Transfer Completed' });
});

module.exports = router;
