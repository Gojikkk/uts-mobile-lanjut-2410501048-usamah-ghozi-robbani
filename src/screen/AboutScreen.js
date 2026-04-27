import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function AboutScreen(onLogout) {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['Images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Permission to access camera is required!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const showOptions = () => Alert.alert('Foto Profile', 'Pilih sumber foto', [
        { text: 'Ambil Foto', onPress: takePhoto },
        { text: 'Pilih dari Galeri', onPress: pickImage },
        { text: 'Batal', style: 'cancel' },
    ]);

    useEffect(() => {
        const loadUserData = async () => {
            const data = await AsyncStorage.getItem('userProfile');
            if (data) {
                setUser(JSON.parse(data));
            }
        };
        loadUserData();
    }, []);

    const handleLogout = () => {
        Alert.alert('Konfirmasi Logout', 'Apakah Anda yakin ingin logout?', [
            { text: 'Batal', style: 'cancel' },
            { text: 'Logout', onPress: () =>{
                AsyncStorage.removeItem('userProfile');
                onLogout();
            } },
        ]);
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
                     <TouchableOpacity onPress={showOptions}>
            {profileImage 
                ? <Image source={{uri:profileImage}} style={styles.avatar} />
                : <View style={styles.placeholder}><Text>Pilih Foto</Text></View>
            }
        </TouchableOpacity>

        <View style={styles.infoContainer}>
            
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.keterangan}>Nama</Text>
            <Text style={styles.name}>{user.name}</Text>

            <Text style={styles.keterangan}>NIM</Text>
            <Text style={styles.nim}>2410501048</Text>

            <Text style={styles.keterangan}>Kelas</Text>
            <Text style={styles.kelas}>B</Text>

            <Text style={styles.keterangan}>Tema</Text>
            <Text style={styles.tema}>BookShelf</Text>

            <Text style={styles.keterangan}>Email</Text>
            <Text style={styles.email}>{user.email}</Text>
        </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
        
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
        alignItems: 'center',
        paddingTop: 40,
    },

    title: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 20,
        color: '#1c1c1e',
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        backgroundColor: '#ddd',
    },

    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },

    infoContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,

        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },

    keterangan: {
        fontSize: 12,
        color: '#888',
        marginTop: 12,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
        marginBottom: 5,
    },

    nim: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
    },

    kelas: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
    },

    tema: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
    },

    email: {
        fontSize: 15,
        color: '#666',
        marginBottom: 5,
    },

    logoutButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginTop: 10,
        width: '60%',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },

    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});