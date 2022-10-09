export default function Button(props) {
    const {
        className = '',
    } = props

    return (
        <div className={['py-8 w-full mt-4 text-center sm:absolute bottom-0 left-0', className].join(' ')}>
            <span>Flaming-autotest © 2022</span>
        </div>
    )
}