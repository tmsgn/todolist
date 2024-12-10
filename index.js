const input = document.getElementById("input");
const add = document.getElementById("add");
const task = document.getElementById("todos");

add.addEventListener("click", () => {
  if (input.value === '') {
    window.alert("please add task");
  } else {
    addtask(input.value);
    savedata();
  }
});

function addtask(tasks) {
  const li = document.createElement("li");
  const radio = document.createElement("input");
  radio.type = "radio";
  const span = document.createElement("span");
  const editimg = document.createElement("img");
  const dimg = document.createElement("img");

  dimg.src = "delte.png";
  editimg.src = "edit.png";
  editimg.classList.add("edit");
  span.appendChild(dimg);
  li.textContent = tasks;

  li.prepend(radio);
  span.appendChild(editimg);
  li.appendChild(span);
  task.appendChild(li);

  input.value = "";

  li.addEventListener("click", () => {
    radio.checked = true;
    li.style.textDecoration = "line-through";
    savedata();
  });

  span.addEventListener("click", () => {
    li.remove();
    savedata();
  });

  editimg.addEventListener("click", () => {
    input.value = li.textContent;
    li.remove();
    savedata();
  });
}

function savedata() {
  localStorage.setItem("data", task.innerHTML);
}

function showtask() {
  task.innerHTML = localStorage.getItem("data");

  const li = task.querySelectorAll("li");
  li.forEach(item => {
    const radio = item.querySelector("input[type='radio']");
    const span = item.querySelector("span");
    const dimg = span.querySelector("img[src='delte.png']");
    const editimg = span.querySelector("img[src='edit.png']");

    item.addEventListener("click", () => {
      if(radio.checked===true){
      radio.checked = false;
      item.style.textDecoration = "none";
      }
      else{
      radio.checked = true;
      item.style.textDecoration = "line-through";
      }
      savedata();
      
    });

    dimg.addEventListener("click", () => {
      item.remove();
      savedata();
    });

    editimg.addEventListener("click", () => {
      input.value = item.textContent;
      item.remove();
      savedata();
    });
  });
}

showtask();