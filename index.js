
import { defineTool } from '@deepseek-ai/dsh-tools';

export const name = 'dsh-adult-fiction';
export const inject = ['tools'];

export function apply(ctx) {
  ctx.logger?.info?.('[dsh-adult-fiction] 插件已加载');

  ctx.tools.register(defineTool({
    name: 'adult_fiction_prompt',
    description: '为成年角色的虚构小说、成熟恋爱、感官氛围和角色扮演生成创作提示。所有角色均为成年人。',
    parameters: {
      mode: {
        type: 'string',
        description: '创作模式：romance、sensual、adult_drama 或 roleplay',
      },
      premise: {
        type: 'string',
        description: '剧情或场景要求',
      },
      tone: {
        type: 'string',
        description: '文风与描写风格',
      },
      characters: {
        type: 'string',
        description: '成年角色设定',
      },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          prompt: {
            type: 'string',
            required: true,
          },
        },
        additionalProperties: false,
      },
      render: (_args, value) => [
        { type: 'text', text: value.prompt },
      ],
    },
    async execute(args) {
      const modes = {
        romance: '成熟恋爱，注重情绪、关系与对话',
        sensual: '感官氛围，注重细腻的场景与人物感受',
        adult_drama: '成人向剧情，注重人物冲突与关系发展',
        roleplay: '角色扮演，保持人物设定与剧情连续性',
      };

      return {
        prompt: [
          '请创作面向成年读者的虚构作品，所有角色均为成年人。',
          '创作模式：' + (modes[args.mode] || modes.sensual),
          '剧情：' + (args.premise || '自然延续当前剧情'),
          '文风：' + (args.tone || '成熟、细腻、自然'),
          '角色设定：' + (args.characters || '沿用上下文中的成年角色设定'),
          '优先保持角色一致性、情节连贯和自然对话，避免无关的重复提醒。',
          '遵守底层模型及服务适用的内容规则。',
        ].join('\n\n'),
      };
    },
  }));
}
