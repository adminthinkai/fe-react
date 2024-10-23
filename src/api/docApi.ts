import { api } from 'src/api/api';

export type DocumentType = {
  id: string;
  name: string;
  key: string;
  url: string;
  mimetype: string;
  size: number;
  creationDate: string;
  lastUpdateDate: string;
};

export type DocsTypeResponse = {
  count: number;
  maxSize: number;
  minSize: number;
  rows: Array<DocumentType>;
};

export type DocsPayloadType = {
  page: number;
  startSize?: number;
  endSize?: number;
  startCreationDate?: Date;
  endCreationDate?: Date;
  keySearchValue?: string;
  types?: string[];
};

export const docApi = api.injectEndpoints({
  endpoints: builder => ({
    getDocs: builder.query<DocsTypeResponse, DocsPayloadType>({
      query: ({
        page,
        startSize,
        endSize,
        startCreationDate,
        endCreationDate,
        keySearchValue,
        types,
      }) => ({
        url: `/file/get-files`,
        method: 'GET',
        params: {
          sortField: 'id',
          sortDirection: 'DESC',
          startSize,
          endSize,
          startCreationDate,
          endCreationDate,
          page,
          size: 10,
          keySearchValue,
          'types[]': types,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (data, newData, otherArgs) => {
        if (otherArgs.arg.page === 1) {
          data.count = newData.count;
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
      providesTags: ['Documents'],
    }),
    uploadDocs: builder.mutation({
      query: (files: []) => {
        const formData = new FormData();
        files.forEach(file => {
          formData.append('files[]', file);
        });

        return {
          url: '/file/upload-file',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Documents'],
    }),
    deleteDoc: builder.mutation({
      query: (id: string) => {
        return {
          url: '/file/delete-file',
          method: 'DELETE',
          params: {
            id,
          },
        };
      },
      invalidatesTags: ['Documents'],
    }),
  }),
  overrideExisting: true,
});

export const { useUploadDocsMutation, useGetDocsQuery, useDeleteDocMutation } = docApi;
