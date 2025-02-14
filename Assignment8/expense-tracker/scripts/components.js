export const getExpenseCard = (expense) => {
    return `
    <div class="w-full flex justify-between items-center bg-[#151515] p-4 rounded-lg">
        <div class="flex gap-4 items-center">
            <span class="material-icons text-green-500">${expense.category.icon}</span>
            <div class="flex flex-col">
                <p class="text-lg">${expense.name} - ${expense.to}</p>
                <p class="text-sm font-extralight">
                    ${expense.description}
                </p>
                <p class="text-sm">${expense.date}</p>
            </div>
        </div>
        <div class="flex flex-col items-end justify-between gap-2">
            <div class="flex gap-4">
                <span class="material-icons cursor-pointer hover:text-white text-slate-300 edit-expense" data-id="${expense.id}">edit</span>
                <span class="material-icons cursor-pointer hover:text-white text-slate-300 delete-expense" data-id="${expense.id}">delete</span>
            </div>
            <p class="text-lg">$${expense.amount}</p>
        </div>
    </div>
    `;
};
