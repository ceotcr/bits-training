interface IQuestion {
    question: string;
    choices: string[];
    correctAnswer: string;
}

type APIResponse = {
    response_code: number;
    results: {
        type: string;
        difficulty: string;
        category: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
    }[]
}

export class Quiz {
    private questions: IQuestion[] = [];
    private currentQuestionIndex: number = 0;
    private score: number = 0;
    evaluateAnswer(answer: string): void {
        if (!this.questions[this.currentQuestionIndex]) {
            return;
        }
        if (answer === decodeURIComponent(this.questions[this.currentQuestionIndex].correctAnswer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }

    getQuestion(): IQuestion | null {
        if (!this.questions[this.currentQuestionIndex]) {
            return null;
        }
        return this.questions[this.currentQuestionIndex];
    }

    getScore(): number {
        return (this.score / this.questions.length) * 100;
    }

    async loadQuestions(): Promise<void> {
        const response = await fetch('https://opentdb.com/api.php?amount=20&category=31&difficulty=easy&type=multiple&encode=url3986');
        const json = await response.json() as APIResponse;
        const data = json.results;
        console.log(data)
        this.questions = data.map((question) => {
            return {
                question: question.question,
                choices: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                correctAnswer: question.correct_answer
            }
        });
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getProgress(): number {
        return this.currentQuestionIndex / this.questions.length * 100;
    }
}