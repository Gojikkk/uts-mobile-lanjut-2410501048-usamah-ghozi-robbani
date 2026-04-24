import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { useBookDetails } from '../hooks/useApiState';


export default function DetailScreen({ route }) {
    const [refreshing, setRefreshing] = useState(false);
    const { bookKey } = route.params;
    const { bookDetails, loading, error, fetchBookDetails } = useBookDetails(bookKey);
        const coverImageUrl = bookDetails?.cover_i
        ? `https://covers.openlibrary.org/b/id/${bookDetails.cover_i}-L.jpg`
        : 'https://via.placeholder.com/150x200?text=No+Cover';

    useEffect(() => {
        fetchBookDetails(bookKey);
    }, [fetchBookDetails, bookKey]);
    
    if (loading && !refreshing) {
        return <Loading />;
    }

    if (error && !refreshing) {
        return <ErrorState message={error} onRetry={fetchTrendingBooks} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.coverContainer}>
                <Image source={{ uri: coverImageUrl }} style={styles.coverImage} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{bookDetails?.title || 'No Title'}</Text>
                <Text style={styles.author}>{bookDetails?.author_name?.join(', ') || 'Unknown Author'}</Text>
                <Text style={styles.publishYear}>First Published: {bookDetails?.first_publish_year || 'N/A'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    }, 
    coverContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    coverImage: {
        width: 150,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#eee',
    },
    infoContainer: {
        alignItems: 'center',
    },
    title: {    
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',  
        marginBottom: 10,
        textAlign: 'center',
    },
    author: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    publishYear: {
        fontSize: 16,
        color: '#999',
    }
});



