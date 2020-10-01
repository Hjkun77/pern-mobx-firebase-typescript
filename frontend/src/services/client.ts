/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios, { AxiosRequestConfig } from 'axios'
import { auth } from '../config/firebase'

function get<T>(path: string, optCfg: AxiosRequestConfig = {}): Promise<T> {
	return axios.get<T>(path, optCfg).then(response => response.data)
}

var accessToken: string | null = null

auth.currentUser?.getIdToken().then(token => (accessToken = token))

function post<T>(
	path: string,
	data: any,
	optCfg: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
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
