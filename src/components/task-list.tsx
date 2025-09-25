import type { task } from "@/db/schema";

export function TaskList({ tasks }: { tasks: (typeof task.$inferSelect)[] }) {
  return (
    <>
      {tasks.length === 0 ? (
        <article>
          <p>No tasks yet. Add your first task above!</p>
        </article>
      ) : (
        <div>
          <h2>Your Tasks ({tasks.length})</h2>
          {tasks.map((t) => (
            <article key={t.id}>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <form
                  method="post"
                  action={`/app/tasks/${t.id}/toggle`}
                  style="margin: 0;"
                >
                  <input
                    type="checkbox"
                    checked={t.done}
                    onchange="this.form.submit()"
                    title={t.done ? "Mark as incomplete" : "Mark as complete"}
                  />
                </form>

                {/* Task name */}
                <div
                  style={`flex: 1; ${
                    t.done ? "text-decoration: line-through; opacity: 0.6;" : ""
                  }`}
                >
                  <strong>{t.name}</strong>
                  <br />
                  <small>
                    Created:{" "}
                    {new Date(t.createdAt ?? "N/A").toLocaleDateString()}
                    {t.updatedAt !== t.createdAt && (
                      <>
                        {" "}
                        • Updated:{" "}
                        {new Date(t.updatedAt ?? "N/A").toLocaleDateString()}
                      </>
                    )}
                  </small>
                </div>

                {/* Actions */}
                <div style="display: flex; gap: 0.5rem;">
                  <button
                    type="button"
                    className="outline"
                    data-target={`edit-modal-${t.id}`}
                    onclick={`document.getElementById('edit-modal-${t.id}').showModal()`}
                  >
                    Edit
                  </button>

                  <form
                    method="post"
                    action={`/app/tasks/${t.id}/delete`}
                    style="margin: 0;"
                  >
                    <button
                      type="submit"
                      className="outline secondary"
                      onclick="return confirm('Delete this task?')"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>

              <dialog id={`edit-modal-${t.id}`}>
                <article>
                  <header>
                    <button
                      type="button"
                      aria-label="Close"
                      rel="prev"
                      onclick={`document.getElementById('edit-modal-${t.id}').close()`}
                    ></button>
                    <h3>Edit Task</h3>
                  </header>

                  <form
                    method="post"
                    action={`/app/tasks/${t.id}/edit`}
                    style="display: flex; flex-direction: column; gap: 1rem;"
                  >
                    <label>
                      Task Name
                      <input
                        type="text"
                        name="name"
                        value={t.name}
                        required
                        autofocus
                      />
                    </label>

                    <footer style="display: flex; gap: 1rem; justify-content: flex-end;">
                      <button
                        type="button"
                        className="secondary"
                        onclick={`document.getElementById('edit-modal-${t.id}').close()`}
                      >
                        Cancel
                      </button>
                      <button type="submit">💾 Save Changes</button>
                    </footer>
                  </form>
                </article>
              </dialog>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
