import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import InputBox from "../components/InputBox";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const client = generateClient<Schema>();

function Todo() {
  const { user, signOut } = useAuthenticator();

  const [contentValue, setContentValue] = useState("");
  const [isDone, setIsDone] = useState(true);
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items])
    });
  }, []);

  function createTodo(name: string, done: boolean) {
    if (!contentValue.trim()) return;
    try {
      client.models.Todo.create(
        { content: name, isDone: done },
      );
    } catch (e) {
      console.error("Create failed: ", e);
      alert("Create failed - check console (auth/config).");
    }
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }


  return (
    <div className="w-screen">
    <div className="bg-white min-h-screen w-1/2 justify-center p-6 text-black">
      <div className="space-y-4 w-auto items-center">
        <h1 className="text-black">{user?.signInDetails?.loginId?.slice(0, user?.signInDetails?.loginId.indexOf("@"))}'s todos</h1>
        <InputBox value={contentValue} onChange={setContentValue} />
        <FormGroup >
          <FormControlLabel required control={<Switch checked={isDone} onChange={(_, checked) => setIsDone(checked)} />} label="Completed?" />
        </FormGroup>

        <button onClick={() => createTodo(contentValue, isDone)} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50" disabled={!contentValue.trim()}>
          Add Todo
        </button>
      </div>

      <hr className="my-4 opacity-40" />

      {
        <ul className="mt-6 flex flex-wrap gap-4 list-none p-0">
          {todos.map((todo) => (
            <li key={todo.id} className="w-64 h-36 rounded-xl border border-gray-200 bg-white text-black shadow-sm p-4 flex flex-col justify-between overflow-hidden">
              <div className="font-medium truncate">{todo.content}</div>
              <div className="text-sm opacity-80">done: {String(todo.isDone)}</div>
              <button className="px-4 py-2 rounded bg-black text-white disabled:opacity-50" onClick={() => deleteTodo(todo.id)}>delete</button>
            </li>
          ))}
        </ul>
      }
        <button className="mt-8 px-4 py-2 rounded bg-black text-white" onClick={signOut}>Sign out</button>
    </div>
    </div>
  );
}

export default Todo;
