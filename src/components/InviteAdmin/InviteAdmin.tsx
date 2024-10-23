import React, { useEffect, useState } from 'react';
import { BasicModal, ButtonBordered, ButtonGreenSmall, Input } from 'src/components';
import { useFormik } from 'formik';
import { inviteAdminSchema } from 'src/utils';
import { useGetUsersListQuery } from 'src/api/usersApi';
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useCreateCloneAppMutation } from 'src/api/cloneApi';
import { DoneSvg } from 'src/assets/svg/DoneSVG';

export type InitialValuesTypeInvite = {
  cloneName: string;
  servername: string;
  username: string;
  dbname: string;
  adminId: string;
  password: string;
  email: string;
};

export const InviteAdmin = () => {
  const [isShow, setIsShow] = useState(false);

  const usersListQuery = useGetUsersListQuery({
    page: 1,
    size: 1000,
    role: 'ADMIN',
    keySearchValue: '',
    sortDirection: 'DESC',

    filter: '',
  });

  const [handleCreateClone, cloneInfo] = useCreateCloneAppMutation({});

  const formik = useFormik<InitialValuesTypeInvite>({
    initialValues: {
      cloneName: '',
      servername: '',
      username: '',
      dbname: '',
      password: '',
      email: '',

      adminId: '',
    },
    onSubmit: (val: InitialValuesTypeInvite) => {
      handleCreateClone(val);
      // setIsShow(true);
    },
    validationSchema: inviteAdminSchema,
  });

  const onChangeSelect = (e: SelectChangeEvent) => {
    formik.setFieldValue('adminId', e.target.value);
  };
  const renderError = (field: keyof InitialValuesTypeInvite) => (
    <span
      style={{
        visibility:
          formik.errors[field] && formik.submitCount >= 1 ? 'visible' : 'hidden',
        height: '1em',
      }}
      className="text-white text-base font-normal font-['Lato']"
    >
      {formik.errors[field]}
    </span>
  );

  useEffect(() => {
    if (cloneInfo.isSuccess) {
      setIsShow(true);
    }
  }, [cloneInfo.isSuccess]);

  if (!usersListQuery.data) {
    return <LinearProgress />;
  }

  return (
    <div className="px-12 py-8 ">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-neutral-700 text-3xl font-bold font-['Lato']">
          Invite new admin
        </h1>
      </div>
      <div className="flex  flex-col justify-between">
        <div className="flex  flex-col gap-5  justify-start items-start">
          <div className="flex flex-col">
            <span className="pb-3.5">Clone Name</span>
            <Input
              onChange={formik.handleChange}
              value={formik.values.cloneName}
              name="cloneName"
              type="text"
              placeholder="Enter Clone Name"
              bordered
            />
            {renderError('cloneName')}
          </div>
          <div className="flex flex-col">
            <span className="pb-3.5">Server Name</span>
            <Input
              onChange={formik.handleChange}
              value={formik.values.servername}
              name="servername"
              type="text"
              placeholder="Enter Server Name"
              bordered
            />
            {renderError('servername')}
          </div>
          <div className="flex flex-col">
            <span className="pb-3.5">User Name</span>
            <Input
              onChange={formik.handleChange}
              value={formik.values.username}
              name="username"
              type="text"
              autoComplete="nope"
              placeholder="Enter User Name"
              bordered
            />
            {renderError('username')}
          </div>
          <div className="flex flex-col">
            <span className="pb-3.5">Data Base Name</span>
            <Input
              onChange={formik.handleChange}
              value={formik.values.dbname}
              name="dbname"
              type="text"
              placeholder="Enter Data Base Name"
              bordered
            />
            {renderError('dbname')}
          </div>
          <div className="flex flex-col">
            <span className="pb-3.5">User email</span>
            <Input
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              type="email"
              placeholder="Enter User email"
              bordered
            />
            {renderError('email')}
          </div>
          <div className="flex flex-col">
            <span className="pb-3.5">User password</span>
            <Input
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              placeholder="Enter User Password"
              bordered
              autoComplete="nope"
            />
            {renderError('password')}
          </div>
          <div className="flex flex-col">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220, width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Choose Admin</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formik.values.adminId}
                name="adminId"
                onChange={onChangeSelect}
                label="admins"
                variant="standard"
              >
                {usersListQuery.data.rows.map(el => {
                  if (el.firstName) {
                    return (
                      <MenuItem value={el.id} key={el.id}>
                        <em>
                          {el.firstName} {el.lastName}
                        </em>
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </Select>
            </FormControl>
            {renderError('adminId')}
          </div>
        </div>
        {cloneInfo.error && (
          <span className="text-red-600 text-base font-normal font-['Lato']">
            Something went wrong
          </span>
        )}

        <div className="pt-5">
          <ButtonGreenSmall isLoading={cloneInfo.isLoading} onClick={formik.submitForm}>
            Invite
          </ButtonGreenSmall>
        </div>
      </div>
      <BasicModal isOpen={isShow} onClose={() => setIsShow(false)}>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col justify-center gap-16">
            <div className="flex flex-col items-center gap-16">
              <DoneSvg />
              <div className=" flex flex-col items-center gap-4">
                <h2 className="text-neutral-700 text-2xl font-bold font-['Lato']">
                  Thank you
                </h2>
                <p className="text-neutral-700 opacity-70 text-base font-normal font-['Lato']">
                  The New App was created successfully
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-center ali">
              <ButtonBordered onClick={() => setIsShow(false)}>Close</ButtonBordered>
            </div>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};
