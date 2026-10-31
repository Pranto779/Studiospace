import React from 'react';
import StudiosPage from '../_compponents/Studios';

const Studio = async() => {
    const res=await fetch('http://localhost:8000/studios')
    const data=await res.json()
    return (
        <div>
            <StudiosPage studios={data} ></StudiosPage>
        </div>
    );
};

export default Studio;