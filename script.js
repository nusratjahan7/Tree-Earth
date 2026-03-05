
const categoriesContainer = document.getElementById("categories-container");
const treesContainer = document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loading-spinner");
const allTreesBtn = document.getElementById("all-trees-btn");

// step - 1
async function loadCategories(){
   // async await
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    // console.log(data);
    data.categories.forEach(category => {
        // console.log(category);
        const btn = document.createElement("button");
        btn.className = "btn btn-wide";
        btn.textContent = category.category_name;
        btn.onclick = () => selectCategory(category.id, btn);
        categoriesContainer.appendChild(btn);
    });
};

// step - 6
async function selectCategory(categoryId, btn){
    // console.log(categoryId, btn); 
    showLoading(); 
    const allBtn = document.querySelectorAll("#categories-container button, #all-trees-btn");
    allBtn.forEach(btn => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-soft");
    });
    btn.classList.add("btn-success");
    btn.classList.remove("btn-soft");  
    
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
    const data = await res.json();
    console.log(data);
    displayTrees(data.plants);
    hideLoading();
};

// step - 7
allTreesBtn.addEventListener("click", () => {
    const allButtons = document.querySelectorAll("#categories-container button, #all-trees-btn");
     allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
    btn.classList.add("btn-soft");
  });

  allTreesBtn.classList.add("btn-success");
  allTreesBtn.classList.remove("btn-soft");

  loadAllTrees();
});

// step - 4 
function showLoading(){
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = "";
}
// step - 5
function hideLoading(){
    loadingSpinner.classList.add("hidden");
}

// step - 2
async function loadAllTrees() {
    showLoading();
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json(); 
    hideLoading();
    displayTrees(data.plants);
};

// step - 3
function displayTrees(trees) {
    // console.log(trees);
    treesContainer.innerHTML = "";
    trees.forEach((tree) => {
        // console.log(tree);
        const card = document.createElement("div");
        card.className ="card bg-base-100 w-full shadow-sm";
        card.innerHTML = `
                <figure>
                <img
                src=${tree.image}
                alt="${tree.name}" 
                class="h-48 w-full object-cover"/>
                 </figure>
                <div class="card-body">
                <h2 class="card-title">${tree.name}</h2>
                <p class="line-clamp-2">${tree.description}</p>
                <div class="badge  badge-success">${tree.category}</div>
                <div class="card-actions flex justify-between mt-2">
                <h2 class="text-lg font-bold text-green-500">$${tree.price}</h2>
                 <button class="btn btn-success btn-sm"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                </div>
                </div>
        `
        treesContainer.appendChild(card);
    });
};

loadAllTrees();
loadCategories();