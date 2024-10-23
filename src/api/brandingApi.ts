import { api } from 'src/api/api';
import { StylesBranding } from 'src/enum';

export type ChangeBrandingResponse = {
  name?: string;
  primaryColor?: string;
  backgroundColorType?: StylesBranding;
  backgroundColorFirst?: string;
  backgroundColorSecond?: string;
  usingInternalData: boolean;
  id?: string;
};

export type BrandingResp = {
  name: string;
  primaryColor: string;
  backgroundColorType: StylesBranding;
  backgroundColorFirst: string;
  backgroundColorSecond: string;
  usingInternalData: boolean;
  id: string;
  creationDate: string;
  lastUpdateDate: string;
  logo: null | {
    id: string;
    name: string;
    key: string;
    url: string;
    mimetype: string;
    size: number;
    appLogoId: string;
    creationDate: string;
    lastUpdateDate: string;
  };
};

export const brandingApi = api.injectEndpoints({
  endpoints: builder => ({
    getBranding: builder.query<BrandingResp, any>({
      query: () => ({
        url: '/app/get-app-branding',
        method: 'GET',
      }),
      providesTags: ['Branding'],
    }),
    changeBranding: builder.mutation({
      query: (data: ChangeBrandingResponse) => {
        return {
          url: data.id ? '/app/update-app-branding' : 'app/create-app-branding',
          method: data.id ? 'PATCH' : 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Branding'],
    }),
    changeToggle: builder.mutation({
      query: (data: ChangeBrandingResponse) => {
        return {
          url: data.id ? '/app/update-app-branding' : 'app/create-app-branding',
          method: data.id ? 'PATCH' : 'POST',
          body: data,
        };
      },
    }),
    createBranding: builder.mutation({
      query: (data: ChangeBrandingResponse) => {
        return {
          url: 'app/create-app-branding',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Branding'],
    }),
    uploadLogo: builder.mutation({
      query: (data: FormData) => {
        return {
          url: '/app/upload-logo',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['Branding'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBrandingQuery,
  useChangeBrandingMutation,
  useUploadLogoMutation,
  useChangeToggleMutation,
} = brandingApi;
