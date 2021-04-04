import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta charSet='utf-8' />
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/icons/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/icons/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/icons/favicon-16x16.png'
					/>
					<link rel='manifest' href='/icons/site.webmanifest' />
					<link
						rel='mask-icon'
						href='/icons/safari-pinned-tab.svg'
						color='#5bbad5'
					/>
					<link rel='shortcut icon' href='/icons/favicon.ico' />
					<meta name='msapplication-TileColor' content='#da532c' />
					<meta
						name='msapplication-config'
						content='/icons/browserconfig.xml'
					/>
					<meta name='theme-color' content='#ffffff' />

					<meta
						name='description'
						content='Daily newspaper app create by James Keseling'
					/>
					<meta name='author' content='James Keseling' />
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?EB+Garamond:ital,wght@1,800&family=Source+Serif+Pro:ital,wght@0,400;0,700;1,400&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
