export const durationToTime = (duration) => {
	console.log(duration)
	if (duration || duration === 0) {
		const date = new Date(0)
		date.setSeconds(duration)
		return date.toISOString().substring(19, 11)
	}
	return
}