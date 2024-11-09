import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class CodeligenceChatModel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CodeligenceChatModel',
		name: 'CodeligenceChatModel',
		icon: 'file:CodeligenceChatModelLogo.png',
		group: ['transform'],
		description: 'Codeligence Chat Model',
		defaults: {
			name: 'CodeligenceChatModel',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		version: 1,
		requestDefaults: {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ci-45dc727876cec58c80d7ebffc74fbe1e009fa325fc0aed484125a83e10bf98bd',
			},
			baseURL: 'https://api.codeligence.ai/v1',
		},
		properties: [
			{
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Resource One',
                        value: 'resourceOne'
                    },
                    {
                        name: 'Resource Two',
                        value: 'resourceTwo'
                    }
                ],
                default: 'resourceOne'
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                // Only show these operations for Resource One
                displayOptions: {
                    show: {
                        resource: [
                            'resourceOne'
                        ]
                    }
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create an instance of Resource One'
                    }
                ],
                default: 'create'
            }
		]
	};
}
