'use strict';

// External Modules
import { Domain, Definition as RequestDefinition } from '@chris-talman/request';

// Internal Modules
import { throwRejectionApiError } from 'src/Modules/ApiError';
import { DnsRecords } from './Methods/DnsRecords';

export class Client
{
	public readonly token: string;
	public readonly domain: Domain;
	constructor({token}: {token: Client['token']})
	{
		this.token = token;
		this.domain = new Domain
		(
			{
				path: 'https://api.cloudflare.com/client/v4',
				auth: () => 'Bearer ' + token
			}
		);
	};
	public async executeApiRequest({request}: {request: RequestDefinition})
	{
		let result: any;
		try
		{
			result = await throwRejectionApiError(this.domain.request(request));
		}
		catch (error)
		{
			throw error;
		};
		return result;
	};
	public dnsRecords = new DnsRecords({client: this});
};