const itemsList = document.querySelector("#todoItemsList");

initEventListeners();

function initEventListeners()
{
    document.querySelector("#formulary").addEventListener("submit", appendItem);
}

function appendItem(event)
{
    event.preventDefault();

    const textArea = document.querySelector("#todoInput");

    const item = document.createElement("li");
    item.innerHTML = `
        <span>${textArea.value}</span>
        <button type="button" class="btn-close">&times;</button>
    `;

    item.lastElementChild.addEventListener("click", deleteItem);

    itemsList.appendChild(item);

    textArea.value = "";
}

function deleteItem(event)
{
    event.target.parentElement.remove();
}

// Add character limit
// Add hover effects to button