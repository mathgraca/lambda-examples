const htmlResponse = require('./html-response');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const qs = require('querystring');

exports.lambdaHandler = async (event, context) => {
	let POST = qs.parse(event.body);
	console.log('eventLog', event);
	const bucketName = process.env.UPLOAD_S3_BUCKET;

	try {
		await s3.putObject({
			Bucket: bucketName,
			Key: context.awsRequestId,
			Body: JSON.stringify(POST.acao)

		}).promise();

		const thanksHtml =`
		<html>
		<head>
			<meta charset="utf-8" />
		</head>
		<body>
			<h1>Thanls</h1>
			<p>We Received your submission for input ${POST.acao}</p>
			<p>Reference: ${context.awsRequestId}</p>
		</body>
		</html>`;

		return htmlResponse(thanksHtml);
	} catch (e) {
		console.error('Problema ao gravar no S3', e);
		const errorHtml =`
			<html>
			<head>
				<meta charset="utf-8" />
			</head>
			<body>
				<h1>Thanls</h1>
				<p>Problema ao gravar no S3</p>
				<p>Reference: ${context.awsRequestId}</p>
			</body>
			</html>`;
		return htmlResponse(errorHtml);
	}

}


