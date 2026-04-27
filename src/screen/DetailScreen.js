import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { useBookDetails } from '../hooks/useApiState';
import { useFavorite } from '../context/FavoriteContext';

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
    const { addFavorite, removeFavorite, isFavorite } = useFavorite();
    const favorite = isFavorite(bookDetails?.key);


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
        <ScrollView style={styles.container}
            contentContainerStyle={{ paddingBottom: 30 }}>
            
            <View style={styles.coverContainer}>
                <Image source={{ uri: coverImageUrl }} style={styles.coverImage} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{bookDetails?.title || 'No Title'}</Text>
                <Text style={styles.author}>{authorName || 'Unknown Author'}</Text>
                <Text style={styles.publishYear}>First Published: {publishYear}</Text>
                <Text style={styles.descriptionTitle}>Description:</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <TouchableOpacity
    style={styles.favoriteButton}
    onPress={() => {
        if (favorite) {
            removeFavorite(bookDetails.key);
        } else {
            addFavorite({
    key: bookDetails?.key,
    title: bookDetails?.title,
    author_name: [authorName],
    first_publish_year: publishYear,
    cover_i: coverId,
});
        }
    }}
>
    <Text style={styles.favoriteButtonText}>
        {favorite ? 'Remove Favorite' : 'Add to Favorite'}
    </Text>
</TouchableOpacity>
        </ScrollView>
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
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    favoriteButton: {
    marginTop: 25,
    marginHorizontal: 20,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
},

favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
},
});