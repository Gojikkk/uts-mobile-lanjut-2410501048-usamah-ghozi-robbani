import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

interface LoadingProps {
    message?: string;
}

export default function Loading({ message = 'Memuat...' }: LoadingProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    text: {
        marginTop: 12,
        fontSize: 14,
        color: '#888',
    },
});