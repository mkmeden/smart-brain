import React from 'react';
// import Tilt from 'react-tilted'
import './FaceRecognition.css'

 export default function FaceRecognition({imgURL , box})
{
    // console.log(`boom: ${imgURL}`)
    
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' width='500px' height='auto' src = {imgURL}/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}