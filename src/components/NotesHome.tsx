import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewNoteFormValues } from "../types/types";
import { useAddNoteMutation } from "../services/notesApiSlice";

const NotesHome: React.FC = () => {
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewNoteFormValues>();

  const [addNote] = useAddNoteMutation();

  const onSubmit: SubmitHandler<NewNoteFormValues> = (data) => {
    const newNote: NewNoteFormValues = {
      title: data.title,
      content: data.content,
    };
    addNote(newNote)
      .then((resp) => {
        if (resp.data.message === "Note added") {
          reset();
          setShowNewNoteForm(false);
        }
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div>
      <h3>Your Notes</h3>
      <button onClick={() => setShowNewNoteForm(true)}>Add New Note</button>

      {showNewNoteForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              Title:
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
              />
            </label>
            {errors.title && (
              <p style={{ color: "red" }}>{errors.title.message}</p>
            )}
          </div>
          <div>
            <label>
              Content:
              <textarea
                {...register("content", { required: "Content is required" })}
              />
            </label>
            {errors.content && (
              <p style={{ color: "red" }}>{errors.content.message}</p>
            )}
          </div>
          <button type="submit">Save Note</button>
          <button
            type="button"
            onClick={() => setShowNewNoteForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* List of Notes */}
      {/* <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default NotesHome;
