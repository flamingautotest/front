import { useRouter } from 'next/router'
import { Footer } from '~/components'

export default function Test() {
    const router = useRouter()
    const { testId } = router.query

    return (
        <div>
            <div>
                coucou test #{testId}
            </div>
            <Footer className={'bottom-0'}/>
        </div>
    )
}