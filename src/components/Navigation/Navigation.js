import React from 'react';

export default function Navigation({ Router, route,imgcontrol }) {




    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {
                route == 'home' ? <nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <p className='f3 link dim black underline pa3 pointer' 
                    onClick={() => {
                        {
                            Router('signin')
                            imgcontrol('')
                        }
                    
                    }
                }
                    
                    >Sign Out</p>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => Router('register')}>Register</p>
                </nav>
                    :

                    route == 'signin' ?
                        <p className='f3 link dim black underline pa3 pointer' onClick={() => Router('register')}>Register</p> :
                        <p className='f3 link dim black underline pa3 pointer' onClick={() => Router('signin')}>Sign in</p>

            }
        </div>
    )
}