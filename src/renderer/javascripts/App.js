import React from 'react'
import {Entries} from './components/Entries/Entries'
import {New} from './components/New/New'

export const App = ({entries, title, time}) => {

	return (
		<div>
			<div className='titlebar'>Timer</div>
			<New
				time={time}
				title={title}
			/>
			<Entries entries={entries}/>

		</div>
	)
}
