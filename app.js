const itemsList = document.querySelector(".todo-items-list");

initEventListeners();

function initEventListeners()
{
    document.querySelector("#formulary").addEventListener("submit", appendItem);
}

function appendItem(event)
{
    event.preventDefault();

    const textArea = document.querySelector(".todo-input");

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