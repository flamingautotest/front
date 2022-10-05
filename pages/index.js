import { useContext } from 'react'
import { UserContext, APIContext } from '~/stores'
import { Spinner } from '~/components'
import { Landing } from '~/partials'
import Router from 'next/router'

export default function Home() {
	const { userState } = useContext(UserContext)
	const { apiState } = useContext(APIContext)

	if (userState.isLoading || apiState.isLoading) return <Spinner />

	if (!userState.isLoggedIn) {
		return <Landing />
	} else {
		if (userState.projectsReferences.length) {
			Router.push('/projects')
		} else {
			Router.push('/upload')
		}
	}
}