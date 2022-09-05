import { useEffect, useState } from "react"
import { api } from "../services/api"

export const useQuestionIds = (themeId: number) => {

    const [questionIds, setQuestionIds] = useState<number[]>([])

    useEffect(() => {
        const fetchIds = async () => {
            const ids = await api.questions.getQuestionsIdsByTheme(themeId)
            setQuestionIds(ids)
        }

        fetchIds()
        
    }, [themeId])

    return { questionIds }
}