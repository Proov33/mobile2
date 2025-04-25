import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import RSSParser from 'rss-parser';

export default function Summary() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const parser = new RSSParser();
      try {
        const feed = await parser.parseURL('https://feeds.bbci.co.uk/sport/football/rss.xml'); // BBC Sport - Football
        const formattedSummary = feed.items.slice(0, 5).map((item) => ({
          title: item.title,
          description: item.contentSnippet || item.description,
          date: new Date(item.pubDate).toLocaleString(),
        }));
        setSummary(formattedSummary);
      } catch (error) {
        console.error('Erreur lors de la récupération du résumé :', error);
        setSummary([{ title: 'Erreur', description: 'Impossible de charger les données.', date: '' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" color="#f00" />;
  }

  return (
    <FlatList
      data={summary}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>{item.date}</Text>
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
  item: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
  date: {
    color: '#f00',
    fontSize: 12,
    marginTop: 5,
  },
});