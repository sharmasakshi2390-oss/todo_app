import { useState } from "react";

function TodoItem({ todo, onEdit, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = () => {
    onEdit(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-3 shadow-lg hover:scale-[1.02] hover:shadow-2xl transition duration-300">

      {isEditing ? (
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded flex-1 mr-2"
        />
      ) : (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, todo.completed)}
          />

          <div>
            <p
              className={
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-white font-medium"
              }
            >
              {todo.title}
            </p>

            <p className="text-xs text-gray-300">
              {new Date(todo.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
            >
              Save
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setNewTitle(todo.title);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(todo.id)}
              className="bg-blue-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;