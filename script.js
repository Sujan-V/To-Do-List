const todoList = document.getElementById("todoList");
const newTodoInput = document.getElementById("newToDoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const downloadBtn = document.getElementById("downloadBtn");
const themeToggle = document.getElementById("themeToggle");
const filterBtns = document.querySelectorAll(".filter");

let todos = [];

function renderTodos(filter = "all") {
  todoList.innerHTML = "";
  const filtered = todos.filter(todo =>
    filter === "all" ? true : filter === "completed" ? todo.done : !todo.done
  );

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.done ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleDone(${index})">${todo.text}</span>
      <button onclick="deleteTodo(${index})">❌</button>
    `;

    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = newTodoInput.value.trim();
  if (text === "") return;

  todos.push({ text, done: false });
  newTodoInput.value = "";
  renderTodos(getCurrentFilter());
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(getCurrentFilter());
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  renderTodos(getCurrentFilter());
}

function downloadTodos() {
  const content = todos.map(t => `${t.done ? "[x]" : "[ ]"} ${t.text}`).join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "todo-list.txt";
  a.click();
}

function getCurrentFilter() {
  const activeBtn = document.querySelector(".filter.active");
  return activeBtn ? activeBtn.dataset.filter : "all";
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    renderTodos(btn.dataset.filter);
  });
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

addTodoBtn.addEventListener("click", addTodo);
downloadBtn.addEventListener("click", downloadTodos);
