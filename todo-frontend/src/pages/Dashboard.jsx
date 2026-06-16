
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getTodos = async () => {
    try {
      const res = await api.get("/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    try {
      await api.post(
        "/todos",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id, oldTitle) => {
    const newTitle = prompt("Update Todo", oldTitle);

    if (!newTitle) return;

    try {
      await api.patch(
        `/todos/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
  try {
    const res = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    getTodos();
    getProfile();
  }, []);

  return (
  <div className="max-w-3xl mx-auto mt-10 p-5">
    
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-2xl font-bold">
        Welcome {user ? user.fullname : "User"}
      </h1>

      <button
        onClick={handleLogout}
        className="border px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    <div className="flex gap-2 mb-5">
      <input
        type="text"
        placeholder="Enter Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded flex-1"
      />

      <button
        onClick={addTodo}
        className="border px-4 rounded"
      >
        Add Todo
      </button>
    </div>

    {todos.length === 0 ? (
      <p>No Todos Yet</p>
    ) : (
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-3 mb-2 rounded"
          >
            <span>{todo.title}</span>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateTodo(todo.id, todo.title)
                }
                className="border px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="border px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default Dashboard;