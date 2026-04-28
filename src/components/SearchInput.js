import { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SearchInput({ label, error, touched, style, ...rest}) {
    const [value, setValue] = useState('');

    const hasError = touched && error;
    return (<View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput 
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor = '#999'
        {...rest}
        />
        {hasError&& <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity onPress={rest.onSubmit} style={{ marginTop: 12, backgroundColor: '#007BFF', paddingVertical: 10, borderRadius: 8 }}>
            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Search</Text>
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        color: '#111',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        width: '100%',
    },
    inputError: {
        borderColor: '#FF4D4F',
        backgroundColor: '#FFF1F0',
    },
    errorText: {
        color: '#FF4D4F',
        fontSize: 12,
        marginTop: 6,
    },
    button: {
        marginTop: 14,
        backgroundColor: '#111',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: 0.5,
    }
});