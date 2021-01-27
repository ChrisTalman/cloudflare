'use strict';

// External Modules
import { guaranteeResultJson } from '@chris-talman/request';

// Internal Modules
import { Resource } from 'src/Modules/Resource';
import { generateQueryParameters } from 'src/Modules/QueryParameters';

// Types
interface Parameters
{
	zoneId: string;
	options?: Options;
};
interface Options
{
	name?: string;
};

export async function browse(this: Resource, {zoneId, options}: Parameters)
{
	const queryParameters = generateQueryParameters(options ?? {});
	const result = await this._client.executeApiRequest
	(
		{
			request:
			{
				method: 'GET',
				path: `/zones/${zoneId}/dns_records?${queryParameters}`,
				jsonResponseSuccess: true,
				jsonResponseError: true
			}
		}
	);
	const json = guaranteeResultJson(result);
	return json;
};