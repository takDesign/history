/* global URL, window navigator */
import React, { useEffect, useState } from 'react';

const defaults = {
  instruction: 'Keyword or GeoCode',
  searchOrder: 'relevance',
};

const getQS = () => ((typeof URL === 'undefined') ? '' : new URL(window.location.href).search);

// output sample '49.25,-123.1' or ''
function getGeoCode(qs) {
  const matches = /(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/.exec(qs);
  return (matches) ? matches[0] : '';
}

export default function SearchBar({
  onSearchChangeVideo: changeSearchVideo,
  onSearchChangePhoto: changeSearchPhoto,
}) {
  // export default function SearchBar(props) {
  // extract onSearchChange from props
  // const { onSearchChange } = props;
  // const changeSearch = onSearchChange;


  navigator.geolocation.getCurrentPosition(
    (position) => {
      defaults.geocode = `${position.coords.latitude},${position.coords.longitude}`;
      // console.log(defaults.geocode);
    },
    (error) => {
      defaults.geocode = '13.7524000,100.5021833';
      console.log('Could not get your current location', error.code);
    },
  );

  const [searchOrder, setSearchOrder] = useState(defaults.searchOrder);
  const [searchValue, setSearchValue] = useState(getGeoCode(getQS()) || defaults.geocode);

  useEffect(() => {
    changeSearchVideo(searchValue, { searchOrder });
    changeSearchPhoto(searchValue, { searchOrder });
  }, []);

  const handleSearchChange = (keyword) => {
    setSearchValue(keyword);
    changeSearchVideo(keyword, { searchOrder });
    changeSearchPhoto(keyword, { searchOrder });
  };

  const onOrderChange = (order) => {
    setSearchOrder(order);
    changeSearchVideo(searchValue, { searchOrder: order });
    changeSearchPhoto(searchValue, { searchOrder: order });
  };

  return (
    <section className="search-bar">
      <input
        onChange={event => handleSearchChange(event.target.value)}
        placeholder={defaults.instruction}
        title={defaults.instruction}
        value={searchValue}
        tabIndex="1"
      />
      <select
        defaultValue="relevance"
        onChange={event => onOrderChange(event.target.value)}
        tabIndex="2"
      >
        <option value="date">
          Date of creation
        </option>
        <option value="relevance">
          Relevance
        </option>
      </select>
    </section>
  );
}
