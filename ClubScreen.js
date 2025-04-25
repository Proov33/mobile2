import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Calendar from './components/Calendar';
import LiveScore from './components/LiveScore';
import PastMatches from './components/PastMatches';
import Players from './components/Players';
import Summary from './components/Summary';

export default function ClubScreen() {
  const [activeTab, setActiveTab] = useState('resume');

  const tabs = [
    { name: 'resume', label: '📋 Résumé' },
    { name: 'joueurs', label: '👥 Joueurs' },
    { name: 'matchs', label: '⚽ Matchs Joués' },
    { name: 'calendrier', label: '🗓️ Calendrier' },
    { name: 'live', label: '📡 Scores en Direct' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'resume':
        return <Summary />;
      case 'joueurs':
        return <Players />;
      case 'matchs':
        return <PastMatches />;
      case 'calendrier':
        return <Calendar />;
      case 'live':
        return <LiveScore />;
      default:
        return <Text style={styles.placeholder}>Contenu introuvable</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Barre latérale avec les onglets */}
      <View style={styles.sidebar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            onPress={() => setActiveTab(tab.name)}
            style={[
              styles.tab,
              activeTab === tab.name && styles.activeTab,
            ]}
          >
            <Text style={activeTab === tab.name ? styles.activeText : styles.text}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenu de l'onglet actif */}
      <View style={styles.content}>
        <ScrollView>{renderContent()}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#111',
  },
  sidebar: {
    width: 100,
    backgroundColor: '#222',
    paddingTop: 20,
  },
  tab: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#f00',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  placeholder: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});