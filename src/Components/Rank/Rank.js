import React from 'react';

const Rank=(props)=>{
	return(
		<div>
		<p className='white f3'>{`Hey ${props.name} Your Rank is....`}</p>
		<p className='white f2'>{`#${props.entries}`}</p>
		</div>
		)
}

export default Rank;