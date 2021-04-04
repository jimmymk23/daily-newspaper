// import App from 'next/app';
import '../styles/main.sass';

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

// MyApp.getInitialProps = async (appContext) => {
// 	// calls page's `getInitialProps` and fills `appProps.pageProps`
// 	const appProps = await App.getInitialProps(appContext);

// 	return { ...appProps };
// };

export default MyApp;
