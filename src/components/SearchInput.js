import { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function SearchInput({ label, error, touched, style, ...rest}) {
    const [value, setValue] = useState('');

    const hasError = touched && error;
    return (<View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput 
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor = '#999'
        {...rest}        value={value}
        onChangeText={setValue}
        />
        {hasError&& <Text style={styles.errorText}>{error}</Text>}
    </View>)
}

const styles = StyleSheet.create({
    container: {
        marginBottom : 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 15,
        backgroundColor: '#fafafa',
        color: '#222'
    },
    inputError: {
        borderColor: '#E53E3E',
        backgroundColor: '#FFF5F5',
    },
    errorText: {
        color: '#E53E3E',
        fontSize: 12,
        marginTop: 4
    }
}) 