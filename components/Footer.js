export default function Button(props) {
    const {
        className = '',
    } = props

    return (
        <div className={['py-8 w-full mt-4 text-center', className].join(' ')}>
            <span>Flaming-autotest © 2022</span>
        </div>
    )
}