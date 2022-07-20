import Head from 'next/head'
import '~/styles/globals.css'

function Main({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Flaming-Autotest</title>
				<meta name="description" content="Create automated integration tests based on swagger" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container mx-auto">
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default Main
