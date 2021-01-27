'use strict';

// External Modules
import { URLSearchParams } from 'url';

export function generateQueryParameters(object: object)
{
	const queryParameters = new URLSearchParams();
	for (let [ key, value] of Object.entries(object))
	{
		queryParameters.set(key, value);
	};
	const queryParametersString = queryParameters.toString();
	return queryParametersString;
};