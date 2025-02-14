import { Categories } from "./Categories.js";
import { getExpenseCard, getSubscriptionCard } from "./components.js";
import { ExpenseTracker } from "./Expense.js";
const expenseTracker = new ExpenseTracker();
const categories = new Categories();
document.addEventListener("DOMContentLoaded", () => {
    const expenses = expenseTracker.getExpenses();
    const categorySelect = document.getElementById("category-select");
    categories.getCategories().forEach(category => {
        const option = document.createElement("option");
        option.value = category.name;
        option.innerText = category.name;
        categorySelect.appendChild(option);
    });
    categorySelect.addEventListener("change", (e) => {
        renderExpenses();
    });
    const dateSelect = document.getElementById("date-select");
    dateSelect.addEventListener("change", (e) => {
        renderExpenses();
    });
    renderExpenses();
    loadCards();
    const addExpenseButton = document.getElementById("add-expense");
    addExpenseButton.addEventListener("click", addHandler);
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
const renderExpenses = () => {
    const categorySelect = document.getElementById("category-select");
    const cat = categorySelect.value;
    const dateSelect = document.getElementById("date-select");
    const date = dateSelect.value;
    const filteredExpenses = expenseTracker.getFilteredExpenses(cat, date);
    const historyContainer = document.getElementById("history");
    if (filteredExpenses.length === 0) {
        historyContainer.innerHTML = `

                    <img src="./assets/empty.png" alt="Empty" class="w-full max-w-[240px] mx-auto" id="empty" />
                    <p class="text-center" id="empty-text">Start adding expenses to see them here</p>
        `;
        renderSubscriptions([]);
        return;
    }
    historyContainer.innerHTML = "";
    filteredExpenses.forEach(expense => {
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
                    form.reset();
                    loadCards();
                    renderExpenses();
                };
            }
        });
    });
    const deleteButtons = document.querySelectorAll(".delete-expense");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            expenseTracker.deleteExpense(id);
            loadCards();
            renderExpenses();
        });
    });
    renderSubscriptions(filteredExpenses.filter(expense => expense.recurring));
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
const renderSubscriptions = (expenses) => {
    const subscriptionsContainer = document.getElementById("subscriptions");
    if (expenses.length === 0) {
        subscriptionsContainer.innerHTML = `
                    <img src="./assets/empty.png" alt="Empty" class="w-full max-w-[240px] mx-auto" id="empty" />
                    <p class="text-center" id="empty-text">Try recurring expenses</p>
        `;
        return;
    }
    subscriptionsContainer.innerHTML = "";
    expenses.forEach(expense => {
        subscriptionsContainer.innerHTML += getSubscriptionCard(expense);
    });
};
const addHandler = () => {
    getOptions();
    const modal = document.getElementById("modal");
    const modalClose = document.getElementById("modal-close");
    const form = modal.querySelector("#form");
    modal.querySelector("h2").innerText = "Add Expense";
    modal.classList.remove("hidden");
    form.reset();
    modalClose.onclick = () => modal.classList.add("hidden");
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const categorySelect = document.getElementById("category");
    const toInput = document.getElementById("to");
    const recurringInput = document.getElementById("recurring");
    form.onsubmit = (event) => {
        event.preventDefault();
        expenseTracker.addExpense({
            id: expenseTracker.getId(),
            name: nameInput.value,
            description: descriptionInput.value,
            amount: parseInt(amountInput.value),
            date: dateInput.value,
            category: categories.getCategories().find(category => category.name === categorySelect.value),
            to: toInput.value,
            recurring: recurringInput.checked
        });
        modal.classList.add("hidden");
        form.reset();
        loadCards();
        renderExpenses();
    };
};
