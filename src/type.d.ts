export type QuestionType = {
    id: number
    question: string
    options?: string[]
    answer: string | string[]
    type: QuestionVariant
}

export type AnswerType = {
    qId: number
    answer: string 
}

export type RouteConfType = {
    path: string
    element: JSX.Element
}

type QuestionVariant = 'text' | 'select'

export type ThemeDataType = {
    id: number,
    name: string,
    qIds: number[]
}