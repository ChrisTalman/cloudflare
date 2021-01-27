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
		public browse(parameters: DnsRecordsBrowseParameters): Promise <DnsRecordsBrowseResult>;
		public create(parameters: DnsRecordsCreateParameters): Promise <DnsRecordsCreateResult>;
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
	interface DnsRecordsBrowseResult
	{
		result: Array <DnsRecord>;
	}
	// DNS Records: Create
	export interface DnsRecordsCreateParameters
	{
		zoneId: string;
		record?: DnsRecordsCreateParametersRecord;
	}
	export interface DnsRecordsCreateParametersRecord
	{
		type: string;
		name: string;
		content: string;
		ttl: number;
		priority?: number;
		proxied?: boolean;
	}
	interface DnsRecordsBrowseResult
	{
		result: Array <DnsRecord>;
	}
	interface DnsRecordsCreateResult
	{
		result: DnsRecord;
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