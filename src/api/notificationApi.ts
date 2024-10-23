import { api } from 'src/api/api';

type NotificationList = {
  count: number;
  rows: Array<Notification>;
};

type Notification = {
  id: string;
  text: string;
  isViewed: boolean;
  classId: string;
  userId: string;
};

export const notificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getUnreadNotificationCount: builder.query<number, any>({
      query: () => ({
        url: 'notifications/get-notifications-count',
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),
    getNotificationList: builder.query<NotificationList, any>({
      query: () => ({
        url: 'notifications/get-notifications?sortField=id&sortDirection=DESC&page=1&size=10',
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),
    clearNotifications: builder.query<NotificationList, any>({
      query: () => ({
        url: 'notifications/clear-notifications',
        method: 'DELETE',
      }),
      providesTags: ['Notifications'],
    }),
    deleteNotification: builder.mutation<NotificationList, any>({
      query: (id: string) => ({
        url: `notifications/delete-notification?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotificationListQuery,
  useGetUnreadNotificationCountQuery,
  useClearNotificationsQuery,
  useDeleteNotificationMutation,
} = notificationApi;
