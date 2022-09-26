import { QuestionsService } from "./questionsService";

export class Api {
    public questions: QuestionsService = new QuestionsService()
}

export const api = new Api()