import { NodeConnectionType } from 'n8n-workflow';

import type {
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

type LmOpenAiOptions = {
	baseURL?: string;
	frequencyPenalty?: number;
	maxTokens?: number;
	presencePenalty?: number;
	temperature?: number;
	timeout?: number;
	maxRetries?: number;
	topP?: number;
};

export class CodeligenceChatModel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Codeligence Chat Model',
		name: 'CodeligenceChatModel',
		icon: 'file:CodeligenceChatModelLogo.png',
		group: ['transform'],
		version: 1,
		description: 'Generates completions using the OpenAI API',
		defaults: {
			name: 'CodeLigence Chat Model',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Language Models', 'Root Nodes'],
				'Language Models': ['Text Completion Models'],
			},
		},
		inputs: [],
		outputs: [NodeConnectionType.AiLanguageModel],
		outputNames: ['Model'],
		credentials: [
			{
				name: 'openAiApi',
				required: true,
			},
		],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ci-45dc727876cec58c80d7ebffc74fbe1e009fa325fc0aed484125a83e10bf98bd',
            },
			baseURL:
				'={{ $parameter.options?.baseURL?.split("/").slice(0,-1).join("/") || "https://api.codeligence.ai/v1" }}',
		},
		properties: [
			{
				displayName: 'Model',
				name: 'model',
				type: 'resourceLocator',
				default: { mode: 'list', value: 'gpt-3.5-turbo-instruct' },
				required: true,
				description:
					'The model which will generate the completion. <a href="https://beta.openai.com/docs/models/overview">Learn more</a>.',
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'openAiModelSearch',
						},
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'model',
						value: '={{$parameter.model.value}}',
					},
				},
			},
			{
				displayName:
					'When using non OpenAI models via Base URL override, not all models might be chat-compatible or support other features, like tools calling or JSON response format.',
				name: 'notice',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						'/options.baseURL': [{ _cnd: { regex: '.*' } }],
					},
				},
			},
			{
				displayName: 'Options',
				name: 'options',
				placeholder: 'Add Option',
				description: 'Additional options to add',
				type: 'collection',
				default: {},
				options: [
					{
						displayName: 'Frequency Penalty',
						name: 'frequencyPenalty',
						default: 0,
						typeOptions: { maxValue: 2, minValue: -2, numberPrecision: 1 },
						description:
							"Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim",
						type: 'number',
					},
					{
						displayName: 'Maximum Number of Tokens',
						name: 'maxTokens',
						default: -1,
						description:
							'The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 32,768).',
						type: 'number',
						typeOptions: {
							maxValue: 32768,
						},
					},
					{
						displayName: 'Presence Penalty',
						name: 'presencePenalty',
						default: 0,
						typeOptions: { maxValue: 2, minValue: -2, numberPrecision: 1 },
						description:
							"Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics",
						type: 'number',
					},
					{
						displayName: 'Sampling Temperature',
						name: 'temperature',
						default: 0.7,
						typeOptions: { maxValue: 1, minValue: 0, numberPrecision: 1 },
						description:
							'Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.',
						type: 'number',
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						default: 60000,
						description: 'Maximum amount of time a request is allowed to take in milliseconds',
						type: 'number',
					},
					{
						displayName: 'Max Retries',
						name: 'maxRetries',
						default: 2,
						description: 'Maximum number of retries to attempt',
						type: 'number',
					},
					{
						displayName: 'Top P',
						name: 'topP',
						default: 1,
						typeOptions: { maxValue: 1, minValue: 0, numberPrecision: 1 },
						description:
							'Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered. We generally recommend altering this or temperature but not both.',
						type: 'number',
					},
				],
			},
		],
	};

	methods = {
		listSearch: {
			async openAiModelSearch(this: ILoadOptionsFunctions) {
				const results = [];

				const options = this.getNodeParameter('options', {}) as LmOpenAiOptions;

				let uri = 'https://api.codeligence.ai/v1/models';

				if (options.baseURL) {
					uri = `${options.baseURL}/models`;
				}

				const { data } = (await this.helpers.requestWithAuthentication.call(this, 'openAiApi', {
					method: 'GET',
					uri,
					json: true,
				})) as { data: Array<{ owned_by: string; id: string }> };

				for (const model of data) {
					if (!options.baseURL && !model.owned_by?.startsWith('system')) continue;
					results.push({
						name: model.id,
						value: model.id,
					});
				}

				return { results };
			},
		},
	};
}
