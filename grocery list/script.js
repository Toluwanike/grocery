document.addEventListener("DOMContentLoaded", function() {
    const groceryInput = document.getElementById("groceryInput");
    const addGroceryBtn = document.getElementById("addGroceryBtn");
    const saveGroceryBtn = document.getElementById("saveGroceryBtn");
    const groceryList = document.getElementById("groceryList");
    const countSpan = document.getElementById("count");
    
    let groceries = JSON.parse(localStorage.getItem("groceries")) || [];
    let checkedItems = new Set(JSON.parse(localStorage.getItem("checkedItems")) || []);

    // to store list
    renderGroceries();

    addGroceryBtn.addEventListener("click", function() {
        const groceryItem = groceryInput.value.trim();
        if (groceryItem !== "") {
            groceries.push(groceryItem);
            renderGroceries();
            groceryInput.value = "";
        }
    });

    saveGroceryBtn.addEventListener("click", function() {
        localStorage.setItem("groceries", JSON.stringify(groceries));
        localStorage.setItem("checkedItems", JSON.stringify(Array.from(checkedItems)));
    });

    function renderGroceries() {
        groceryList.innerHTML = "";
        groceries.forEach(function(item) {
            const li = document.createElement("li");
            li.textContent = item;

            // Check button
            const checkBtn = document.createElement("button");
            checkBtn.textContent = "✓";
            checkBtn.className = "check-btn";
            checkBtn.addEventListener("click", function() {
                if (!checkedItems.has(item)) {
                    checkedItems.add(item);
                    updateGroceryCount();
                    console.log("Check button clicked for:", item);
                }
            });

            // Delete button (X button)
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.className = "delete-btn";
            deleteBtn.addEventListener("click", function() {
                groceries = groceries.filter(g => g !== item);
                if (checkedItems.has(item)) {
                    checkedItems.delete(item);
                    updateGroceryCount();
                }
                renderGroceries();
            });

            // Append buttons to list item
            li.appendChild(checkBtn);
            li.appendChild(deleteBtn);

            // Append list item to grocery list
            groceryList.appendChild(li);
        });
        updateGroceryCount();
    }

    function updateGroceryCount() {
        countSpan.textContent = checkedItems.size;
    }
});


