import React, { useEffect } from "react";
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
    setFocus,
    watch,
    formState: { errors },
  } = useForm<NewNoteFormValues>();

  const [addNote] = useAddNoteMutation();

  const textValue = watch("content", "");
  const maxLength = 100;
  const remainingChars = maxLength - textValue.length;

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

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
          <IoMdClose size={24} />
        </button>
      </div>
      <form
        className={styles["container__form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles["container__form__inputs"]}>
          <label htmlFor="title">Title:</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className={styles["container__form__inputs"]}>
          <label htmlFor="content">Content:</label>
          <textarea
            {...register("content", {
              required: "Content is required",
            })}
            maxLength={maxLength}
            rows={2}
            cols={50}
            id="content"
          />
          <div className={styles["container__form__inputs__counter"]}>
            <p className={errors.content && styles.show}>{errors.content?.message}</p>
            <span>{remainingChars}</span>
          </div>
        </div>
        <button className={styles["container__form__button"]} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddNoteForm;
