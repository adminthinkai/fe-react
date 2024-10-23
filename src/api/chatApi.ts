import { api } from 'src/api/api';

export type ChatSendData = {
  message: string;
};

export type ResponseMessage = {
  id?: string;
  message: string;
  role: 'assistant' | 'user';
  userId?: string;
  creationDate: string;
  lastUpdateDate?: string;
};
export type ChatDataResponse = {
  count: number;
  rows: ResponseMessage[];
};

export const chatApi = api.injectEndpoints({
  endpoints: builder => ({
    chatSendMessage: builder.mutation({
      query: (data: ChatSendData) => {
        console.log(data);
        let isExternal: any = localStorage.getItem('isExternal');

        isExternal = isExternal === 'true' ? false : true;

        let resultData: any = data;
        resultData.isInternal = isExternal;

        console.log('resultData ----->');
        console.log(resultData);

        return {
          url: '/chat/create-message',
          method: 'POST',
          body: resultData,
        };
      },
      invalidatesTags: ['Chat'],
    }),
    createChat: builder.mutation({
      query: () => {
        return {
          url: '/chat/create-chat',
          method: 'POST',
        };
      },
      invalidatesTags: ['Chat'],
    }),
    getChatMessages: builder.query<ChatDataResponse, { page?: number }>({
      query: ({ page }) => ({
        url: `/chat/get-messages?sortField=creationDate&sortDirection=DESC&page=${page}&size=10`,
        method: 'GET',
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
    }),
    chatClear: builder.mutation({
      query: () => {
        return {
          url: '/chat/clear-chat',
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Chat'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useChatSendMessageMutation,
  useGetChatMessagesQuery,
  useChatClearMutation,
  useCreateChatMutation,
} = chatApi;
