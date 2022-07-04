import React from 'react'
import {Item} from "./Item";

export const Entries = ({entries}) => {
	console.log(entries)
	return (
		<div className={'entries-scroll'}>
			{!entries && <div className={'empty-state'}>No Entries</div>}
			{entries
				? entries.reverse().map(entry =>
					<div className='entries' key={entry.id}>
						{entry
							? <Item
								key={entry.id}
								title={entry.title}
								duration={entry.duration}
								project={entry.project}
							/>
							: null
						}
					</div>
				)
				: null}

		</div>
	)
}
