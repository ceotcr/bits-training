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
    const dragging = document.querySelector('.dragging');
    const others = [...document.querySelectorAll('.list-group-item:not(.dragging)')];

    let nextElem = null;

    for (let other of others) {
        const box = other.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;

        if (offset < 0) {
            nextElem = other;
            break;
        }
    }

    ul.insertBefore(dragging, nextElem);
});
