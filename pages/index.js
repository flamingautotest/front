import { useContext } from 'react'
import { UserContext } from '~/stores'
import { CreateTest, Landing, Upload } from '~/partials'

export default function Home() {
	const { userState } = useContext(UserContext)

	if (!userState.isLoggedIn) {
		return <Landing />
	} else {
		if (userState.fileUrl.length) {
			return <CreateTest />
		} else {
			return <Upload />
		}
	}
}