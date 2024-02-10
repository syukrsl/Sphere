import React, { useState, useEffect } from 'react';
import './News.css';

function News() {
  const [singaporeNews, setSingaporeNews] = useState([]);
  const [asiaNews, setAsiaNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);

  useEffect(() => {
    const newsApiKey = '114de16144fb4279a687c35eebcd7a1a';

    // API URLs
    const singaporeApiUrl = `https://newsapi.org/v2/top-headlines?country=sg&pageSize=10&apiKey=${newsApiKey}`;
    const asiaApiUrl = `https://newsapi.org/v2/everything?q=asia&pageSize=10&apiKey=${newsApiKey}`;
    const worldApiUrl = `https://newsapi.org/v2/everything?q=world&pageSize=10&apiKey=${newsApiKey}`;
    const businessApiUrl = `https://newsapi.org/v2/top-headlines?category=business&pageSize=10&apiKey=${newsApiKey}`;
    const techApiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${newsApiKey}`;
    const sportsApiUrl = `https://newsapi.org/v2/top-headlines?country=sg&category=sports&pageSize=10&apiKey=${newsApiKey}`;

    const fetchNews = async (url, setter) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (Array.isArray(data.articles)) {
        setter(data.articles);
        } else {
        console.log('Invalid data format: ',data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews(singaporeApiUrl, setSingaporeNews);
    fetchNews(asiaApiUrl, setAsiaNews);
    fetchNews(worldApiUrl, setWorldNews);
    fetchNews(businessApiUrl, setBusinessNews);
    fetchNews(techApiUrl, setTechNews);
    fetchNews(sportsApiUrl, setSportsNews);
  }, []);

  return (
    <div className="container mt-5">
      <div className="card news-card">
        <div className="card-header">
          <h2 className="card-title text-white text-center">News</h2>
        </div>
        <div className="card-body">
          <div className="news-categories">
            <div className="category">
              <h2>Singapore News</h2>
              <ul>
                {singaporeNews.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="category">
              <h2>Asia News</h2>
              <ul>
                {asiaNews.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="category">
              <h2>World News</h2>
              <ul>
                {worldNews.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="category">
              <h2>Business News</h2>
              <ul>
                {businessNews.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="category">
              <h2>Tech News</h2>
              <ul>
                {techNews.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="category">
              <h2>Sports News</h2>
              <ul>
                {sportsNews.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
