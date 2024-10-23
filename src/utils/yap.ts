import * as Yup from 'yup';

const passwordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .max(40, 'Password must be max 40 characters long')
  .matches(/[a-z]/, 'Must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Must contain at least one number');

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: passwordSchema,
});
export const changePassSchema = Yup.object().shape({
  currentPassword: passwordSchema,
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export const stepValidationSchema = [
  Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    isAgree: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  }),
  Yup.object().shape({
    code: Yup.string().length(6, 'Code must be 6 digits').required('Required'),
  }),
  Yup.object().shape({
    password: passwordSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  }),
  Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
  }),
];

export const stepCreateClassSchema = [
  Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    prompt: Yup.string().required('Required'),
    isPublic: Yup.boolean(),
  }),
  Yup.object().shape({
    input1: Yup.string().required('Required'),
    input2: Yup.string().optional(),
    input3: Yup.string().optional(),
    input4: Yup.string().optional(),
  }),
  Yup.object().shape({
    placeholderInput1: Yup.string().required('Required'),
    placeholderInput2: Yup.string().optional(),
    placeholderInput3: Yup.string().optional(),
    placeholderInput4: Yup.string().optional(),
  }),
];

export const inviteAdminSchema = Yup.object().shape({
  cloneName: Yup.string().required('Required'),
  servername: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  dbname: Yup.string().required('Required'),
  adminId: Yup.string().required('Required'),
});
