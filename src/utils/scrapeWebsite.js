import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeWebsite = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract relevant data (e.g., articles, tips)
    const articles = [];
    $('article').each((index, element) => {
      const title = $(element).find('h2').text().trim();
      const content = $(element).find('p').text().trim();
      articles.push({ title, content });
    });

    return articles;
  } catch (error) {
    console.error('Error scraping website:', error);
    return [];
  }
};