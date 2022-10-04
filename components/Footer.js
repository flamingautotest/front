import { joinClassNames } from '~/utils'

export default function Button(props) {
    const {
    } = props

    return (
        <div
            className={
                [
                    'my-8',
                    // className
                ].join(' ')
            }
        >
            <p className={'text-center'}>Flaming-autotest © 2022</p>
        </div>
    )
}