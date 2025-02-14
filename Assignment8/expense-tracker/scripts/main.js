import { Categories } from "./Categories.js";
import { getExpenseCard } from "./components.js";
import { ExpenseTracker } from "./Expense.js";
const expenseTracker = new ExpenseTracker();
const categories = new Categories();
document.addEventListener("DOMContentLoaded", () => {
    const expenses = expenseTracker.getExpenses();
    renderExpenses(expenses);
    loadCards();
});
const loadCards = () => {
    const budgetInput = document.getElementById("budget");
    const gradedAmountP = document.getElementById("graded-budget");
    const gradedBudget = expenseTracker.gradedBudget();
    budgetInput.value = `$${gradedBudget.budget}`;
    gradedAmountP.innerText = `$${gradedBudget.amount}`;
    gradedAmountP.classList.remove("text-green-500", "text-yellow-500", "text-red-500");
    gradedAmountP.classList.add(gradedBudget.grade === "success" ? "text-green-500" : gradedBudget.grade === "warning" ? "text-yellow-500" : "text-red-500");
    const editBudget = document.getElementById("edit-budget");
    budgetInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            budgetInput.readOnly = true;
            expenseTracker.setBudget(parseInt(budgetInput.value.replace("$", "")));
            const gradedBudget = expenseTracker.gradedBudget();
            budgetInput.value = `$${gradedBudget.budget}`;
            gradedAmountP.innerText = `$${gradedBudget.amount}`;
            gradedAmountP.classList.remove("text-green-500", "text-yellow-500", "text-red-500");
            gradedAmountP.classList.add(gradedBudget.grade === "success" ? "text-green-500" : gradedBudget.grade === "warning" ? "text-yellow-500" : "text-red-500");
        }
    });
    editBudget.addEventListener("click", () => {
        budgetInput.readOnly = false;
        budgetInput.focus();
    });
    const totalExpenses = document.querySelector("#total-card p");
    totalExpenses.innerText = `$${expenseTracker.totalExpenses()}`;
    const monthlyExpenses = document.querySelector("#monthly-card p");
    monthlyExpenses.innerText = `$${expenseTracker.monthlyExpenses()}`;
    const dailyExpenses = document.querySelector("#daily-card p");
    dailyExpenses.innerText = `$${expenseTracker.dailyExpenses()}`;
};
const renderExpenses = (expenses) => {
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "";
    expenses.forEach(expense => {
        historyContainer.innerHTML += getExpenseCard(expense);
    });
    const editButtons = document.querySelectorAll(".edit-expense");
    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            const expense = expenseTracker.getExpense(id);
            getOptions();
            if (expense) {
                const modal = document.getElementById("modal");
                const modalClose = document.getElementById("modal-close");
                const form = modal.querySelector("#form");
                modal.querySelector("h2").innerText = "Edit Expense";
                modal.classList.remove("hidden");
                modalClose.onclick = () => modal.classList.add("hidden");
                const nameInput = document.getElementById("name");
                const descriptionInput = document.getElementById("description");
                const amountInput = document.getElementById("amount");
                const dateInput = document.getElementById("date");
                const categorySelect = document.getElementById("category");
                const toInput = document.getElementById("to");
                const recurringInput = document.getElementById("recurring");
                nameInput.value = expense.name;
                descriptionInput.value = expense.description;
                amountInput.value = expense.amount.toString();
                dateInput.value = new Date(expense.date).toISOString().split("T")[0];
                categorySelect.value = expense.category.name;
                toInput.value = expense.to;
                recurringInput.checked = expense.recurring;
                form.onsubmit = (event) => {
                    event.preventDefault();
                    expenseTracker.updateExpense(id, {
                        id,
                        name: nameInput.value,
                        description: descriptionInput.value,
                        amount: parseInt(amountInput.value),
                        date: dateInput.value,
                        category: categories.getCategories().find(category => category.name === categorySelect.value),
                        to: toInput.value,
                        recurring: recurringInput.checked
                    });
                    modal.classList.add("hidden");
                    loadCards();
                    renderExpenses(expenseTracker.getExpenses());
                };
            }
        });
    });
};
const getOptions = () => {
    const select = document.getElementById("category");
    select.innerHTML = "";
    categories.getCategories().forEach(category => {
        const option = document.createElement("option");
        option.value = category.name;
        option.innerText = category.name;
        select.appendChild(option);
    });
};
