import { useContext } from 'react'
import { Button } from '~/components'
import { UserContext } from '~/stores'
import Link from 'next/link'

export default function Navbar() {
    const [userState, userDispatch] = useContext(UserContext)

    const logout = () => {
		userDispatch(user => {
			user.isLoggedIn = false
			user.email = false
		})
	}

    return (
        <div className='flex flex-row justify-between max-w-screen-xl w-full mx-auto items-center p-4'>
            <Link href='/'>
                <a>
                    <h1 className='text-xl'>Flaming-Autotest</h1>
                </a>
            </Link>
            <div className='flex flex-row items-center'>
                {!userState.isLoggedIn ? (
                    <div className='flex flex-row items-center'>
                        <Link href='/login'>
                            <a>
                                <Button
                                    type={'secondary'}
                                    size={'s'}
                                    className={'ml-5'}
                                >
                                    Log in
                                </Button>
                            </a>
                        </Link>
                        <Link href='/register'>
                            <a>
                                <Button
                                    type={'primary'}
                                    size={'s'}
                                    className={'ml-5'}
                                >
                                    Register
                                </Button>
                            </a>
                        </Link>
                    </div>
                ) : (
                    <Button
                        type={'secondary'}
                        size={'s'}
                        onClick={logout}
                    >
                        Log out
                    </Button>
                )}
            </div>
        </div>
    )
}