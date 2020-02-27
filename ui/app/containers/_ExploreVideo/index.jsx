/* global fetch */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';

// just for change style test
import styled from 'styled-components';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const API_KEY = process.env.HISTORY_YOUTUBE_API_KEY;

export default function ExploreVideo() {
  // show cats video test
  const [showingCats, showCats] = useState(false);

  useEffect(() => {
    // videoSearch(searchValue, { searchOrder });
    // showCats(true);
  }, []);

  const Cat = styled.button`
  font-size: ${showingCats ? '3rem' : '1rem'};
    text-align: center;
    color: ${showingCats ? 'green' : 'red'};
  `;



  const [videos, setVideos] = useState([]);
  const [selectedVideo, selectVideo] = useState(null);

  const fetchVideos = (searchValue, options = {}) => {
    if (!searchValue) {
      return undefined;
    }

    const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    const geoAddress = `https://content.googleapis.com/youtube/v3/search?location=${searchValue}&locationRadius=1km&maxResults=5${order}`
      + `&part=id,snippet&type=video&videoEmbeddable=true&key=${API_KEY}&videoLiscense=any`;
    const keywordAddress = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${searchValue}&type=video${order}`;

    const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;

    // most views
    // https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&publishedAfter=
    // 2014-10-29T00%3A00%3A00Z&publishedBefore=2014-10-31T00%3A00%3A00Z&key=AIzaSyC8rNZ8fkVAjK_B4UfmNQNISPar6D-TjI4

    return fetch(address)
      .then(response => response.json())
      .then((payload) => {
        setVideos(payload.items);
        selectVideo(payload.items[0]);
      })
      .catch(error => console.debug(error.message));
  };

  // const videoSearch = _.debounce((searchValue, options) => fetchVideos('cats', options), 400);
  const videoSearch = _.debounce((searchValue, options) => fetchVideos(searchValue, options), 400);

  return (
    <section id="video-component">
      {/* show cats video test */}
      <div>On press search for cats</div>
      <Cat type="button" onClick={() => { videoSearch('cat'); showCats(true); }}>SHOW CATS</Cat>
      <SearchBar onSearchChange={videoSearch} />
      <VideoDetail video={selectedVideo} />
      <VideoList onVideoSelect={selectVideo} videos={videos} />
    </section >
  );
}
