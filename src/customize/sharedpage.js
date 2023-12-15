import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopratedTv from '../pages/topratedtv';
import TopRated from '../pages/toprated';
import FinnkinoNewsComponent from '../pages/news';
import ReviewBrowser from '../pages/reviews/reviewspage';
import './customizedpage.css';

const SharedPage = () => {
  const { link } = useParams();
  const [userPreferences, setUserPreferences] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'https://moviehub-sovellus1.onrender.com';

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        console.log('Fetching user preferences for link:', link);
        const response = await axios.get(`${apiBaseUrl}/share/${link}`);
        console.log('Response:', response);
        const fetchedUserPreferences = response.data.userPreferences;
        console.log('Fetched User Preferences:', fetchedUserPreferences);
        setUserPreferences(fetchedUserPreferences);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    };

    fetchUserPreferences();
  }, [link]);

  if (!userPreferences) {
    return <div>Loading...</div>;
  }

 
  return (
    <div className="CustomizedPageh">
      <h1>Shared Customized Page!</h1>
      

      <div className="CustomizedPage">
        {userPreferences.news_preference && (
          <div className="CustomizedSection">
            <h2>News Section</h2>
            <FinnkinoNewsComponent />
          </div>
        )}

        {userPreferences.movies_preference && (
          <div className="CustomizedSection">
            <h2>Movies Section</h2>
            <TopRated />
          </div>
        )}

        {userPreferences.reviews_preference && (
          <div className="CustomizedSection">
            <h2>Reviews Section</h2>
            <ReviewBrowser />
          </div>
        )}

        {userPreferences.tv_preference && (
          <div className="CustomizedSection">
            <h2>TV Shows Section</h2>
            <TopratedTv />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default SharedPage;

