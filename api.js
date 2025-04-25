import axios from 'axios';
import xml2js from 'react-native-xml2js';
import RSSParser from 'react-native-rss-parser';

// URL des sitemaps et flux RSS
const CALENDAR_SITEMAP_URL = 'https://www.flashscore.com/sitemap/season-calendar.xml';
const LIVE_SCORES_RSS_URL = 'https://www.espn.com/espn/rss/scores'; // Exemple de flux RSS valide pour les scores

// Récupérer les URLs depuis un sitemap
export async function fetchSitemapUrls(sitemapUrl = CALENDAR_SITEMAP_URL) {
  try {
    const response = await axios.get(sitemapUrl);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    // Extraire toutes les URLs du sitemap
    return result.urlset.url.map((entry) => entry.loc[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du sitemap:', error);
    return [];
  }
}

// Récupérer les articles depuis un flux RSS
export async function fetchRSSFeed(rssUrl = LIVE_SCORES_RSS_URL) {
  try {
    const response = await fetch(rssUrl);
    const text = await response.text();
    const feed = await RSSParser.parse(text);

    // Retourner les articles du flux RSS
    return feed.items;
  } catch (error) {
    console.error('Erreur lors de la récupération du flux RSS:', error);
    return [];
  }
}