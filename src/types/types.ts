export type Note = {
  id: number;
  userId: string;
  title: string;
  content: string;
};

export type NewNoteFormValues = {
  title: string;
  content: string;
};

export type NewNoteResponse = {
  message: string;
  note: Note;
};

export type GetNotesResponse = Note[]

export type DeleteNoteResponse = {
  message: string;
};
