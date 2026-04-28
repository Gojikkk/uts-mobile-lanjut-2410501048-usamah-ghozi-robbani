import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { useSearchResults } from '../hooks/useApiState';
import { searchSchema } from '../utils/validationSchema.';
import  SearchInput  from '../components/SearchInput';
import { useFormik } from 'formik';


export default function SearchScreen({ navigation, route }) {
    const [refreshing, setRefreshing] = useState(false);
    const [query, setQuery] = useState('');
    const { searchResults, loading, error, fetchSearchResults } = useSearchResults(query);

    const formik = useFormik({
        initialValues: { query: '' },
        validationSchema: searchSchema,
        onSubmit: (values) => {
            fetchSearchResults(values.query);
        },
    })


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchSearchResults(query);
        setRefreshing(false);
    }, [fetchSearchResults, query]);

    if (loading && !refreshing) {
        return <Loading />;
    }

    if (error && !refreshing) {
        return <ErrorState message={error} onRetry={() => fetchSearchResults(query)} />;
    }

    return (
    <SafeAreaView style={styles.container}>

        <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1}}
                    
        >
        <SearchInput
        label="Search Books"
        placeholder="Enter book title, author, or keyword"
        value={formik.values.query}
        onChangeText={(text) => formik.setFieldValue('query', text)}
        onSubmit={formik.handleSubmit}
        error={formik.errors.query}
        touched={formik.touched.query}
        onblur={formik.handleBlur('query')}
        />
        
        
        <FlatList
            key="grid-2"
            data={searchResults}
            keyExtractor={(item) => item.key}
            numColumns={2}
            columnWrapperStyle={styles.row}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({ item }) => (
                <BookCard
                    item={item}
                    onPress={() =>
                        navigation.navigate('Detail', { bookKey: item.key })
                    }
                />
            )}
        />
        </KeyboardAvoidingView>
    </SafeAreaView>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: -30,
        paddingHorizontal: 5,
    },  
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
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
})
