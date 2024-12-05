import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { DeleteNoteResponse, GetNotesResponse, NewNoteFormValues, NewNoteResponse, Note } from "../types/types";
import selectAuthReceipt from "myNotesHost/selectAuthReceipt";

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const state = api.getState()
  const authReceipt = selectAuthReceipt(state)
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json'),
      headers.set('authReceipt', authReceipt)
    }
  })
  const result = await rawBaseQuery(args, api, extraOptions)
  return result
}


const notesApiSlice = createApi({
  reducerPath: "notesApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Notes'],
  endpoints: (build) => ({
    getNotes: build.query<GetNotesResponse, void>({
      query: () => ({
        url: "/notes",
        method: "GET",
      }),
      providesTags: ['Notes'],
    }),
    addNote: build.mutation<NewNoteResponse, NewNoteFormValues>({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ['Notes'],
    }),
    deleteNote: build.mutation<DeleteNoteResponse, number>({
      query: (noteId) => ({
        url: `/notes/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Notes'],
    })
  }),
});

export const { useAddNoteMutation, useGetNotesQuery, useDeleteNoteMutation } = notesApiSlice;

export default notesApiSlice;
