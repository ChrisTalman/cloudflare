'use strict';

// Internal Modules
import { Client } from 'src/Modules/Client';
import { Resource } from 'src/Modules/Resource';
import { browse } from './Browse';
import { create } from './Create';
import { destroy } from './Delete';

export class DnsRecords extends Resource
{
	public browse = browse;
	public create = create;
	public delete = destroy;
	constructor({client}: {client: Client})
	{
		super({client});
	};
};