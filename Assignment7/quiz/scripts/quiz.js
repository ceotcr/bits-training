export class Quiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
    }
    evaluateAnswer(answer) {
        if (!this.questions[this.currentQuestionIndex]) {
            return;
        }
        if (answer === decodeURIComponent(this.questions[this.currentQuestionIndex].correctAnswer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    getQuestion() {
        if (!this.questions[this.currentQuestionIndex]) {
            return null;
        }
        return this.questions[this.currentQuestionIndex];
    }
    getScore() {
        return (this.score / this.questions.length) * 100;
    }
    async loadQuestions() {
        const response = await fetch('https://opentdb.com/api.php?amount=20&category=31&difficulty=easy&type=multiple&encode=url3986');
        const json = await response.json();
        const data = json.results;
        console.log(data);
        this.questions = data.map((question) => {
            return {
                question: question.question,
                choices: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                correctAnswer: question.correct_answer
            };
        });
        this.currentQuestionIndex = 0;
        this.score = 0;
    }
    getProgress() {
        return this.currentQuestionIndex / this.questions.length * 100;
    }
}
