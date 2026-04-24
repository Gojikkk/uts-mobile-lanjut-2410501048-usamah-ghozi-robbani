import { useState, useCallback } from 'react';
import { getTrendingBooks, searchBooks, getBookDetails } from '../services/BooksServices';


export const useTrendingBooks = () => {
    const [trendingBooks, setTrendingBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTrendingBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTrendingBooks();
            setTrendingBooks(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch trending books');
        } finally {
            setLoading(false);
        }
    }, []);
    return { trendingBooks, loading, error, fetchTrendingBooks };
};

export const useSearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSearchResults = useCallback(async (query) => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchBooks(query);
            setSearchResults(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch search results');
        } finally {
            setLoading(false);
        }
    }, []);

    return { searchResults, loading, error, fetchSearchResults };
};

export const useBookDetails = () => {
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);    

    const fetchBookDetails = useCallback(async (key) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getBookDetails(key);
            setBookDetails(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch book details');
        } finally {
            setLoading(false);
        }
    }, []);    

    return ({
        bookDetails,
        loading,
        error,
        fetchBookDetails
    })
    }

