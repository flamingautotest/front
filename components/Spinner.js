import HeaderIllustration from '~/assets/header_illustration.png'

export default function Spinner() {
    return (
        <div className="h-screen flex flex-col justify-center items-center z-50">
            <img className='w-32 object-contain' src={HeaderIllustration.src} />
            <div className="loading-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}