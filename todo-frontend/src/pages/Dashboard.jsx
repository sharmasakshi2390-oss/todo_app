
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

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
  if (!title.trim()) {
    return;
  }

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

  const updateTodo = async (id, newTitle) => {
if (!newTitle.trim()) return;

try {
await api.patch(
`/todos/${id}`,
{ title: newTitle },
{
headers: {
Authorization: `Bearer ${token}`,
},
});

 getTodos();
  } catch (error) {
    console.log(error);
  }
};

const toggleTodo = async (id, completed) => {
  try {
    await api.patch(
      `/todos/${id}`,
      { completed: !completed },
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
    setEditName(res.data.fullname);
    setEditEmail(res.data.email);
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async () => {
  try {
    await api.patch(
      "/users/profile",
      {
        fullname: editName,
        email: editEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getProfile();
  } catch (error) {
    console.log(error);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-8 relative overflow-hidden">
    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

  <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
    <div className="max-w-4xl mx-auto">

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome {user ? user.fullname : "User"} 👋
          </h1>
          </div>

          <div className="flex gap-3">

           <div className="bg-white rounded-2xl p-4 w-72 shadow-xl">

  <h2 className="font-semibold mb-3 text-gray-800">
    👤 Edit Profile
  </h2>

  <input
    type="text"
    value={editName}
    onChange={(e) => setEditName(e.target.value)}
    className="w-full p-2 rounded-lg mb-2 border border-gray-300"
    placeholder="Full Name"
  />

  <input
    type="email"
    value={editEmail}
    onChange={(e) => setEditEmail(e.target.value)}
    className="w-full p-2 rounded-lg mb-2 border border-gray-300"
    placeholder="Email"
  />

  <button
    onClick={updateProfile}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
  >
    Save Profile
  </button>

</div>
<button
  onClick={handleLogout}
  className="self-start bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-3 rounded-xl hover:scale-105 transition shadow-lg"
>
  Logout
</button>
        </div>
        </div>

        {/* User Summary */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white mb-5 border border-white/20">
          <p><strong>Name:</strong> {user?.fullname}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Total Todos:</strong> {todos.length}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">

  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center">
    <h3 className="text-gray-300">Total</h3>
    <p className="text-3xl font-bold text-white">
      {todos.length}
    </p>
  </div>

  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center">
    <h3 className="text-gray-300">Completed</h3>
    <p className="text-3xl font-bold text-green-400">
      {todos.filter(todo => todo.completed).length}
    </p>
  </div>

  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center">
    <h3 className="text-gray-300">Pending</h3>
    <p className="text-3xl font-bold text-yellow-400">
      {todos.filter(todo => !todo.completed).length}
    </p>
  </div>

</div>

        {/* Add Todo */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Enter Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <button
  onClick={addTodo}
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition"
>
  Add Todo
</button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Todo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white mb-5"
        />

        {/* Todos */}
        {todos.length === 0 ? (
          <p className="text-white">No Todos Yet</p>
        ) : (
          <ul>
            {todos
              .filter((todo) =>
                todo.title
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onEdit={updateTodo}
                  onDelete={deleteTodo}
                  onToggle={toggleTodo}
                />
              ))}
          </ul>
        )}

      </div>
    </div>
  </div>
)};

export default Dashboard;