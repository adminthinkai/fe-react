import { api } from 'src/api/api';
import { analyticUserType } from 'src/types/analyticTypes';

export type ResponseAnalyticType = {
  lastSixMonthNamed: Array<string>;
  lastSevenDaysNamed: Array<string>;
  totalUsersCount: number;
  statusActiveUsersCount: number;
  statusPendingUsersCount: number;
  statusBlockedUsersCount: number;
  activeUsersThisMonthCount: number;
  percentActiveUsers: number;
  newUsersThisMonth: number;
  newUsersInTheLastSixMonths: Array<number>;
  newUsersInTheLastSevenDays: Array<number>;
  signUpUsersThisMonth: number;
  signUpUsersInTheLastSixMonths: Array<number>;
  signUpUsersInTheLastSevenDays: Array<number>;
  createdClassesThisMonth: number;
  createdClassesInTheLastSixMonths: Array<number>;
  createdClassesInTheLastSevenDays: Array<number>;
  generatedContentThisMonth: number;
  generatedContentInTheLastSixMonths: Array<number>;
  generatedContentInTheLastSevenDays: Array<number>;
  lastUsersRequest: {
    count: number;
    rows: UsersLastRequests;
  };
  latestContentGeneration: {
    count: number;
    rows: LatestContents;
  };
  countryPercentages: {
    null: string;
    'United States': string;
  };
};

export type UsersLastRequests = Array<{
  id: string;
  message: string;
  userId: string;
  creationDate: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}>;

export type LatestContents = Array<{
  id: string;
  classId: string;
  creatorId?: string;
  content: string;
  creationDate: string;
  lastUpdateDate: string;
  creator?: {
    id: string;
    email: string;
    firstName: any;
    lastName: any;
  };
  class: {
    id: string;
    name: string;
    description: string;
  };
}>;

export const analyticsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAnalytics: builder.query<ResponseAnalyticType, any>({
      query: () => ({
        url: '/analytics/get-analytics-admin',
        method: 'GET',
      }),
      providesTags: ['Analytics'],
    }),
    getAnalyticsUser: builder.query<analyticUserType, any>({
      query: () => ({
        url: '/analytics/get-analytics-user',
        method: 'GET',
      }),
      providesTags: ['Analytics'],
    }),
  }),

  overrideExisting: true,
});

export const { useGetAnalyticsQuery, useGetAnalyticsUserQuery } = analyticsApi;
