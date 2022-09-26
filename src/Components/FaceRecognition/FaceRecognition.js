import React from 'react';
import './FaceRecognition.css'

const FaceRecognition=(props)=>{
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' width='500px' height='auto' src={props.imageSource}/>
				<div className='bounding-box' style={{top:props.box.toprow,bottom:props.box.bottomrow,left:props.box.leftcol,right:props.box.rightcol}}></div>
			</div>
		</div>
		);
}

export default FaceRecognition;