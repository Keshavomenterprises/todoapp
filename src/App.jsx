import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
          Tasks
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {completedCount} / {todos.length} completed
        </p>
      </header>

      <TodoInput addTodo={addTodo} />

      <div className="todo-list" style={{ marginTop: '1.5rem' }}>
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '1rem' }}>
            No tasks yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

//you added som e code 

export default App;
