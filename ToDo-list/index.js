const input = document.querySelector("#input");
const btn = document.querySelector('button');
const list = document.querySelector(".lists");
const promptt = document.querySelector('h4');

function createTodoItem(text) {
  const listSub = document.createElement("div");
  listSub.classList.add("list-sub");
  
  const myticks = document.createElement("div");
  myticks.classList.add("mytick");
  
  const img = document.createElement("img");
  img.src = "Images/notick-circle.svg";
  img.classList.add("notick");
  
  const img2 = document.createElement("img");
  img2.src = "Images/tick-circle.svg";
  img2.classList.add("tick", "display");
  
  const p = document.createElement("p");
  p.innerHTML = text;
  
  myticks.append(img, img2, p);
  
  const img3 = document.createElement("img");
  img3.src = "Images/close-circle.svg";
  img3.classList.add("remove");
  
  listSub.append(myticks, img3);
  
  attachEventListeners(listSub);
  
  return listSub;
}

function attachEventListeners(listSub) {
  const myticks = listSub.querySelector(".mytick");
  
  const removeBtn = listSub.querySelector(".remove");
  
  myticks.addEventListener("click", () => {
    myticks.querySelector(".notick").classList.toggle("tick");
    myticks.querySelector(".display").classList.toggle("tick");
    
    store();
  });
  
  removeBtn.addEventListener("click", () => {
    listSub.remove();
    store();
  });
}

function myclick() {
  if (input.value === "") {
    promptt.style.display = "initial";
    setTimeout(() => {
      promptt.style.display = "none";
    }, 1000);
  } else {
    const newItem = createTodoItem(input.value);
    list.appendChild(newItem);
    input.value = "";
    store();
  }
}
btn.addEventListener('click', myclick);

function store() {
  localStorage.setItem("Data", list.innerHTML);
}

function retrieve() {
  const storedData = localStorage.getItem("Data");
  if (storedData) {
    list.innerHTML = storedData;
    list.querySelectorAll(".list-sub").forEach(attachEventListeners);
  }
}

retrieve();
