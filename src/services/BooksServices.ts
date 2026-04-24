    import api from './api';

    interface Book {
        title: string;
        author_name: string[];
        cover_i: number;
        key: string;
        first_publish_year: number;
    }

    export const getTrendingBooks = async (): Promise<Book[]> => {
        const response = await api.get('/trending/daily.json');
        return response.data.works;
    }

    export const searchBooks = async (query: string): Promise<Book[]> => {
        const response = await api.get(`/search.json?q=${query}&limit=20`);
        return response.data.docs;
    }

    export const getBookDetails = async (key: string): Promise<any> => {
        const response = await api.get(`${key}.json`);
        return response.data;
    }