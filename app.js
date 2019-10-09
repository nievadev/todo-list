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
    noItems.className = "no-items";
    itemsList.appendChild(noItems);
}

// Add to DOM existing items
const itemsArray = getArrayFromLocalStorage();

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
        popError("You have already submitted this to-do item!");
        return;
    }

    if (!textArea.value.replace(/\s/g, "").length)
    {
        textArea.value = "";
        popError("You can't submit a blank item!");
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
        noItems.className = "no-items";
        itemsList.appendChild(noItems);
    }
}

function getArrayFromLocalStorage()
{
    return JSON.parse(localStorage.getItem("items"));
}

function popError(str)
{
    document.querySelector("#error").style.display = "flex";

    document.querySelector("#errorMessage").innerText = str;

    document.querySelector("#error").addEventListener("click", function() {
        document.querySelector("#error").style.display = "none";
    });
}

// Add character limit
// Add hover effects to button