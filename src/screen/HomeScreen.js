import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { useTrendingBooks } from '../hooks/useApiState';

export default function HomeScreen({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const { trendingBooks, loading, error, fetchTrendingBooks } = useTrendingBooks();

    useEffect(() => {
        fetchTrendingBooks();
    }, [fetchTrendingBooks]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchTrendingBooks();
        setRefreshing(false);
    }, [fetchTrendingBooks]);

    if (loading && !refreshing) {
        return <Loading />;
    }

    if (error && !refreshing) {
        return <ErrorState message={error} onRetry={fetchTrendingBooks} />;
    }

    return (
    <View style={styles.container}>
        <FlatList
            key="grid-2"
            data={trendingBooks}
            keyExtractor={(item) => item.key}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContentContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <BookCard
                    item={item}
                    onPress={() =>
                        navigation.navigate('BookDetails', { bookKey: item.key })
                    }
                />
            )}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7FB'
    },
    listContentContainer: {
        paddingHorizontal: 10,
        paddingTop: 16,
        paddingBottom: 24,
    },
    row: {
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 20, 
    },
});