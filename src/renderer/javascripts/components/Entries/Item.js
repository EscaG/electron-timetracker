import React from 'react';
import {durationToTime} from "../../helpers/time";

export const Item = ({project, duration, title}) => {
	console.log(isNaN(duration))
	return (
		<div className={'entry'}>
			<div className={'details'}>
				<div className={'primary'}>{title}</div>
				<div className={'secondary'}>{project}</div>
			</div>
			<div className={'actions'}>
				<div className={'time'}>{!isNaN(duration) && durationToTime(duration)}</div>
			</div>
		</div>
	);
};

