JUDUL PROJECT: BookShelf - React Native + Expo
Nama: Usamah Ghozi Robbani
NIM: 2410501048
Kelas B

Tema yang dipilih: BookShelf (Tema C)

TECH STACK
    "@expo/vector-icons": "^15.0.3",
    "@react-native-async-storage/async-storage": "2.2.0",
    "@react-native-masked-view/masked-view": "0.3.2",
    "@react-navigation/bottom-tabs": "^7.15.9",
    "@react-navigation/native": "^7.2.2",
    "@react-navigation/native-stack": "^7.14.11",
    "axios": "^1.15.2",
    "expo-image-picker": "~17.0.10",
    "formik": "^2.4.9",
    "react-native": "0.81.5",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-safe-area-context": "~5.6.0",
    "typescript": "~5.9.2",
    "yup": "^1.7.1"

CARA INSTALL & RUN
- Install:
- run: npx expo start

STATE MANAGEMENT:
- State Management disini digunakan untuk memproses  data buku yg ada di API untuk di proses ke favorite.
- Di Favorite Reducer hanya terdapat 2 case yaitu: ADD Favorite dan Remove Favorite 
- Untuk state management yangs saya pakai adalah Context API + Reducer, kenapa? karena:
a. case yang diurus itu sedikit dan kecil
b. agar bisa diakse secara global, sehingga bisa diakses oleh semua komponen
c. semua yg berhubungan dengan favorite jadi terpusat di satu tempat yaitu provider

LINK VIDEO DEMO: 
- LINK DRIVE: [VIDEO DRIVE](https://drive.google.com/drive/folders/1Ck8ZRXSP---Cnv7-khgjEXsRrjE2akvc?usp=drive_link) 
- LINK YOUTUBE: [VIDEO YOUTUBE](https://youtu.be/KTISGfgtRSQ?si=xM2Ux5U7yfXzLsrp)

DAFTAR RENFRENSI: 
- https://reactnative.dev/docs/components-and-apis -untuk mencari tau component yang ada di react native
- https://reactnavigation.org/ -untuk mengetahui navigasi yang ada di react 
- modul modul pembelajaran dari p1-p7, terutama pada p7 yang saua gunakan untuk mengetahui tentang axios dan API

REFLEKSI PENGERJAAN:
Untuk kesulitan yang saya dapatkan ketika saya mengerjakan project ini adalah banyaknya terjadi bug. Yang awalnya saya kira memang sudah aman semua code nya, ternyata pas dirun ada bug yg hrus dibenerin. Selain itu, kesulitan saya ada juga pada mencari konsep dan juga refrensi. Saya lumayan pusing dan bingung untuk mencari refrensi untuk beberapa code sehingga membutuhkan waktu agak lama untuk mencarinya. Selain itu kesulitan saya alami adalah expo sana tidak bisa meng run project yang sudah dibuat, muncul pesan eror java lang stirng cannot be cast to java lang boolean, akhirny setelah ber jam jam saya cari ternyata kesalahan saya adalah belum menginstall suatu dependencies.

Untuk yang dipelajari dari project ini adalah, saya jadi mengerti lebih dalam tentang API dan jua axios. Awalnya saya lumayan tidak mengerti tentng bagaimana cara axios itu bekerja, namun seiringnya saya mengerjakan project ini saya jadi mengerti cara kerja axios itu sendiri. 

