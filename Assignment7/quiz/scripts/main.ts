import { Quiz } from "./quiz.js";
let name: string;
const quiz = new Quiz();

document.addEventListener("DOMContentLoaded", async () => {
    await quiz.loadQuestions();
    const options: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".option");
    const nextButton = document.getElementById("next") as HTMLButtonElement;

    load();

    nextButton.addEventListener("click", () => {
        quiz.evaluateAnswer("");
        renderQuestion();
    });

    options.forEach((option) => {
        option.addEventListener("click", () => {
            quiz.evaluateAnswer(option.textContent as string);
            renderQuestion();
        });
    });
});

const renderQuestion = () => {
    const question = quiz.getQuestion();
    const progress = quiz.getProgress();
    const progressBar = document.getElementById("progress") as HTMLDivElement;
    progressBar.style.background = `linear-gradient(90deg,rgb(136, 0, 255) ${progress}%,rgb(48, 48, 48) ${progress}%)`;
    if (question) {
        const questionElement = document.getElementById("question") as HTMLHeadingElement;
        const options = document.querySelectorAll(".option") as NodeListOf<HTMLButtonElement>;
        questionElement.textContent = decodeURIComponent(question.question);
        options.forEach((option, index) => {
            option.textContent = decodeURIComponent(question.choices[index]);
        })
    }
    else {
        showResult();
    }
}

const load = () => {
    const startBt = document.getElementById("start") as HTMLButtonElement;
    startBt.addEventListener("click", () => {
        name = (document.getElementById("name") as HTMLInputElement).value.trim();
        if (!name || name === "") {
            alert("Please enter your name!");
            return;
        }
        document.getElementById("start-cont")?.classList.add("hidden");
        document.getElementById("quiz-cont")?.classList.remove("hidden");
        renderQuestion();
    });
}

const showResult = () => {
    const resultCont = document.getElementById("result-cont") as HTMLDivElement;
    const quizCont = document.getElementById("quiz-cont") as HTMLDivElement;
    const result = document.getElementById("result") as HTMLParagraphElement;
    const score = quiz.getScore();
    const message = score >= 70 ? "Congratulations" : score >= 50 ? "Good job" : "You can do better";
    result.textContent = `${message} ${name}! You scored ${score}%`;
    quizCont.classList.add("hidden");
    resultCont.classList.remove("hidden");
    const restartBt = document.getElementById("restart") as HTMLButtonElement;
    restartBt.addEventListener("click", async () => {
        quizCont.classList.remove("hidden");
        resultCont.classList.add("hidden");
        restartBt.classList.add("opacity-50");
        restartBt.disabled = true;
        await quiz.loadQuestions();
        renderQuestion();
    });
}