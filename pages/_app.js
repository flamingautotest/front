import { UserProvider, APIProvider } from '~/stores'
import Head from 'next/head'
import '~/styles/globals.css'
import { Navbar, Footer } from '~/components'

function Main({ Component, pageProps }) {
	return (
		<APIProvider>
			<UserProvider>
				<Head>
					<title>Flaming-Autotest</title>
					<meta name='description' content='Create automated integration tests based on swagger' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<Navbar />
				<div className='max-w-screen-xl px-4 w-full mx-auto'>
					<Component {...pageProps} />
					<Footer />
				</div>
			</UserProvider>
		</APIProvider>
	)
}

export default Main
