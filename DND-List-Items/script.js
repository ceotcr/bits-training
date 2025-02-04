const lis = document.querySelectorAll('.list-group-item');
lis.forEach(li => {
    li.setAttribute('draggable', true);
    li.addEventListener('dragstart', () => {
        li.classList.add('dragging');
    })
    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
    })
})

const ul = document.querySelector('.list-group');
ul.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(ul, e.clientY);
    const dragging = document.querySelector('.dragging');
    if (afterElement == null) {
        ul.appendChild(dragging);
    } else {
        ul.insertBefore(dragging, afterElement);
    }
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.list-group-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}