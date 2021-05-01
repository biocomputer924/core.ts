export default (x: Date) => {
	if (x instanceof Date) {
		return x.getUTCDay() == 6
	}
}
