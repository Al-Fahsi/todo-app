document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const duration = document.getElementById("duration").value;
  const status = document.getElementById("status").value;

  if (title && duration > 0) {
    const taskList = document.getElementById("task-list");

    const task = document.createElement("div");
    task.className = "task";
    task.innerHTML = `
      <strong>${title}</strong>
      <span><strong>Kategorie:</strong> ${category}</span>
      <span><strong>Dauer:</strong> ${duration} Minuten</span>
      <span><strong>Status:</strong> ${status}</span>
    `;

    taskList.appendChild(task);

    document.getElementById("todo-form").reset();
  }
});
