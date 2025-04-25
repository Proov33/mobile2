import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import RSSParser from 'rss-parser';

export default function LiveScore() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveScores = async () => {
      const parser = new RSSParser();
      try {
        const feed = await parser.parseURL('https://www.livescore.com/rss/soccer.xml'); // LiveScore RSS
        const formattedScores = feed.items.slice(0, 10).map((item) => ({
          title: item.title,
          details: item.contentSnippet || item.description,
        }));
        setScores(formattedScores);
      } catch (error) {
        console.error('Erreur lors de la récupération des scores en direct :', error);
        setScores([{ title: 'Erreur', details: 'Impossible de charger les données.' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveScores();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" color="#f00" />;
  }

  return (
    <FlatList
      data={scores}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.scoreItem}>
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
  scoreItem: {
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
  details: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
});