import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import RSSParser from 'rss-parser';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      const parser = new RSSParser();
      try {
        const feed = await parser.parseURL('https://www.transfermarkt.com/rss/news'); // Transfermarkt Player News
        const formattedPlayers = feed.items.slice(0, 10).map((item) => ({
          name: item.title,
          details: item.contentSnippet || item.description,
        }));
        setPlayers(formattedPlayers);
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs :', error);
        setPlayers([{ name: 'Erreur', details: 'Impossible de charger les données.' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" color="#f00" />;
  }

  return (
    <FlatList
      data={players}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.playerItem}>
          <Text style={styles.name}>{item.name}</Text>
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
  playerItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
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