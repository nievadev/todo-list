const itemsList = document.querySelector(".todo-items-list");

initEventListeners();

function initEventListeners()
{
    document.querySelector(".formulary").addEventListener("submit", appendItem);
}

function appendItem(event)
{
    event.preventDefault();

    const textArea = document.querySelector(".todo-input");

    const item = document.createElement("li");
    item.innerHTML = `
        <span>${textArea.value}</span>
    `;

    itemsList.appendChild(item);

    textArea.value = "";
}