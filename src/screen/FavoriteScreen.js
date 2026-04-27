import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorite } from '../context/FavoriteContext'; 
import BookCard from '../components/BookCard';

export default function FavoriteScreen({ navigation }) {
    const { favorites, removeFavorite } = useFavorite();

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorites yet!</Text>
            </View>
        );
    }    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.key}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContentContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <BookCard
                            item={item}
                            onPress={() =>
                                navigation.navigate('Detail', { bookKey: item.key })
                            }
                        />

                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeFavorite(item.key)}
                        >
                            <Text style={styles.removeButtonText}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                
            />

        </SafeAreaView>
                )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    listContentContainer: {
        padding: 10,
        paddingTop: 16,
        paddingBottom: 24,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 16,
    },

    cardWrapper: {
        flex: 1,
        maxWidth: '48%',
    },

    removeButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },

    removeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});