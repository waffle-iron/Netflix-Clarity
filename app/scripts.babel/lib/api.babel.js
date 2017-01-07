import {API_ENDPOINT} from './constants.babel';
export default function(name, year){
// let title = "The OA";
// let year = 2016
	let _name = name.replace(/ /g, "-");
	const url = `${API_ENDPOINT}query?s=${_name}&y=${year}`;
	console.log(url);
	return fetch(url)
	.then((res) =>{
		return res.json();
	})
	.catch((err) =>{
		//Todo: Report it
		console.log(err);
	})
}