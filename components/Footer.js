import Image from 'next/image'
import HeaderIllustration from '~/assets/header_illustration.png'

export default function Button(props) {
    const {
        className = '',
    } = props

    return (
        <div className={['flex flex-col w-full text-center absolute mb-3 bottom-0 left-0 pointer-events-none', className].join(' ')}>
            <Image width={'40px'} height={'40px'} className='w-10 object-contain' src={HeaderIllustration} />
            <span className='mt-3'>Flaming-autotest © 2022</span>
        </div>
    )
}
