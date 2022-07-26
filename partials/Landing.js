import Link from 'next/link'
import { Button, Card } from '~/components'
import HeaderIllustration from '~/assets/header_illustration.png'

export default function Landing() {
    return (
        <div className='w-full'>
            {/* Header card */}
            <div className='relative flex flex-row justify-around items-center bg-cyan rounded-2xl w-full mt-3 py-10'>
                <div className='w-1/2 pl-24'>
                    <h1 className='text-4xl whitespace-nowrap mb-5'><span className='text-gradient'>Automated</span> API Testing</h1>
                    <p className='text-gray-800'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    </p>
                    <div className='flex flex-row items-center justify-start mt-5'>
                        <Link href='/register'>
                            <a>
                                <Button
                                    type={'primary'}
                                    className={'mr-5'}
                                >
                                    Get Started
                                </Button>
                            </a>
                        </Link>
                        <Link href='#'>
                            <a className='text-gray-900'>
                                Documentation
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='relative py-36 w-1/2 h-full'>
                    <img className='absolute w-full -bottom-1/4 h-full object-contain' src={HeaderIllustration.src} />
                </div>
            </div>
            <div className='relative my-48 w-2/3 m-auto'>
                <h1 className='text-3xl text-center'>Discover next generation automated testing unlike anything else.</h1>
            </div>
            <div className='relative bg-pink rounded-2xl w-full pl-20 py-10 overflow-hidden'>
                <h2 className='text-3xl mb-10'>Features</h2>
                <div className='flex flex-row'>
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}