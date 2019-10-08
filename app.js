const itemsList = document.querySelector("#todoItemsList");

document.querySelector("#formulary").addEventListener("submit", appendItem);

if (localStorage.getItem("items") === null)
{
    localStorage.setItem("items", "[]");
}

if (localStorage.getItem("items") == "[]")
{
    const noItems = document.createElement("span");
    noItems.innerText = "No items to-do yet";
    itemsList.appendChild(noItems);
}

const itemsArray = getArrayFromLocalStorage();

// Add to DOM existing items
itemsArray.forEach(function(itemString) {
    const item = document.createElement("li");
    item.innerHTML = `
        <span>${itemString}</span>
        <button type="button" class="btn-close">&times;</button>
    `;
    item.lastElementChild.addEventListener("click", deleteItem);
    itemsList.appendChild(item);
});

function appendItem(event)
{
    if (localStorage.getItem("items") == "[]")
    {
        itemsList.lastElementChild.remove();
    }

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
    let itemsArray = getArrayFromLocalStorage();
    let targetIndex = itemsArray.indexOf(event.target.previousElementSibling.textContent);

    itemsArray.splice(targetIndex, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));

    event.target.parentElement.remove();
    
    if (localStorage.getItem("items") == "[]")
    {
        const noItems = document.createElement("span");
        noItems.innerText = "No items to-do yet";
        itemsList.appendChild(noItems);
    }
}

function getArrayFromLocalStorage()
{
    return JSON.parse(localStorage.getItem("items"));
}

// Add character limit
// Add hover effects to button