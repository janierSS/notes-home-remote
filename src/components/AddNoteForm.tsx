import React, {useRef, useEffect} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./AddNoteForm.module.scss";
import { NewNoteFormValues } from "../types/types";
import { useAddNoteMutation } from "../services/notesApiSlice";
import { IoMdClose } from "react-icons/io";

type AddNoteFormProps = {
  setShowNewNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNoteForm: React.FC<AddNoteFormProps> = ({ setShowNewNoteForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewNoteFormValues>();

  const usernameRef = useRef<HTMLInputElement>(null);

  const [addNote] = useAddNoteMutation();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

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
    <div className={styles.container}>
      <div className={styles["container__header"]}>
        <h4 className={styles["container__header__text"]}>New Note</h4>
        <button type="button" onClick={() => setShowNewNoteForm(false)}>
          <IoMdClose size={24}/>
        </button>
      </div>
      <form
        className={styles["container__form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles["container__form__inputs"]}>
          <label>Title:</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            ref={usernameRef}
          />
          {errors.title && (
            <p className={styles["container__form__inputs__error"]}>{errors.title.message}</p>
          )}
        </div>
        <div className={styles["container__form__inputs"]}>
          <label>Content:</label>
          <textarea
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && (
            <p className={styles["container__form__inputs__error"]}>{errors.content.message}</p>
          )}
        </div>
        <button className={styles["container__form__button"]} type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddNoteForm;
