import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { reportOperations, reportFields } from './ReportDescription';

export class Codeligence implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Codeligence',
		name: 'codeligence',
		icon: 'file:Codeligence.png',
		group: ['transform'],
		version: 1,
		description: 'Consume Codeligence API',
		defaults: {
			name: 'Codeligence',
			color: '#772244',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'codeligenceChatModel',
				required: true,
			},
		],
		requestDefaults: {
			headers: {
				'content-type': 'application/json',
			},
			baseURL: '={{$credentials.baseUrl}}',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: '',
				noDataExpression: true,
				options: [
					{
						name: 'Report',
						value: 'report',
					},
				]
			},

			...reportOperations,
			...reportFields,
		]
	};
}
