import { useRouter } from 'next/router'

export default function Test() {
    const router = useRouter()
    const { testId } = router.query

    return (
        <div>
            coucou test #{testId}
        </div>
    )
}