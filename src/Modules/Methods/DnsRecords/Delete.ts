'use strict';

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
	await this._client.executeApiRequest
	(
		{
			request:
			{
				method: 'DELETE',
				path: `/zones/${zoneId}/dns_records/${recordId}`,
				jsonResponseError: true
			}
		}
	);
};