/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios, { AxiosRequestConfig } from 'axios'

function get<T>(path: string, optCfg: AxiosRequestConfig = {}): Promise<T> {
	return axios.get<T>(path, optCfg).then(response => response.data)
}

const uid_ni_current_user = 'uid'

function post<T>(
	path: string,
	data: any,
	optCfg: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${uid_ni_current_user}`,
		},
	}
): Promise<T> {
	return axios.post<T>(path, data, optCfg).then(response => response.data)
}

/**
 * axios client
 * throws AxiosError for faild request
 */
const client = {
	get,
	post,
}

export default client
