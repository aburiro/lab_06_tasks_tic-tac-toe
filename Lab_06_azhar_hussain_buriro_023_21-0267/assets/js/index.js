// Function to retrieve todos from localStorage
function getTodos() {
    const todosJSON = localStorage.getItem('todos');
    return todosJSON ? JSON.parse(todosJSON) : [];
}

// Function to save todos to localStorage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to render todos
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const todos = getTodos();

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;

        if (todo.completed) {
            li.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteTodo(index);
        });

        li.appendChild(deleteButton);

        li.addEventListener('click', () => {
            toggleCompleted(index);
        });

        todoList.appendChild(li);
    });
}

// Function to add a new todo
function addTodo(text) {
    const todos = getTodos();
    todos.push({ text, completed: false });
    saveTodos(todos);
    renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

// Function to toggle completed status
function toggleCompleted(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos();
}

// Event listener for the form submission
const todoForm = document.getElementById('todo-form');
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoInput = document.getElementById('todo-input');
    const text = todoInput.value.trim();
    if (text !== '') {
        addTodo(text);
        todoInput.value = '';
    }
});

// Initial rendering of todos
renderTodos();
