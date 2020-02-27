import React from 'react';
import PhotoListItem from './PhotoListItem';

export default function PhotoList(props) {
  // const { onVideoSelect, videos } = props;
  const { photos } = props;

  const photoItems = photos.map((photo, index) => (
    <PhotoListItem
      index={index}
      // onVideoSelect={onVideoSelect}
      key={photo.id}
      photo={photo}
    />
  ));

  return <ul id="photo-list">{photoItems}</ul>;
}
