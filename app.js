const itemsList = document.querySelector("#todoItemsList");

document.querySelector("#formulary").addEventListener("submit", appendItem);

if (localStorage.getItem("items") === null)
{
    localStorage.setItem("items", "[]");
}

const itemsArray = getArrayFromLocalStorage();

// Add to DOM existing items
itemsArray.forEach(function(itemString) {
    const item = document.createElement("li");
    item.innerHTML = `
        <span>${itemString}</span>
        <button type="button" class="btn-close">&times;</button>
    `;
    itemsList.appendChild(item);
});

function appendItem(event)
{
    event.preventDefault();

    let itemsArray = getArrayFromLocalStorage();

    const textArea = document.querySelector("#todoInput");

    if (itemsArray.includes(textArea.value))
    {
        return;
    }

    if (!textArea.value.replace(/\s/g, "").length)
    {
        textArea.value = "";
        return;
    }

    const item = document.createElement("li");
    item.innerHTML = `
        <span>${textArea.value}</span>
        <button type="button" class="btn-close">&times;</button>
    `;

    item.lastElementChild.addEventListener("click", deleteItem);

    // Add item to DOM
    itemsList.appendChild(item);

    // Add item to local storage
    itemsArray.push(item.firstElementChild.textContent);
    localStorage.setItem("items", JSON.stringify(itemsArray));

    textArea.value = "";
}

function deleteItem(event)
{
    event.target.parentElement.remove();
}

function getArrayFromLocalStorage()
{
    return JSON.parse(localStorage.getItem("items"));
}

// Add character limit
// Add hover effects to button