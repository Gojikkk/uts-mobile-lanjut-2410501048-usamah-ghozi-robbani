import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { useBookDetails } from '../hooks/useApiState';


export default function DetailScreen({ route }) {
    const [refreshing, setRefreshing] = useState(false);
    const { bookKey } = route.params;
    const { bookDetails, authorName, loading, error, fetchBookDetails } = useBookDetails(bookKey);
    const coverId =
    bookDetails?.cover_i ||
    bookDetails?.covers?.[0];
    const coverImageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : 'https://via.placeholder.com/150x200?text=No+Cover';
    const publishYear =
    bookDetails?.first_publish_year ||
    bookDetails?.first_publish_date ||
    bookDetails?.created?.value ||
    'N/A';
    const description =
    bookDetails?.description?.value ||
    bookDetails?.description ||
    'No description available';


    useEffect(() => {
        fetchBookDetails(bookKey);
    }, [fetchBookDetails, bookKey]);
    
    if (loading && !refreshing) {
        return <Loading />;
    }

    if (error && !refreshing) {
        return <ErrorState message={error} onRetry={() => fetchBookDetails(bookKey)} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.coverContainer}>
                <Image source={{ uri: coverImageUrl }} style={styles.coverImage} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{bookDetails?.title || 'No Title'}</Text>
                <Text style={styles.author}>{authorName || 'Unknown Author'}</Text>
                <Text style={styles.publishYear}>First Published: {publishYear}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
    },

    coverContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 15,
    },

    coverImage: {
        width: 180,
        height: 260,
        borderRadius: 16,
        backgroundColor: '#e0e0e0',
    },

    infoContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1c1c1e',
        textAlign: 'center',
        marginBottom: 10,
    },

    author: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 8,
    },

    publishYear: {
        fontSize: 13,
        color: '#777',
        textAlign: 'center',
        marginBottom: 15,
    },

    description: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
        textAlign: 'justify',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        elevation: 2,
    }
});