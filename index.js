const express = require('express')
const app = express()


// const 

const port = [...process.argv][2];
app.use((req, res, next) => {
	console.log(req.port);
	if (req.query.r === '' && port === '8080') {
		console.log('redirect header!');
		res.setHeader('Location', `http://localhost:8181${req.url}`);
		res.sendStatus(301);
	} else {
		if (req.query.h === '') {
			console.log('content disposition header!');
			res.setHeader('Content-Disposition', 'attachment');
		}
		next();
	}
	
});

app.use('/files', express.static('files'));

const block = ({download, cdHeader, redirect, otherOrigin}) => {

	const port = otherOrigin ? 8181 : 8080;
	const attributes = download ? 'download' : '';
	const queryParts = [];
	if (cdHeader) queryParts.push('h');
	if (redirect) queryParts.push('r');

	const query = queryParts.length ? `?${queryParts.join('&')}` : '';

	return ['img.png', 'img.zip', 'file1.txt', 'bob.log'].map((name) => {
		return `<a href="http://localhost:${port}/files/${name}${query}" ${attributes} target="_blank">${name.split('.')[1]}</a>`;
	});
}

app.get('*', (req, res) => {
	res.write(`
		<style> div > div { flex: 1; padding: 0 20px;} </style>
		<h1 style="text-align: center">Browser File Download Tester</h1>

		
		<div style="display: flex;">
			<div>
				<h2>Same origin</h2> 
				<h3>No download attribute</h3>
				${block({download: false, cdHeader: false, redirect: false, otherOrigin: false})}

				<h3>download attribute</h3>
				${block({download: true, cdHeader: false, redirect: false, otherOrigin: false})}

				<h3>No download attribute, Content-Disposition: attachment</h3>
				${block({download: false, cdHeader: true, redirect: false, otherOrigin: false})}
			</div>

			<div>
				<h2>Other origin</h2> 
				<h3>No download attribute</h3>
				${block({download: false, cdHeader: false, redirect: false, otherOrigin: true})}

				<h3>download attribute</h3>
				${block({download: true, cdHeader: false, redirect: false, otherOrigin: true})}

				<h3>No download attribute, Content-Disposition: attachment</h3>
				${block({download: false, cdHeader: true, redirect: false, otherOrigin: true})}

			</div>

			<div>
				<h2>Redirect to a different origin</h2> 
				<h3>No download attribute</h3>
				${block({download: false, cdHeader: true, redirect: true, otherOrigin: false})}

				<h3>download attribute</h3>
				${block({download: true, cdHeader: false, redirect: true, otherOrigin: false})}

				<h3>No download attribute, Content-Disposition: attachment</h3>
				${block({download: false, cdHeader: true, redirect: true, otherOrigin: false})}
			</div>
		</div>
	
	
	`);
    res.end()
})


console.log(`running in ${port}`);
app.listen(port);
