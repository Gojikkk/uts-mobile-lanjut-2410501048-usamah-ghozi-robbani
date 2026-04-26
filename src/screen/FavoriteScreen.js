import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { FavoriteContext } from '../context/FavoriteContext'; 
import BookCard from '../components/BookCard';

export default function FavoriteScreen({ navigation }) {
    const { favorites, removeFavorite } = FavoriteContext();

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
                contentContainerStyle={styles.listContentContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <BookCard
                        item={item}
                        onPress={() => navigation.navigate('BookDetails', { bookKey: item.key })}
                        onRemoveFavorite={() => removeFavorite(item.key)}
                    />
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
});