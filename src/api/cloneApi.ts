import { api } from 'src/api/api';
import { InitialValuesTypeInvite } from 'src/components/InviteAdmin/InviteAdmin';

export const cloneApi = api.injectEndpoints({
  endpoints: builder => ({
    createCloneApp: builder.mutation({
      query: (data: InitialValuesTypeInvite) => ({
        url: '/clone/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateCloneAppMutation } = cloneApi;
