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
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.nim}>{user.nim}</Text>
            <Text style={styles.kelas}>B</Text>
            <Text style={styles.tema}>BookShelf</Text>
            <Text style={styles.email}>{user.email}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
        
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    placeholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 22,    
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nim: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    kelas: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    tema: {
        fontSize: 18, 
    },
    email: {
        fontSize: 16,
        color: '#999',
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600', 
    },
});



