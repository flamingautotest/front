import { useContext } from 'react'
import { Button } from '~/components'
import { UserContext } from '~/stores'
import HeaderIllustration from '~/assets/header_illustration.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    const { userState, logoutUser } = useContext(UserContext)

    return (
        <div className='flex flex-row justify-between max-w-screen-xl w-full mx-auto items-center p-4'>
            <Link href='/'>
                <a className='flex items-center'>
                    <Image width={'40px'} height={'40px'} className='w-10 object-contain' src={HeaderIllustration} />
                    <h1 className='text-xl ml-3'>Flaming-Autotest</h1>
                </a>
            </Link>
            {!userState.isLoading ?
                !userState.isLoggedIn ? (
                    <div className='flex flex-row items-center'>
                        <Link href='/login'>
                            <a>
                                <Button
                                    type={'secondary'}
                                    size={'s'}
                                    className={'ml-5 whitespace-nowrap'}
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
                        onClick={logoutUser}
                    >
                        Log out
                    </Button>
                )
            : null}
        </div>
    )
}