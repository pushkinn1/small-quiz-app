import { useEffect } from "react"

export const useKeypress = (key: string, callback: () => void) => {
    useEffect(() => {
        const handleKeypress = (e: KeyboardEvent) => {
            if (e.key == key)
                callback()
        }
        document.addEventListener('keydown', handleKeypress)

        return () => document.removeEventListener('keydown', handleKeypress)
    })
}