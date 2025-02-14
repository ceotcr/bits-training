import { Categories } from "./Categories.js";
import { getExpenseCard, getSubscriptionCard } from "./components.js";
import { ExpenseTracker } from "./Expense.js";
import { ICategory, IExpense } from "./Interfaces.js";

const expenseTracker = new ExpenseTracker()
const categories = new Categories()
document.addEventListener("DOMContentLoaded", () => {
    const expenses = expenseTracker.getExpenses()
    const categorySelect = document.getElementById("category-select") as HTMLSelectElement
    categories.getCategories().forEach(category => {
        const option = document.createElement("option")
        option.value = category.name
        option.innerText = category.name
        categorySelect.appendChild(option)
    })
    categorySelect.addEventListener("change", (e) => {
        renderExpenses()
    })
    const dateSelect = document.getElementById("date-select") as HTMLSelectElement
    dateSelect.addEventListener("change", (e) => {
        renderExpenses()
    })
    renderExpenses()
    loadCards()
})


const loadCards = () => {
    const budgetInput = document.getElementById("budget") as HTMLInputElement;
    const gradedAmountP = document.getElementById("graded-budget") as HTMLParagraphElement;
    const gradedBudget = expenseTracker.gradedBudget()
    budgetInput.value = `$${gradedBudget.budget}`
    gradedAmountP.innerText = `$${gradedBudget.amount}`
    gradedAmountP.classList.remove("text-green-500", "text-yellow-500", "text-red-500")
    gradedAmountP.classList.add(gradedBudget.grade === "success" ? "text-green-500" : gradedBudget.grade === "warning" ? "text-yellow-500" : "text-red-500")

    const editBudget = document.getElementById("edit-budget") as HTMLButtonElement

    budgetInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            budgetInput.readOnly = true
            expenseTracker.setBudget(parseInt(budgetInput.value.replace("$", "")))
            const gradedBudget = expenseTracker.gradedBudget()
            budgetInput.value = `$${gradedBudget.budget}`
            gradedAmountP.innerText = `$${gradedBudget.amount}`
            gradedAmountP.classList.remove("text-green-500", "text-yellow-500", "text-red-500")
            gradedAmountP.classList.add(gradedBudget.grade === "success" ? "text-green-500" : gradedBudget.grade === "warning" ? "text-yellow-500" : "text-red-500")
        }
    })

    editBudget.addEventListener("click", () => {
        budgetInput.readOnly = false
        budgetInput.focus()
    })

    const totalExpenses = document.querySelector("#total-card p") as HTMLParagraphElement
    totalExpenses.innerText = `$${expenseTracker.totalExpenses()}`

    const monthlyExpenses = document.querySelector("#monthly-card p") as HTMLParagraphElement
    monthlyExpenses.innerText = `$${expenseTracker.monthlyExpenses()}`

    const dailyExpenses = document.querySelector("#daily-card p") as HTMLParagraphElement
    dailyExpenses.innerText = `$${expenseTracker.dailyExpenses()}`
}
const renderExpenses = () => {
    const categorySelect = document.getElementById("category-select") as HTMLSelectElement
    const cat = categorySelect.value
    const dateSelect = document.getElementById("date-select") as HTMLSelectElement
    const date = dateSelect.value as "today" | "month" | "year" | "all"
    const filteredExpenses = expenseTracker.getFilteredExpenses(cat, date)
    const historyContainer = document.getElementById("history") as HTMLDivElement
    historyContainer.innerHTML = ""
    filteredExpenses.forEach(expense => {
        historyContainer.innerHTML += getExpenseCard(expense)
    })

    const editButtons = document.querySelectorAll(".edit-expense")

    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt((e.target as HTMLElement).dataset.id as string)
            const expense = expenseTracker.getExpense(id)
            getOptions()
            if (expense) {
                const modal = document.getElementById("modal") as HTMLDivElement
                const modalClose = document.getElementById("modal-close") as HTMLDivElement
                const form = modal.querySelector("#form") as HTMLFormElement;

                (modal.querySelector("h2") as HTMLHeadingElement).innerText = "Edit Expense"
                modal.classList.remove("hidden")


                modalClose.onclick = () => modal.classList.add("hidden")


                const nameInput = document.getElementById("name") as HTMLInputElement
                const descriptionInput = document.getElementById("description") as HTMLInputElement
                const amountInput = document.getElementById("amount") as HTMLInputElement
                const dateInput = document.getElementById("date") as HTMLInputElement
                const categorySelect = document.getElementById("category") as HTMLSelectElement
                const toInput = document.getElementById("to") as HTMLInputElement
                const recurringInput = document.getElementById("recurring") as HTMLInputElement

                nameInput.value = expense.name
                descriptionInput.value = expense.description
                amountInput.value = expense.amount.toString()
                dateInput.value = new Date(expense.date).toISOString().split("T")[0]
                categorySelect.value = expense.category.name
                toInput.value = expense.to
                recurringInput.checked = expense.recurring;


                form.onsubmit = (event) => {
                    event.preventDefault()

                    expenseTracker.updateExpense(
                        id,
                        {
                            id,
                            name: nameInput.value,
                            description: descriptionInput.value,
                            amount: parseInt(amountInput.value),
                            date: dateInput.value,
                            category: categories.getCategories().find(category => category.name === categorySelect.value) as ICategory,
                            to: toInput.value,
                            recurring: recurringInput.checked
                        }
                    )

                    modal.classList.add("hidden")
                    loadCards()
                    renderExpenses()
                }
            }
        })
    })

    const deleteButtons = document.querySelectorAll(".delete-expense")
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt((e.target as HTMLElement).dataset.id as string)
            expenseTracker.deleteExpense(id)
            loadCards()
            renderExpenses()
        })
    })
    renderSubscriptions(filteredExpenses.filter(expense => expense.recurring))
}


const getOptions = () => {
    const select = document.getElementById("category") as HTMLSelectElement
    select.innerHTML = ""
    categories.getCategories().forEach(category => {
        const option = document.createElement("option")
        option.value = category.name
        option.innerText = category.name
        select.appendChild(option)
    })
}

const renderSubscriptions = (expenses: IExpense[]) => {
    const subscriptionsContainer = document.getElementById("subscriptions") as HTMLDivElement
    subscriptionsContainer.innerHTML = ""
    expenses.forEach(expense => {
        subscriptionsContainer.innerHTML += getSubscriptionCard(expense)
    })
}