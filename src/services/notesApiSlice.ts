import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { NewNoteFormValues, NewNoteResponse, Note } from "../types/types";
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
    addNote: build.mutation<NewNoteResponse, NewNoteFormValues>({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ['Notes'],
    }),
    getNotes: build.query<Note[], void>({
      query: () => ({
        url: "/notes",
        method: "GET",
      }),
      providesTags: ['Notes'],
    })
  }),
});

export const { useAddNoteMutation, useGetNotesQuery } = notesApiSlice;

export default notesApiSlice;
