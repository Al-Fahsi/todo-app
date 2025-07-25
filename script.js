const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = input.value.trim();
  if (task !== "") {
    const li = document.createElement("li");
    li.textContent = task;
    list.appendChild(li);
    input.value = "";
  }
});
