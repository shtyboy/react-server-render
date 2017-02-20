import {
	APP_TITLE
} from '../actions/app';

export default function app(state = {}, action) {
	switch (action.type) {
		case APP_TITLE:
			{
				return Object.assign({}, state, {
					title: action.data
				});
			}
		default:
			return state;
	}
}
