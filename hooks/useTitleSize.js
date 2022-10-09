import { useEffect, useState } from "react"

export default function useTitleSize(text) {
    const [textSize, setTextSize] = useState('text-xl')

    useEffect(() => {
        if (!text || text === null || text?.length <= 0) return
        const length = text.length

        if (length > 60) {
            setTextSize('text-xs')
            return
        } else if (length > 50) {
            setTextSize('text-sm')
            return
        } else if (length > 30) {
            setTextSize('text-m')
            return
        } else {
            setTextSize('text-xl')
            return
        }
    }, [text])

    return textSize
}