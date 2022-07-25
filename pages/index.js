import { useContext } from "react"
import { UserContext } from '~/stores'
import { Landing } from "~/partials"

export default function Home() {
	const [userState] = useContext(UserContext)

	if (!userState.isLoggedIn) return <Landing />
	return <div>Hello {userState.email} !</div>
}