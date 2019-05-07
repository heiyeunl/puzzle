import React, {Component} from 'react';

const Header = () => {
  return (
    <div className="header">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 200" width="1920px" height="200px" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="mask" x="0" y="0" width="1920" height="200" >
            <rect x="0" y="0" width="1920" height="200"/>
            <text x="960" y="1.3em">15 PUZZLE</text>
          </mask>
        </defs>
        <rect x="0" y="0" width="1920" height="200"/>
      </svg>  
    </div>
  )
}

export default Header;