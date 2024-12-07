import type {
	INodeProperties,
} from 'n8n-workflow';

export const reportOperations: INodeProperties[] = [{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['report'],
		},
	},
	options: [
		{
			name: 'Report Output',
			value: 'output',
			action: 'Report Output',
			routing: {
				request: {
					method: 'POST',
					url: '/v1/agent/submitTaskOutput',
				}
			}
		},
		{
			name: 'Report Status',
			value: 'status',
			action: 'Get Report Status',
			routing: {
				request: {
					method: 'POST',
					url: '/v1/agent/submitStatus',
				}
			}
		}
	],
	default: 'output',
}];

const reportOutputOperations: INodeProperties[] = [
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		placeholder: '1',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['output'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'chatId',
			},
		},
	},
	{
		displayName: 'Task Name',
		name: 'taskName',
		type: 'string',
		placeholder: 'Task Name',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['output'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'taskName',
			},
		},
	},
	{
		displayName: 'Output',
		name: 'output',
		type: 'string',
		placeholder: 'Output',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['output'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'output',
			},
		},
	},
];

export const reportFields: INodeProperties[] = [
	...reportOutputOperations,
];
