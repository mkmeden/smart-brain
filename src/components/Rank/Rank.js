import React from 'react';
// import './ImageLinkForm.css'


export default function Rank({ entries, name }) {
    return (
        <div >
            <div className='white f3'>
                {`${name} , your current count is.. `}
            </div>
            <div className='white f1'>
                {entries}
            </div>
        </div>
    )
}