import Link from 'next/link'
import { Button, Card } from '~/components'
import HeaderIllustration from '~/assets/header_illustration.png'

export default function Landing() {
    return (
        <div className='w-full'>
            {/* Header card */}
            <div className='relative flex flex-row justify-around items-center bg-cyan rounded-2xl w-full mt-3 py-10'>
                <div className='lg:w-1/2 lg:pl-24 px-4 md:pl-12'>
                    <h1 className='text-2xl lg:text-4xl lg:whitespace-nowrap mb-5'><span className='text-gradient'>Automated</span> API Testing</h1>
                    <p className='text-gray-800'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    </p>
                    <div className='flex items-center justify-start mt-5'>
                        <Link href='/register'>
                            <a>
                                <Button
                                    type={'primary'}
                                    className={'mr-5'}
                                    size={'s'}
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
                <div className='relative py-36 w-1/2 h-full hidden md:block'>
                    <img className='absolute w-full -bottom-1/4 h-full object-contain' src={HeaderIllustration.src} />
                </div>
            </div>
            <div className='relative lg:my-48 my-12 lg:w-2/3 m-auto'>
                <h1 className='text-3xl text-center'>Discover next generation automated testing unlike anything else.</h1>
            </div>
            <div className='relative bg-pink rounded-2xl w-full p-4 py-3 md:pl-12 md:py-6 xl:pl-20 xl:py-10 overflow-hidden'>
                <h2 className='text-xl xl:text-3xl mb-6 md:mb-10'>Features</h2>
                <div className='flex flex-col md:flex-row'>
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}