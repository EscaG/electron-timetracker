import React from 'react';
import classNames from "classnames";
import PlayIcon from './../../../images/play.svg'
import StopIcon from './../../../images/stop.svg'
import {durationToTime} from "../../helpers/time";

export const Actions = ({disabled, duration, running, onStartTimer, onStopTimer}) => {
   console.log(duration)
    const onClick = () => {
        if (disabled) return
        running ? onStopTimer() : onStartTimer()
    }



    return (
        <div className={'actions'}>
            <div className={'time'}>
                {durationToTime(duration)}
            </div>
            <div
                className={classNames('trigger', {disabled})}
                onClick={onClick}
            >
                {running
                    ? <StopIcon width={'24'} height={'24'}/>
                    : <PlayIcon width={'24'} height={'24'}/>
                }
            </div>
        </div>
    );
};

