import { api } from 'src/api/api';
import { classesCategories } from 'src/utils/classesConstants';

export type ClassCreateData = {
  name: string;
  description: string;
  prompt: string;
  category: (typeof classesCategories)[number];
  input1: string;
  input2?: string;
  input3?: string;
  input4?: string;
  placeholderInput1: string;
  placeholderInput2?: string;
  placeholderInput3?: string;
  placeholderInput4?: string;
  valueInput1?: string | null;
  valueInput2?: string | null;
  valueInput3?: string | null;
  valueInput4?: string | null;
  public: boolean;
  iconNumber: number;
};

export type HistoryListResp = {
  count: number;
  rows: Array<{
    classId: string;
    content: string;
    creationDate: string;
    creatorId: string;
    id: string;
    lastUpdateDate: string;
  }>;
};

export type ClassTypeResponse = ClassCreateData & {
  id: string;
  creationDate: string;
  lastUpdateDate: string;
  content: string;
};

export type ClassUpdate = ClassCreateData & {
  classId: string;
};

export type GenerateContentType = {
  valueInput1: string;
  valueInput2?: string;
  valueInput3?: string;
  valueInput4?: string;
  classId: string;
};

export const classesApi = api.injectEndpoints({
  endpoints: builder => ({
    getClassesList: builder.query<
      { rows: ClassTypeResponse[]; count: number },
      {
        page: number;
        size: number;
        category: (typeof classesCategories)[number];
      }
    >({
      query: ({ page, size, category }) => ({
        url: `/class/get-classes-list?&sortDirection=DESC&page=${page}&size=${size}&categories[]=${category}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (data, newData, otherArgs) => {
        if (otherArgs.arg.page === 1) {
          data.rows = [...newData.rows];
          return;
        }
        if (data.count > data.rows.length) {
          data.rows = [...data.rows, ...newData.rows];
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      providesTags: ['ClassesList'],
    }),
    createClass: builder.mutation({
      query: (data: ClassCreateData) => ({
        url: `/class/create-class`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ClassesList', 'Notifications'],
    }),
    getClassesById: builder.query<
      ClassTypeResponse,
      {
        id: string;
      }
    >({
      query: ({ id }) => ({
        url: `/class/get-class-by-id`,
        method: 'GET',
        params: {
          id,
        },
      }),
      providesTags: ['ClassById'],
    }),
    getHistoryClass: builder.query<
      HistoryListResp,
      {
        id: string;
      }
    >({
      query: ({ id }) => ({
        url: `/class/get-class-history`,
        method: 'GET',
        params: {
          sortDirection: 'DESC',
          page: 1,
          size: 10,
          classId: id,
        },
      }),
      providesTags: ['HistoryById'],
    }),
    updateClass: builder.mutation({
      query: (data: ClassUpdate) => ({
        url: `/class/update-class`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ClassById', 'HistoryById'],
    }),
    deleteClass: builder.mutation({
      query: ({ id }) => ({
        url: `/class/delete-class`,
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: ['ClassesList'],
    }),
    sendHelp: builder.mutation({
      query: (data: any) => ({
        url: `/auth/send-help-request`,
        method: 'POST',
        body: { message: data },
      }),
    }),
    generateClass: builder.mutation({
      query: (data: GenerateContentType) => ({
        url: `/class/generate-content`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ClassById', 'HistoryById'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetClassesListQuery,
  useCreateClassMutation,
  useGetClassesByIdQuery,
  useUpdateClassMutation,
  useSendHelpMutation,
  useDeleteClassMutation,
  useGenerateClassMutation,
  useGetHistoryClassQuery,
} = classesApi;
