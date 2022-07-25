import { useContext, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '~/stores'
import { Button } from "~/components"

function LoggedOutHome() {
	return (
		<>
			<div className="m-5">
				<Link href="/register">
					<a>
						<Button
							type={'primary'}
							rounded={true}
							className={'mb-5'}
						>
							Register
						</Button>
					</a>
				</Link>
			</div>
			<div className="m-5">
				<Link href="/login">
					<a>
						<Button
							type={'secondary'}
							rounded={true}
							className={'mb-5'}
						>
							Log in
						</Button>
					</a>
				</Link>
			</div>
		</>
	)
}

function LoggedInHome() {
	const [userState, userDispatch] = useContext(UserContext)

	const logout = () => {
		userDispatch(user => {
			user.isLoggedIn = false
			user.email = false
		})
	}

	return (
		<div className='flex flex-col justify-start items-start'>
			<p>Hello {userState.email} !</p>
			<Button
				type={'secondary'}
				className={'mt-5'}
				onClick={logout}
			>
				Log out
			</Button>
		</div> 
	)
}

export default function Home() {
	const [userState, userDispatch] = useContext(UserContext)

	return (
		<div className="rounded-xl m-10 flex flex-col items-start">
			<h1 className="text-xl">Welcome to flaming' autotest</h1>
			<div className="flex flex-row">
				{userState.isLoggedIn ? (
					<LoggedInHome />
				): (
					<LoggedOutHome />
				)}
			</div>
		</div>
	)
}