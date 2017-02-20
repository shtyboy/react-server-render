import {Router } from "express";
import {fetchOptions, initialOptions } from "./routerConfig";
import {castboxHostName, everestHostName} from "../../config/fetch";
import 'isomorphic-fetch';

const router = Router();

router.use('/api/jump', apiJump);

function apiJump(req, res) {
  let hostName = (req.url.indexOf('/data/') === 0)?everestHostName:castboxHostName;
	let link = req.query.jumplink || `${hostName}${req.url}`;
  console.log('==>apiJump==', link);
	fetch(link, fetchOptions)
		.then(response => {
			if (response.status >= 400) {
				res.send(`Bad response from ${link}`);
			}
			return response.json();
		})
		.then(json => res.json(json));
}
export default router;
