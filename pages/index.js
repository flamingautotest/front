import { useContext } from 'react'
import { UserContext } from '~/stores'
import { Landing, Upload } from '~/partials'

export default function Home() {
	const [userState] = useContext(UserContext)

	if (!userState.isLoggedIn) return <Landing />
	return <Upload />
}