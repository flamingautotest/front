import { useContext } from 'react'
import { UserContext } from '~/stores'
import { Spinner } from '~/components'
import { CreateTest, Landing, Upload } from '~/partials'

export default function Home() {
	const { userState } = useContext(UserContext)

	if (userState.isLoading) return <Spinner />

	if (!userState.isLoggedIn) {
		return <Landing />
	} else {
		if (userState.projectsReferences.length) {
			return <CreateTest />
		} else {
			return <Upload />
		}
	}
}