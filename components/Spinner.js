import Image from 'next/image'
import HeaderIllustration from '~/assets/header_illustration.png'

export default function Spinner() {
    return (
        <div className="absolute inset-0 h-screen flex flex-col justify-center items-center z-50">
            <Image width={'150px'} height={'150px'} className='w-10 object-contain' src={HeaderIllustration} />
            <div className="loading-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}