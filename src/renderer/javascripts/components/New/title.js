import React from 'react';

export const Title = ({title,setTitle}) => {

    return (
        <div className='details'>
			<textarea
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                cols="0"
                rows="1"
                placeholder={'Start new activity'}
            ></textarea>
        </div>
    );
};

