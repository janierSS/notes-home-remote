import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewNoteFormValues } from "../types/types";
import {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
} from "../services/notesApiSlice";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import styles from "./NotesHome.module.scss";
import AddNoteForm from "./AddNoteForm";
import Modal from "./Modal";

const NotesHome: React.FC = () => {
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const { data: notes, isLoading } = useGetNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();


  const handleDelete = (noteId: number) => {
    deleteNote(noteId);
  };

  return (
    <div className={styles.container}>
      <div className={styles["container__header"]}>
        <h3>Your Notes</h3>
        <button
          className={styles["container__header__add"]}
          onClick={() => setShowNewNoteForm(true)}
        >
          <IoMdAdd size={32} />
        </button>

        {showNewNoteForm && (
          <Modal onClose={() => setShowNewNoteForm(false)}>
            <AddNoteForm setShowNewNoteForm={setShowNewNoteForm} />
          </Modal>
        )}
      </div>

      {/* List of Notes */}
      <ul className={styles["container__list"]}>
        {notes?.map((note) => (
          <li className={styles["container__list__item"]} key={note.id}>
            <div className={styles["container__list__item__text"]}>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
            <button onClick={() => handleDelete(note.id)}><MdDelete size={30}/></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesHome;
