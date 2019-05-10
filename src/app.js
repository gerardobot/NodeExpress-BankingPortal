const fs = require('fs');
const path = require('path');
const express = require('express');
const { users, accounts, writeJSON } = require('./data');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/savings', (request, response) => {
	response.render('account', { account: accounts.savings });
});

app.get('/checking', (request, response) => {
	response.render('account', { account: accounts.checking });
});

app.get('/credit', (request, response) => {
	response.render('account', { account: accounts.credit });
});

app.get('/profile', (request, response) => {
	response.render('profile', { user: users[0] });
});

app.get('/payment', (request, response) => {
	response.render('payment', { account: accounts.credit });
});

app.post('/payment', (request, response) => {
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

app.get('/transfer', (request, response) => {
	response.render('transfer');
});

app.post('/transfer', (request, response) => {
	accounts[request.body.from].balance -= request.body.amount;
	accounts[request.body.to].balance =
		parseInt(accounts[request.body.to].balance) + parseInt(request.body.amount);
	writeJSON();
	response.render('transfer', { message: 'Transfer Completed' });
});

app.listen(3000, () => console.log('PS Project Running on port 3000!'));
