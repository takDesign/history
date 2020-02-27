/* global fetch */
import React, { useState } from 'react';
import _ from 'lodash';

// just for change style test
// import styled from 'styled-components';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import PhotoList from './PhotoList';

const YOUTUBE_API_KEY = process.env.HISTORY_YOUTUBE_API_KEY;
// const FLICKR_API_KEY = process.env.HISTORY_FLICKR_API_KEY;
const FLICKR_API_KEY = '5f8f56b544d7ba02dd00353f9d202cae';
// const FLICKR_APP_SECRET = process.env.HISTORY_FLICKR_APP_SECRET;

export default function ExploreMedia() {
  // useEffect(() => {
  // videoSearch(searchValue, { searchOrder });
  // showCats(true);
  // }, []);

  const [photos, setPhotos] = useState([]);
  // const [selectedPhoto, selectPhoto] = useState(null);

  const fetchPhotos = (searchValue, options = {}) => {
    if (!searchValue) {
      return undefined;
    }
    const method = 'flickr.photos.search';
    const location = {
      lat: '49.282720',
      lon: '-123.115365',
    };
    const keyword = 'Vancouver';

    // const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    const geoAddress = `https://www.flickr.com/services/rest/?method=${method}&api_key=${FLICKR_API_KEY}&lat=${location.lat}&lon=${location.lon}&radius=2&per_page=40&format=json&nojsoncallback=1`;

    const keywordAddress = `https://www.flickr.com/services/rest/?method=${method}&api_key=${FLICKR_API_KEY}&tags=${keyword}&per_page=40&format=json&nojsoncallback=1`;

    const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;

    const dimension = 'q'; // b is for large size q is for small

    return fetch(address)
      .then(response => response.json())
      .then((payload) => {
        const formatImage = (photo) => ({
          src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${dimension}.jpg`
        });
        const sources = payload.photos.photo.map(formatImage);
        // resolve({ photos: sources });
        // setPhotos(sources.photos.photo);
        // Promise.resolve({ photos: sources });
        // console.log('photos');
        // console.log(photos);
        // debugger;
        console.log(sources);
        setPhotos(sources);
        // selectVideo(payload.items[0]);
      })
      .catch(error => console.debug(error.message));
  };


  const [videos, setVideos] = useState([]);

  const [selectedVideo, selectVideo] = useState(null);

  const fetchVideos = (searchValue, options = {}) => {
    if (!searchValue) {
      return undefined;
    }

    const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    const geoAddress = `https://content.googleapis.com/youtube/v3/search?location=${searchValue}&locationRadius=2km&maxResults=5${order}`
      + `&part=id,snippet&type=video&videoEmbeddable=true&key=${YOUTUBE_API_KEY}&videoLiscense=any`;
    const keywordAddress = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&q=${searchValue}&type=video${order}`;

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
  const photoSearch = _.debounce((searchValue, options) => fetchPhotos(searchValue, options), 400);

  return (
    <section className="row" style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
      <section id="video-component" >
        <SearchBar onSearchChange={videoSearch} />
        <SearchBar onSearchChange={photoSearch} />
        <VideoDetail video={selectedVideo} />
        <VideoList onVideoSelect={selectVideo} videos={videos} />
      </section>
      <section id="photo-component" >
        <PhotoList photos={photos} />
      </section>
    </section>
  );
}
