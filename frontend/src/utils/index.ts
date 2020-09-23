export const updateByPropertyName = (
	propertyName: string,
	value: any
) => (): object => ({
	[propertyName]: value,
})
