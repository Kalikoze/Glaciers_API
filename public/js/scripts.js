const postInfo = () => {
	const appName = $('#POST-appname').val();
	const email = $('#POST-email').val();

	if (appName && email) {
		fetch('/api/v1/newuser/authenticate', {
			method: 'POST',
			body: JSON.stringify({appName, email}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
			.then(token => appendToken(token, null))
			.catch(error => appendToken(null, error));
	}
};

const appendToken = ({token, error}) => {
	token ? $('.token').text(`${token}`) : $('.token').text(`${error}`);
};

$('.submit').click(postInfo);
