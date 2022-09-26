import React from 'react';

const ImageLinkForm=(props)=>{
	return(
		<div>
		<p>{'The Magic Brain Will Detect Faces in your Pictures. Give it a try'}</p>
		<div>
		<input type="text" onChange={props.onSearchChange}/>
		<button onClick={props.onButtonClick}>Submit</button>
		</div>
		</div>
		)
}

export default ImageLinkForm;