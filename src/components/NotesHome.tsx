import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewNoteFormValues } from "../types/types";
import {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
} from "../services/notesApiSlice";
import styles from "./NotesHome.module.scss";

const NotesHome: React.FC = () => {
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewNoteFormValues>();

  const { data: notes, isLoading } = useGetNotesQuery();
  const [addNote] = useAddNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

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

  const handleDelete = (noteId: number) => {
    deleteNote(noteId);
  };

  return (
    <div className={styles.container}>
      <div className={styles["container__header"]}>
        <h3>Your Notes</h3>
        <button onClick={() => setShowNewNoteForm(true)}>Add New Note</button>

        {showNewNoteForm && (
          <form
            className={styles["container__header__form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <button type="button" onClick={() => setShowNewNoteForm(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* List of Notes */}
      <ul className={styles["container__list"]}>
        {notes?.map((note) => (
          <li className={styles["container__list__item"]} key={note.id}>
            <h5>{note.title}</h5>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesHome;
