import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CodeligenceChatModel implements ICredentialType {
	name = 'CodeligenceChatModel';

	displayName = 'Codeligence Chat Model';

	documentationUrl = 'CodeligenceChatModel';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer ci-45dc727876cec58c80d7ebffc74fbe1e009fa325fc0aed484125a83e10bf98bd',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '{{$credentials.baseUrl}} || "https://api.codeligence.ai"',
			url: '/v1/models',
		},
	};
}