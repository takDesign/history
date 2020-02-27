import React from 'react';
import styled from 'styled-components';

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.target.click();
  }
}

export default function PhotoListItem({ index, photo }) {
  const tabOffset = 2;
  const imageUrl = photo.src;

  const imageList = styled.li`
list-style:none;
display: inline-block;
`;

  return (
    <imageList>
      {/* <img src="{imageUrl}" alt="From flickr" onKeyPress={handleKeyPress} role="image" tabIndex={tabOffset + index} /> */}
      <img src={imageUrl} alt="From flickr" tabIndex={tabOffset + index} />
    </imageList>
  );
}

// return (
  //   <div className="photo-list-media" onKeyPress={handleKeyPress} role="button" tabIndex={tabOffset + index}>
  //     <div className="media-thumbnail">
  //       <img src={imageUrl} alt="Flickr thumbnail" />
  //     </div>
  //   </div>
  // );
