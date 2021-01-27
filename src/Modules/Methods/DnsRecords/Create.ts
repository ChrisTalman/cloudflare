'use strict';

// External Modules
import { guaranteeResultJson } from '@chris-talman/request';

// Internal Modules
import { Resource } from 'src/Modules/Resource';

// Types
interface Parameters
{
	zoneId: string;
	record: object;
};

export async function create(this: Resource, {zoneId, record: object}: Parameters)
{
	const result = await this._client.executeApiRequest
	(
		{
			request:
			{
				method: 'POST',
				path: `/zones/${zoneId}/dns_records`,
				body: object,
				jsonResponseSuccess: true,
				jsonResponseError: true
			}
		}
	);
	const json = guaranteeResultJson(result);
	return json;
};