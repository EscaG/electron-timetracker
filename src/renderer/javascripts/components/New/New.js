import React, {useEffect, useState} from 'react'
import {Title} from "./title";
import {Actions} from "./actions";
import {nanoid} from 'nanoid';
import {DateTime} from 'luxon';


export const New = ({time: defaultTime, title: defaultTitle}) => {
	const [title, setTitle] = useState(defaultTitle);
	const [time, setTime] = useState(defaultTime);
	const [running, setRunning] = useState(false);


	useEffect(() => {
		window.Timer.onLoaded((_, data) => {
			// setTitle(data.title)
			setTime(data.time)
			setRunning(true)
		})
	}, [])


	const handleStartTimer = () => {
		setRunning(true)
		window.Timer.onStart({title})
		// window.startTimer()

	}
	const handleStopTimer = () => {
		// window.Timer.saveEntry({
		// 	id: nanoid(),
		// 	duration: time,
		// 	title,
		// 	project: 'none',
		// 	createAt: DateTime.local().toISO()
		// })
		setRunning(false)
		setTime(0)
		setTitle('')
		window.Timer.onStop()
	}


	return (
		<div className='new-entry'>
			<Title
				title={title}
				setTitle={setTitle}
			/>
			<Actions
				disabled={!title}
				duration={time || 0}
				running={running}
				onStartTimer={handleStartTimer}
				onStopTimer={handleStopTimer}
			/>
		</div>
	)
}
