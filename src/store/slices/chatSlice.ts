import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chatApi, ResponseMessage } from 'src/api/chatApi';

type ChatInitStateType = {
  count: number;
  messages: ResponseMessage[];
  isLoadingChat: boolean;
};

const initialState: ChatInitStateType = {
  count: 0,
  messages: [] as ResponseMessage[],
  isLoadingChat: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ResponseMessage>) => {
      state.messages.unshift(action.payload);
    },
    resetState: state => {
      state.messages = [];
      state.count = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        chatApi.endpoints.chatSendMessage.matchFulfilled,
        (state, { payload }) => {
          state.isLoadingChat = false;
          state.messages.unshift(payload);
        },
      )
      .addMatcher(chatApi.endpoints.chatSendMessage.matchPending, state => {
        state.isLoadingChat = true;
      })
      .addMatcher(chatApi.endpoints.chatSendMessage.matchRejected, state => {
        state.isLoadingChat = false;
      })
      .addMatcher(
        chatApi.endpoints.getChatMessages.matchFulfilled,
        (state, { payload }) => {
          if (state.messages.length) {
            state.count = payload.count;
            state.messages.push(...payload.rows);
          } else {
            state.count = payload.count;
            state.messages = payload.rows;
          }
        },
      )
      .addMatcher(chatApi.endpoints.chatClear.matchFulfilled, state => {
        state.count = 0;
        state.messages = [];
      });
  },
});
export const { addMessage, resetState } = chatSlice.actions;
