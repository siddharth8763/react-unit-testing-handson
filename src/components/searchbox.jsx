import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState(props.nameOrNum);

  let handleSearch = () => {
    props.handleMSearch(name, '', '', 'MainSearch');
  };

  let handleKeyPress = (event) => {
    if (event.key === 'Enter') props.handleMSearch(name, '', '', 'MainSearch');
    else return;
  };

  return (
    <div className="searchbox-container">
      <div id="mfilterLabel">Name or Number</div>
      <div className='search-box-controls-container'>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        value={name}
        id="mfilter"
        data-testid="searchbox-input"
        name="mainfilter"
      />
      <button onClick={handleSearch} className="search-box-search-btn" data-testid={"searchboxSearchbtn"} id="msearchbtn">
      
      </button></div>
    </div>
  );
}
