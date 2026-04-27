import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const registerSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Nama minimal berisi 3 karakter')
    .max(50, "Nama maksimal berisi 50 karakter")
    .required('Nama wajib diisi'),

    email: Yup.string()
 .email('Format email tidak valid')
 .required('Email wajib diisi'),

 NIM : Yup.string()
 .matches(/^[0-9]{10}$/, 'Contoh: 1234567890')
 .required('NIM wajib diisi'),

 password: Yup.string()
 .min(8, 'Password minimal 8 karakter')
 .matches(/[A-Z]/, 'Harus mengandung huruf kapital')
 .matches(/[0-9]/, 'Harus mengandung angka')
 .required('Password wajib diisi'),

 confirmPassword: Yup.string()
 .oneOf([Yup.ref('password'), null], 'Password tidak cocok')
 .required('Konfirmasi password wajib diisi'),
})

export const searchSchema = Yup.object().shape({
    query: Yup.string()
    .min(3, 'Kata kunci minimal 3 karakter')
    .required('Kata kunci wajib diisi'),
})