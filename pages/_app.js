import Head from 'next/head'
import { UserProvider, APIProvider } from '~/stores'
import { Navbar, LoginGuard } from '~/components'
import '~/styles/globals.css'

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
					<LoginGuard>
						<Component {...pageProps} />
					</LoginGuard>
				</div>
			</UserProvider>
		</APIProvider>
	)
}

export default Main
