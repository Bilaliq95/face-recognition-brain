import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo=()=>{
	return(
		<div className='ma4 mt0'>
    	<Tilt className="Tilt br2 shadow-2" style={{ width: '150px',height: '150px', background: 'linear-gradient(89deg,#FF5EDF 0%,#04C8DE 100%)'}}>
      		<div>
        	<img alt='logo' src={brain}/>
      		</div>
    	</Tilt>
		</div>
		)
}

export default Logo;

