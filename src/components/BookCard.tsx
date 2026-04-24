import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

interface BookCardProps {
    item: {
        title: string;
        author_name: string[];
        cover_i: number;
        key: string;
        first_publish_year: number;
    };
    onPress: (item: any) => void;
}

export default function BookCard({ item, onPress }: BookCardProps) {
    const coverUrl = item.cover_i
        ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
        : 'https://via.placeholder.com/150x200?text=No+Cover';

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
            <Image source={{ uri: coverUrl }} style={styles.cover} />
            <View style={styles.cardInfo}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                    {item.author_name ? item.author_name[0] : 'Unknown Author'}
                </Text>
                <Text style={styles.year}>
                    {item.first_publish_year ?? '-'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 16,

        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },
    cover: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        backgroundColor: '#EDEDED',
    },
    cardInfo: {
        padding: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
        lineHeight: 18,
    },
    author: {
        fontSize: 12,
        color: '#666',
        marginTop: 6,
    },
    year: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
});