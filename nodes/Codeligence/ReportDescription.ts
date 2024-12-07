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
		},
		{
			name: 'Report Citations',
			value: 'citations',
			action: 'Report Citations',
			routing: {
				request: {
					method: 'POST',
					url: '/v1/agent/submitCitations',
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
		placeholder: 'Chat ID',
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

const reportStatusOperations: INodeProperties[] = [
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		placeholder: 'Chat ID',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['status'],
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
		displayName: 'Status',
		name: 'status',
		type: 'string',
		placeholder: 'Status',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['status'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'status',
			},
		},
	},
];

const reportCitationsOperations: INodeProperties[] = [
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		placeholder: 'Chat ID',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['citations'],
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
		displayName: 'Citations',
		name: 'citations',
		default: {},
		description: 'Citations',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['citations'],
			},
		},
		options: [
			{
				name: 'citationsValues',
				displayName: 'Citations',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'name',
							},
						},
					},
					{
						displayName: 'Source',
						name: 'source',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'source',
							},
						},
					},
				],
			}
		],
		placeholder: 'Add Citation',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	}
]

export const reportFields: INodeProperties[] = [
	...reportOutputOperations,

	...reportStatusOperations,

	...reportCitationsOperations,
];
