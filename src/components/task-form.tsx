export function TaskForm() {
  return (
    <>
      <hgroup>
        <h1>Todo List</h1>
        <p>Simple task management</p>
      </hgroup>

      <form method="post" action="/app/tasks">
        <fieldset>
          <legend>Add New Task</legend>
          <input
            type="text"
            name="name"
            placeholder="Enter task name..."
            required
            autofocus
          />
          <button type="submit">Add Task</button>
        </fieldset>
      </form>
    </>
  );
}
