import { apiUrl } from "../config";
import axios from "axios"
import { QuestionType, ThemeDataType } from "../type";

export class QuestionsService {
    private themesUrl: string = apiUrl + 'themes/'
    private questionsUrl: string = apiUrl + 'questions/'

    async getQuestionsIdsByTheme(themeId: number): Promise<number[]> {
        const responce = await axios.get<ThemeDataType>(
            this.themesUrl + themeId.toString(),
        )

        return responce.data.qIds
    }

    async getThemeNameById(themeId: number): Promise<string> {
        const responce = await axios.get<ThemeDataType>(
            this.themesUrl + themeId.toString()
        )

        if (responce.status == 200)
            return responce.data.name

        return Promise.reject('Error')
    }

    async getQuestionById(qId: number): Promise<QuestionType> {
        const responce = await axios.get<QuestionType>(
            this.questionsUrl + qId.toString()
        )

        if (responce.status == 200)
            return responce.data

        return Promise.reject('Error')
    }

    async getThemes(): Promise<ThemeDataType[]> {
        const responce = await axios.get<ThemeDataType[]>(
            this.themesUrl
        )

        if (responce.status == 200)
            return responce.data

        return Promise.reject('Error')
    }
}