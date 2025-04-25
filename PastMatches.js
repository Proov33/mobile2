import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import RSSParser from 'rss-parser';

export default function PastMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const parser = new RSSParser();
      try {
        const feed = await parser.parseURL('https://www.espn.com/espn/rss/soccer/news'); // ESPN Soccer Results
        const formattedMatches = feed.items.slice(0, 10).map((item) => ({
          date: new Date(item.pubDate).toLocaleDateString(),
          title: item.title,
          details: item.contentSnippet || item.description,
        }));
        setMatches(formattedMatches);
      } catch (error) {
        console.error('Erreur lors de la récupération des matchs :', error);
        setMatches([{ date: '', title: 'Erreur', details: 'Impossible de charger les données.' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" color="#f00" />;
  }

  return (
    <FlatList
      data={matches}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.matchItem}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.details}>{item.details}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
  },
  matchItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  date: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  title: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    color: '#f00',
    fontSize: 14,
    marginTop: 5,
  },
});