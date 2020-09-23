import styled from 'styled-components'

export const Center = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	min-height: 100vh;
	background: 0b0b0b;
`
export const Spinner = styled.div`
	display: block;
	position: relative;
	width: 125px;
	height: 125px;
	border-radius: 50%;
	border: 4px solid transparent;
	border-top: 4px solid white;
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;

	&::before,
	&::after {
		content: '';
		position: absolute;
		border-radius: 50%;
		border: 4px solid transparent;
	}

	&::before {
		top: 5px;
		left: 5px;
		right: 5px;
		bottom: 5px;
		border-top-color: white;
		-webkit-animation: spin 3s linear infinite;
		animation: spin 3.5s linear infinite;
	}

	&::after {
		top: 15px;
		left: 15px;
		right: 15px;
		bottom: 15px;
		border-top-color: white;
		-webkit-animation: spin 1.5s linear infinite;
		animation: spin 1.75s linear infinite;
	}
`
