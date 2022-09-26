export const getAnswerFromLocalStorage = (qId: number) => {
    return localStorage.getItem(`q${qId}answer`)
}

export const pushAnswerIntoLocalStorage = (qId: number, answer: string) => {
    localStorage.setItem(`q${qId}answer`, answer)
}

export const pushCurrentQIdToLocalStorage = (qId: number) => {
    localStorage.setItem('currentQId', qId.toString())
}

export const getCurrentQIdFromLocalStorage = () => {
    return Number(localStorage.getItem('currentQId'))
}
