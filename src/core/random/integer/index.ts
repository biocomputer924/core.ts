export default async (
	min: number,
	max: number
) =>
	Math.floor(Math.random() * (max + 1 - min)) + min
