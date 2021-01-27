// External Modules
import { Domain } from '@chris-talman/request';

declare module '@chris-talman/cloudflare'
{
	// Client
	export class Client
	{
		public readonly token: string;
		public readonly domain: Domain;
		constructor({token}: {token: Client['token']});
		public readonly dnsRecords: DnsRecords;
	}

	// Resource
	class Resource
	{
		public readonly _client: Client;
		constructor({client}: {client: Client});
	}

	// DNS Records
	export class DnsRecords extends Resource
	{
		public browse(parameters: DnsRecordsBrowseParameters): Promise <DnsRecord>;
		public delete(parameters: {zoneId: string, recordId: string}): Promise <void>;
	}
	// DNS Records: Browse
	export interface DnsRecordsBrowseParameters
	{
		zoneId: string;
		options?: DnsRecordsBrowseParametersOptions;
	}
	export interface DnsRecordsBrowseParametersOptions
	{
		name?: string;
	}
	// DNS Record
	interface DnsRecord
	{
		id: string;
		name: string;
		type: string;
		content: string;
	}

	// API Error
	export class ApiError extends Error
	{
		public readonly errors: ApiErrorPayloadErrors;
	}
	interface ApiErrorPayloadErrors extends Array <ApiErrorPayloadError> {}
	interface ApiErrorPayloadError
	{
		code: number;
		message: string;
	}
}