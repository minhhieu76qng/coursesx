import * as yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// eslint-disable-next-line import/prefer-default-export
export const isPhoneNumber = () => {
  const phoneTest = {
    name: 'phone',
    message: 'Phone number is not valid',
    exclusive: true,
    test: (value) => {
      try {
        const phoneNumberObject = parsePhoneNumberFromString(value, 'VN');
        if (phoneNumberObject && phoneNumberObject.isValid()) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    },
  };
  return yup.string().required().test(phoneTest);
};

export const isPassword = () => {
  return yup.string().min(4).max(20);
};

export const isUsername = () => {
  return yup.string().required().lowercase().trim().min(1).max(20);
};

export const isFullname = () => {
  return yup.string().required().trim().min(3).max(35);
};

export const isEmail = () => {
  return yup.string().required().email();
};

export const isConfirmPassword = (passwordRef) => {
  return yup.string().required().oneOf([passwordRef], 'Confirm password is not match');
};

export { yup };
