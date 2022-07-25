import { UserProvider } from "~/stores"
import Head from 'next/head'
import '~/styles/globals.css'
import { Navbar } from '~/components'

function Main({ Component, pageProps }) {
	return (
		<UserProvider>
			<Head>
				<title>Flaming-Autotest</title>
				<meta name="description" content="Create automated integration tests based on swagger" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<div className="max-w-screen-lg px-4 w-full mx-auto">
				<Component {...pageProps} />
			</div>
		</UserProvider>
	)
}

export default Main
