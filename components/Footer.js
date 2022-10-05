export default function Button(props) {
    const {
        className = '',
    } = props
    return (
        <div className={[
            'py-8 absolute',
            className
        ].join(' ')
        }>
            <span className={'text-center'}>Flaming-autotest © 2022</span>
        </div>
    )
}