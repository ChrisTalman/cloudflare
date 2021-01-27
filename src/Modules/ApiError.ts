'use strict';

// External Modules
import { RequestJsonError } from '@chris-talman/request';

// Types
interface ApiErrorPayload
{
	success: boolean;
	errors: Array <ApiErrorPayloadError>;
	messages: Array <any>;
	result: any;
};
interface ApiErrorPayloadErrors extends Array <ApiErrorPayloadError> {};
interface ApiErrorPayloadError
{
	code: number;
	message: string;
};

export class ApiError extends Error
{
	public readonly errors: ApiErrorPayloadErrors;
	constructor({error}: {error: RequestJsonError <ApiErrorPayload>})
	{
		const firstErrorMessage = error.json.errors[0]?.message;
		const formattedMessage = 'Cloudflare Error: ' + (firstErrorMessage ?? 'Unknown');
		super(formattedMessage);
		this.errors = error.json.errors;
	};
};

/** If promise rejects with an API error, the error is thrown in a more readable form. */
export async function throwRejectionApiError <GenericResolution> (promise: Promise<GenericResolution>)
{
	let result: GenericResolution;
	try
	{
		result = await promise;
	}
	catch (error)
	{
		throwApiError(error);
		throw new Error('throwApiError() failed');
	};
	return result;
};

export function throwApiError(error: any)
{
	const apiError: RequestJsonError <ApiErrorPayload> = error;
	if (apiError instanceof RequestJsonError && Array.isArray(apiError.json.errors))
	{
		throw new ApiError({error: apiError});
	}
	else
	{
		throw error;
	};
};