import React, { useEffect, useState } from 'react';
import { ButtonNav } from 'src/components/ButtonNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths, UserRole } from 'src/enum';
import { BrandingSVG, ChartSVG, UsersSVG } from 'src/assets/svg';
import { BrandingResp, useChangeToggleMutation } from 'src/api/brandingApi';
import { useGetMeQuery } from 'src/api/usersApi';
import { Switcher } from 'src/components/Switch/Switcher';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { BasicModal } from './BasicModal';

type NavigationMenuProps = {
  branding?: BrandingResp;
};

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ branding: data }) => {
  const [isHide, setHide] = useState<boolean>(true);
  const [isExternalData, setIsExternalData] = useState<boolean>(
    data?.usingInternalData || false,
  );
  const [updateBrand, brandingInfo] = useChangeToggleMutation();

  const user = useGetMeQuery({});
  const navigation = useNavigate();
  const { pathname } = useLocation();

  const onChangeToggle = () => {
    localStorage.setItem('isExternal', JSON.stringify(!isExternalData));
    setIsExternalData(!isExternalData);
  };

  useEffect(() => {
    if (brandingInfo.data && brandingInfo.isSuccess) {
      setIsExternalData(brandingInfo.data?.usingInternalData);
    }
  }, [brandingInfo.data, brandingInfo.isSuccess]);

  const isMangerActive =
    pathname === Paths.USERS ||
    pathname === Paths.BRANDING ||
    pathname === Paths.CHAT_AI ||
    pathname === Paths.ANALYTICS;

  const onShowMangerHandler = () => {
    setHide(!isHide);
  };

  return (
    <div>
      <div className="text-white opacity-50 text-lg pl-6 font-normal pb-4 font-['Lato']">
        Dashboard
      </div>
      <div className="flex flex-col gap-4 pl-5 pr-6">
        <ButtonNav
          onClick={() => navigation(Paths.CLASSES)}
          active={pathname.includes(Paths.CLASSES)}
          color={data ? data.primaryColor : ''}
          visible="visible"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.557 10.5H4.682C4.16859 10.4971 3.6772 10.2911 3.3152 9.92703C2.95319 9.56297 2.74999 9.07042 2.75 8.557V4.682C2.75 4.1696 2.95355 3.67819 3.31587 3.31587C3.67819 2.95355 4.1696 2.75 4.682 2.75H8.557C9.07032 2.74999 9.56277 2.95322 9.92668 3.31526C10.2906 3.67729 10.4964 4.16868 10.499 4.682V8.557C10.499 9.07205 10.2944 9.56601 9.9302 9.9302C9.56601 10.2944 9.07205 10.499 8.557 10.499M8.557 21.25H4.682C4.42829 21.25 4.17706 21.2 3.94266 21.1029C3.70825 21.0058 3.49527 20.8635 3.31587 20.6841C3.13647 20.5047 2.99416 20.2917 2.89706 20.0573C2.79997 19.8229 2.75 19.5717 2.75 19.318V15.443C2.74999 14.9297 2.95322 14.4372 3.31526 14.0733C3.67729 13.7094 4.16868 13.5036 4.682 13.501H8.557C9.07205 13.501 9.56601 13.7056 9.9302 14.0698C10.2944 14.434 10.499 14.9279 10.499 15.443V19.318C10.4964 19.8313 10.2906 20.3227 9.92668 20.6847C9.56277 21.0468 9.07032 21.25 8.557 21.25ZM19.318 21.25H15.443C14.9297 21.25 14.4372 21.0468 14.0733 20.6847C13.7094 20.3227 13.5036 19.8313 13.501 19.318V15.443C13.5013 14.928 13.706 14.4342 14.0701 14.0701C14.4342 13.706 14.928 13.5013 15.443 13.501H19.318C19.8313 13.5036 20.3227 13.7094 20.6847 14.0733C21.0468 14.4372 21.25 14.9297 21.25 15.443V19.318C21.25 19.8304 21.0464 20.3218 20.6841 20.6841C20.3218 21.0465 19.8304 21.25 19.318 21.25Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.3674 10.183V3.06698M13.8164 6.61698H20.9324"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
          </svg>
          <span>Classes</span>
        </ButtonNav>
        <ButtonNav
          onClick={() => navigation(Paths.HISTORY)}
          color={data ? data.primaryColor : ''}
          active={pathname.includes(Paths.HISTORY)}
          visible="visible"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_2161_1048)">
              <path
                d="M11.9987 6.55371C11.8219 6.55371 11.6523 6.62395 11.5273 6.74897C11.4023 6.874 11.332 7.04357 11.332 7.22038V13.0337L15.2654 15.7004C15.413 15.7941 15.5916 15.8261 15.7626 15.7895C15.9336 15.7528 16.0833 15.6504 16.1795 15.5043C16.2757 15.3583 16.3107 15.1803 16.2769 15.0087C16.243 14.8371 16.1431 14.6857 15.9987 14.587L12.6654 12.327V7.22038C12.6654 7.04357 12.5951 6.874 12.4701 6.74897C12.3451 6.62395 12.1755 6.55371 11.9987 6.55371Z"
                fill="white"
              />
              <path
                d="M11.9987 1.33301C10.0942 1.33968 8.22581 1.85329 6.58552 2.82106C4.94522 3.78884 3.59216 5.17588 2.66536 6.83967V3.46634C2.66536 3.28953 2.59513 3.11996 2.4701 2.99494C2.34508 2.86991 2.17551 2.79967 1.9987 2.79967C1.82189 2.79967 1.65232 2.86991 1.52729 2.99494C1.40227 3.11996 1.33203 3.28953 1.33203 3.46634V9.33301H7.1987C7.37551 9.33301 7.54508 9.26277 7.6701 9.13775C7.79513 9.01272 7.86537 8.84315 7.86537 8.66634C7.86537 8.48953 7.79513 8.31996 7.6701 8.19494C7.54508 8.06991 7.37551 7.99967 7.1987 7.99967H3.56536C4.40619 6.22514 5.78528 4.761 7.5064 3.81563C9.22751 2.87025 11.203 2.4918 13.1516 2.73414C15.1003 2.97647 16.9228 3.82724 18.36 5.16537C19.7971 6.5035 20.7756 8.26082 21.1562 10.1873C21.5367 12.1137 21.3 14.1111 20.4797 15.8952C19.6593 17.6793 18.2972 19.1592 16.5871 20.1243C14.877 21.0895 12.906 21.4906 10.9547 21.2708C9.00341 21.0509 7.17115 20.2212 5.7187 18.8997C5.65391 18.8406 5.57812 18.7948 5.49565 18.765C5.41318 18.7352 5.32565 18.7219 5.23806 18.726C5.15046 18.73 5.06451 18.7512 4.98513 18.7885C4.90574 18.8257 4.83446 18.8782 4.77536 18.943C4.71627 19.0078 4.67051 19.0836 4.64071 19.1661C4.61091 19.2485 4.59764 19.3361 4.60166 19.4236C4.60568 19.5112 4.62692 19.5972 4.66416 19.6766C4.7014 19.756 4.75391 19.8272 4.8187 19.8863C6.10013 21.0532 7.64661 21.8903 9.32431 22.3252C11.002 22.76 12.7604 22.7795 14.4473 22.3819C16.1342 21.9844 17.6989 21.1817 19.0058 20.0435C20.3128 18.9053 21.3227 17.4657 21.9482 15.8494C22.5737 14.2331 22.796 12.4887 22.5957 10.7671C22.3955 9.04561 21.7787 7.39882 20.7989 5.96924C19.8191 4.53967 18.5056 3.37038 16.9723 2.56256C15.4389 1.75474 13.7318 1.33272 11.9987 1.33301Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2161_1048">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span>History</span>
        </ButtonNav>
        {(user.data?.role === UserRole.ADMIN ||
          user.data?.role === UserRole.SUPERADMIN) && (
          <Accordion
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              '&::before': {
                backgroundColor: 'transparent',
              },
              '&.Mui-expanded': {
                margin: '0 !important',
              },
            }}
          >
            <AccordionSummary
              sx={{
                padding: 0,
                margin: 0,
                '.MuiAccordionSummary-content': {
                  margin: 0,
                },
                '&.Mui-expanded': {
                  margin: '0 !important',
                },
              }}
            >
              <ButtonNav
                color={data ? data.primaryColor : ''}
                active={isMangerActive}
                onClick={onShowMangerHandler}
                visible={
                  user.data?.role === UserRole.ADMIN ||
                  user.data?.role === UserRole.SUPERADMIN
                    ? 'visible'
                    : 'none'
                }
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.615 19C4.155 19 3.771 18.846 3.463 18.538C3.155 18.23 3.00067 17.8457 3 17.385V6.615C3 6.155 3.15433 5.771 3.463 5.463C3.77167 5.155 4.15567 5.00067 4.615 5H8.925C9.14033 5 9.34967 5.04333 9.553 5.13C9.75633 5.218 9.93033 5.33433 10.075 5.479L11.596 7H19.385C19.845 7 20.229 7.15433 20.537 7.463C20.845 7.77167 20.9993 8.15567 21 8.615V10.308C21 10.45 20.9523 10.5687 20.857 10.664C20.7617 10.7593 20.6427 10.8073 20.5 10.808C20.3573 10.8087 20.2383 10.7607 20.143 10.664C20.0477 10.5673 20 10.4487 20 10.308V8.615C20 8.46167 19.936 8.32067 19.808 8.192C19.68 8.06333 19.539 7.99933 19.385 8H11.195L9.195 6H4.615C4.43567 6 4.28833 6.05767 4.173 6.173C4.05767 6.28833 4 6.43567 4 6.615V17.385C4 17.5383 4.064 17.6793 4.192 17.808C4.32 17.9367 4.461 18.0007 4.615 18H11.346C11.4887 18 11.6077 18.0477 11.703 18.143C11.7983 18.2383 11.846 18.3573 11.846 18.5C11.846 18.6427 11.7983 18.7617 11.703 18.857C11.6077 18.9523 11.4887 19 11.346 19H4.615ZM14.231 20.192V19.12C14.231 19.0127 14.2497 18.9127 14.287 18.82C14.3243 18.7273 14.3863 18.6373 14.473 18.55L19.563 13.484C19.6623 13.3853 19.765 13.3187 19.871 13.284C19.9777 13.2493 20.0843 13.232 20.191 13.232C20.301 13.232 20.4123 13.2533 20.525 13.296C20.6377 13.3387 20.737 13.403 20.823 13.489L21.748 14.434C21.83 14.5327 21.8927 14.635 21.936 14.741C21.9793 14.847 22.0007 14.9537 22 15.061C21.9993 15.1683 21.9787 15.2757 21.938 15.383C21.8973 15.4903 21.834 15.5937 21.748 15.693L16.683 20.759C16.5957 20.8457 16.5057 20.9077 16.413 20.945C16.3203 20.9823 16.22 21.001 16.112 21.001H15.038C14.806 21.001 14.6137 20.9243 14.461 20.771C14.3083 20.6177 14.2317 20.425 14.231 20.193M15.115 20.116H16.065L19.533 16.643L19.063 16.168L18.608 15.68L15.115 19.166V20.116ZM19.063 16.168L18.608 15.68L19.533 16.643L19.063 16.168Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span>Manage</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.9263 4.74167C1.59953 5.06843 1.59953 5.59823 1.9263 5.925L7.2942 11.2929C7.68472 11.6834 8.31788 11.6834 8.70841 11.2929L14.0763 5.925C14.4031 5.59823 14.4031 5.06843 14.0763 4.74167C13.7495 4.4149 13.2197 4.4149 12.893 4.74167L8.0013 9.63333L3.10963 4.74167C2.78287 4.4149 2.25307 4.4149 1.9263 4.74167Z"
                    fill="white"
                  />
                </svg>
              </ButtonNav>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <div className={` overflow-hidden  pl-10`}>
                <button
                  onClick={() => navigation(Paths.BRANDING)}
                  type="button"
                  className={`${pathname === Paths.BRANDING ? 'opacity-100' : 'opacity-50'} justify-center items-center text-white flex gap-4 align-middle  p-4 text-lg font-normal font-['Lato']`}
                >
                  <BrandingSVG />
                  <span>Branding</span>
                </button>
                <button
                  onClick={() => navigation(Paths.ANALYTICS)}
                  type="button"
                  className={`${pathname === Paths.ANALYTICS ? 'opacity-100' : 'opacity-50'} justify-center items-center text-white flex gap-4 align-middle  p-4 text-lg font-normal font-['Lato']`}
                >
                  <ChartSVG />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={onChangeToggle}
                  type="button"
                  style={{
                    opacity: isExternalData ? 1 : 0.5,
                  }}
                  className={`justify-center items-center text-white flex gap-4 align-middle  p-4 text-lg font-normal font-['Lato']`}
                >
                  <Switcher checked={isExternalData} />
                  <span>Open AI</span>
                </button>
                <button
                  onClick={() => navigation(Paths.USERS)}
                  type="button"
                  className={`${pathname === Paths.USERS ? 'opacity-100' : 'opacity-50'} justify-center items-center  text-white flex gap-4 align-middle  p-4 text-lg font-normal font-['Lato']`}
                >
                  <UsersSVG />
                  <span>Users</span>
                </button>
                {user.data.role === UserRole.SUPERADMIN && (
                  <button
                    onClick={() => navigation(Paths.SUPER_INVITE)}
                    type="button"
                    className={`${pathname === Paths.SUPER_INVITE ? 'opacity-100' : 'opacity-50'} justify-center items-center  text-white flex gap-4 align-middle  p-4 text-lg font-normal font-['Lato']`}
                  >
                    <UsersSVG />
                    <span>Invite Admin</span>
                  </button>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        )}
        <ButtonNav
          onClick={() => navigation(Paths.DOCUMENTATIONS)}
          color={data ? data.primaryColor : ''}
          active={pathname === Paths.DOCUMENTATIONS}
          visible={
            user.data?.role === UserRole.ADMIN || user.data?.role === UserRole.SUPERADMIN
              ? 'visible'
              : 'none'
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M12 15.577C11.7239 15.577 11.5 15.3531 11.5 15.077V6.927L9.52903 8.89797C9.33115 9.09585 9.00998 9.09472 8.81349 8.89546C8.61896 8.69818 8.62005 8.3809 8.81593 8.18497L11.2929 5.70731C11.6834 5.31669 12.3166 5.31664 12.7072 5.70721L15.185 8.18499C15.3809 8.38094 15.3822 8.69827 15.1877 8.89573C14.9912 9.09535 14.6696 9.09659 14.4715 8.89849L12.5 6.927V15.077C12.5 15.3531 12.2761 15.577 12 15.577ZM6.616 19C6.15533 19 5.771 18.846 5.463 18.538C5.155 18.23 5.00067 17.8453 5 17.384V15.461C5 15.1849 5.22386 14.961 5.5 14.961C5.77614 14.961 6 15.1849 6 15.461V17.384C6 17.538 6.064 17.6793 6.192 17.808C6.32 17.9367 6.461 18.0007 6.615 18H17.385C17.5383 18 17.6793 17.936 17.808 17.808C17.9367 17.68 18.0007 17.5387 18 17.384V15.461C18 15.1849 18.2239 14.961 18.5 14.961C18.7761 14.961 19 15.1849 19 15.461V17.384C19 17.8447 18.846 18.229 18.538 18.537C18.23 18.845 17.8453 18.9993 17.384 19H6.616Z"
                fill="white"
              />
            </g>
          </svg>

          <span>Documentation</span>
        </ButtonNav>
        <ButtonNav
          color={data ? data.primaryColor : ''}
          onClick={() => {
            navigation(Paths.SETTINGS);
          }}
          active={pathname === Paths.SETTINGS}
          visible="visible"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29477 8.85975C2.73781 7.49075 3.46578 6.23111 4.43077 5.16375C4.51056 5.07557 4.61477 5.01309 4.73014 4.98425C4.84552 4.9554 4.96686 4.9615 5.07877 5.00175L7.38037 5.82495C7.54422 5.88346 7.71883 5.90564 7.89211 5.88995C8.06538 5.87427 8.23318 5.82109 8.38386 5.73411C8.53454 5.64712 8.6645 5.52842 8.76474 5.38621C8.86498 5.244 8.93309 5.0817 8.96437 4.91055L9.40357 2.50335C9.42478 2.38617 9.48038 2.27795 9.5633 2.19247C9.64621 2.107 9.75269 2.04812 9.86917 2.02335C11.275 1.72399 12.7281 1.72399 14.134 2.02335C14.2505 2.04812 14.3569 2.107 14.4398 2.19247C14.5228 2.27795 14.5784 2.38617 14.5996 2.50335L15.0388 4.91055C15.07 5.0817 15.1382 5.244 15.2384 5.38621C15.3386 5.52842 15.4686 5.64712 15.6193 5.73411C15.77 5.82109 15.9378 5.87427 16.111 5.88995C16.2843 5.90564 16.4589 5.88346 16.6228 5.82495L18.9256 5.00175C19.0376 4.96164 19.159 4.95573 19.2744 4.98479C19.3898 5.01385 19.4939 5.07656 19.5736 5.16495C20.5384 6.23196 21.2664 7.49118 21.7096 8.85975C21.746 8.97291 21.748 9.09435 21.7153 9.20865C21.6826 9.32296 21.6167 9.42497 21.526 9.50175L19.66 11.0858C19.5274 11.1984 19.4209 11.3385 19.3479 11.4964C19.2749 11.6543 19.2371 11.8262 19.2371 12.0002C19.2371 12.1741 19.2749 12.346 19.3479 12.5039C19.4209 12.6618 19.5274 12.8019 19.66 12.9146L21.526 14.4986C21.6165 14.5755 21.6822 14.6776 21.7147 14.7919C21.7471 14.9061 21.745 15.0275 21.7084 15.1406C21.2653 16.5096 20.5374 17.7692 19.5724 18.8366C19.4926 18.9247 19.3884 18.9872 19.273 19.0161C19.1576 19.0449 19.0363 19.0388 18.9244 18.9986L16.6228 18.1754C16.4589 18.1168 16.2843 18.0947 16.111 18.1103C15.9378 18.126 15.77 18.1792 15.6193 18.2662C15.4686 18.3532 15.3386 18.4719 15.2384 18.6141C15.1382 18.7563 15.07 18.9186 15.0388 19.0898L14.5996 21.4982C14.5781 21.6151 14.5224 21.7231 14.4395 21.8083C14.3566 21.8936 14.2503 21.9523 14.134 21.977C12.7281 22.2765 11.275 22.2765 9.86917 21.977C9.75269 21.9522 9.64621 21.8933 9.5633 21.8078C9.48038 21.7224 9.42478 21.6141 9.40357 21.497L8.96437 19.0898C8.93309 18.9186 8.86498 18.7563 8.76474 18.6141C8.6645 18.4719 8.53454 18.3532 8.38386 18.2662C8.23318 18.1792 8.06538 18.126 7.89211 18.1103C7.71883 18.0947 7.54422 18.1168 7.38037 18.1754L5.07877 18.9986C4.96675 19.0387 4.84533 19.0446 4.72995 19.0155C4.61456 18.9865 4.51042 18.9237 4.43077 18.8354C3.4659 17.7684 2.73793 16.5091 2.29477 15.1406C2.25819 15.0275 2.25599 14.9061 2.28847 14.7919C2.32094 14.6776 2.38661 14.5755 2.47717 14.4986L4.34317 12.9146C4.47573 12.8019 4.58221 12.6618 4.65523 12.5039C4.72825 12.346 4.76608 12.1741 4.76608 12.0002C4.76608 11.8262 4.72825 11.6543 4.65523 11.4964C4.58221 11.3385 4.47573 11.1984 4.34317 11.0858L2.47717 9.50175C2.38661 9.42483 2.32094 9.32275 2.28847 9.20845C2.25599 9.09416 2.25819 8.9728 2.29477 8.85975ZM3.56677 8.85255L5.11957 10.1702C5.3851 10.3955 5.59841 10.6758 5.74471 10.9919C5.89102 11.3079 5.9668 11.6519 5.9668 12.0002C5.9668 12.3484 5.89102 12.6924 5.74471 13.0085C5.59841 13.3245 5.3851 13.6048 5.11957 13.8302L3.56797 15.1478C3.91837 16.0862 4.42357 16.9598 5.06077 17.7302L6.97597 17.0462C7.30375 16.9291 7.65307 16.8848 7.99969 16.9163C8.34631 16.9477 8.68195 17.0542 8.98333 17.2283C9.2847 17.4023 9.54461 17.6399 9.74503 17.9245C9.94544 18.209 10.0816 18.5337 10.144 18.8762L10.51 20.8778C11.4975 21.0425 12.5056 21.0425 13.4932 20.8778L13.858 18.8738C13.9201 18.5311 14.0561 18.2061 14.2566 17.9214C14.4571 17.6366 14.7171 17.399 15.0188 17.2249C15.3204 17.0509 15.6563 16.9446 16.0031 16.9135C16.35 16.8824 16.6994 16.9273 17.0272 17.045L18.9424 17.7302C19.5807 16.9586 20.0857 16.0858 20.4364 15.1478L18.8836 13.8302C18.6177 13.6051 18.404 13.3248 18.2575 13.0087C18.1109 12.6927 18.035 12.3485 18.035 12.0002C18.035 11.6518 18.1109 11.3076 18.2575 10.9916C18.404 10.6755 18.6177 10.3952 18.8836 10.1702L20.4364 8.85255C20.0857 7.91454 19.5807 7.04173 18.9424 6.27015L17.0272 6.95415C16.6995 7.07117 16.3502 7.11553 16.0037 7.08416C15.6571 7.05278 15.3216 6.94643 15.0202 6.77246C14.7188 6.5985 14.4589 6.36108 14.2584 6.07667C14.058 5.79226 13.9217 5.46765 13.8592 5.12535L13.4932 3.12255C12.5056 2.95782 11.4975 2.95782 10.51 3.12255L10.1452 5.12535C10.0828 5.46776 9.94664 5.7925 9.74623 6.07705C9.54581 6.3616 9.2859 6.59916 8.98453 6.77325C8.68315 6.94734 8.34751 7.0538 8.00089 7.08524C7.65427 7.11669 7.30496 7.07237 6.97717 6.95535L5.06077 6.27015C4.42283 7.04181 3.91708 7.91463 3.56677 8.85255ZM9.00397 12.0002C9.00397 11.2045 9.32004 10.4414 9.88265 9.87883C10.4453 9.31622 11.2083 9.00015 12.004 9.00015C12.7996 9.00015 13.5627 9.31622 14.1253 9.87883C14.6879 10.4414 15.004 11.2045 15.004 12.0002C15.004 12.7958 14.6879 13.5589 14.1253 14.1215C13.5627 14.6841 12.7996 15.0002 12.004 15.0002C11.2083 15.0002 10.4453 14.6841 9.88265 14.1215C9.32004 13.5589 9.00397 12.7958 9.00397 12.0002ZM10.204 12.0002C10.204 12.4775 10.3936 12.9354 10.7312 13.2729C11.0687 13.6105 11.5266 13.8002 12.004 13.8002C12.4814 13.8002 12.9392 13.6105 13.2768 13.2729C13.6143 12.9354 13.804 12.4775 13.804 12.0002C13.804 11.5228 13.6143 11.0649 13.2768 10.7274C12.9392 10.3898 12.4814 10.2002 12.004 10.2002C11.5266 10.2002 11.0687 10.3898 10.7312 10.7274C10.3936 11.0649 10.204 11.5228 10.204 12.0002Z"
              fill="white"
            />
          </svg>
          <span>Settings</span>
        </ButtonNav>
      </div>
    </div>
  );
};
