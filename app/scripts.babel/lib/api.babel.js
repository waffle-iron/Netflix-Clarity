import {API_ENDPOINT} from './constants.babel';
export default function(name, year){
	let _name = name.replace(/ /g, "-");
	const url = `${API_ENDPOINT}query?s=${_name}&y=${year}`;
	return fetch(url)
	.then((res) =>{
		return res.json();
	})
	.catch((err) =>{
		//Todo: Report it to Sentry
		console.error(err);
	})
}