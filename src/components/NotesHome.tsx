import React, { useEffect, useState } from "react";
import {
  useDeleteNoteMutation,
  useGetNotesQuery,
} from "../services/notesApiSlice";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddNoteForm from "./AddNoteForm";
import Modal from "./Modal";
import styles from "./NotesHome.module.scss";

const NotesHome: React.FC = () => {
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const { data: notes, isLoading } = useGetNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();

  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    if(notes?.length === 0) {
      setPulse(true)
    }
  }, [notes])

  const handleDelete = (noteId: number) => {
    deleteNote(noteId);
    setPulse(false)
  };

  const handleOpenForm = () => {
    setShowNewNoteForm(true)
    setPulse(false)
  }

  const handleCloseForm = () => {
    setShowNewNoteForm(false)
    setPulse(notes?.length === 0)
  }

  return (
    <div className={styles.container}>
      <div className={styles["container__header"]}>
        <button
          className={`${styles["container__header__add"]} ${pulse && styles["container__header__add--pulse"]}` }
          onClick={handleOpenForm}
        >
          <IoMdAdd size={40} />
        </button>

        {showNewNoteForm && (
          <Modal onClose={handleCloseForm}>
            <AddNoteForm setShowNewNoteForm={setShowNewNoteForm} />
          </Modal>
        )}
      </div>

      {/* List of Notes */}
      {notes?.length > 0 ? <ul className={styles["container__list"]}>
        {notes?.map((note) => (
          <li className={styles["container__list__item"]} key={note.id}>
            <div className={styles["container__list__item__text"]}>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
            <button onClick={() => handleDelete(note.id)}>
              <MdDelete size={30} />
            </button>
          </li>
        ))}
      </ul> : <p className={styles["container__empty"]}>Start adding some notes!</p>}
    </div>
  );
};

export default NotesHome;
