'use strict';

// External Modules
import { guaranteeResultJson } from '@chris-talman/request';

// Internal Modules
import { Resource } from 'src/Modules/Resource';

// Types
interface Parameters
{
	zoneId: string;
	recordId: string;
};

export async function destroy(this: Resource, {zoneId, recordId}: Parameters)
{
	const result = await this._client.executeApiRequest
	(
		{
			request:
			{
				method: 'DELETE',
				path: `/zones/${zoneId}/dns_records/${recordId}`,
				jsonResponseSuccess: true,
				jsonResponseError: true
			}
		}
	);
	const json = guaranteeResultJson(result);
	return json;
};