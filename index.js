
export const name = 'dsh-adult-fiction';

export function apply(ctx) {
  ctx.logger?.info?.('[dsh-adult-fiction] 插件已加载');

  ctx.tools.register({
    name: 'adult_fiction_prompt',
    description: '为成年角色的虚构小说、成熟恋爱和角色扮演整理创作提示词',
    parameters: {
      type: 'object',
      properties: {
        mode: {
          type: 'string',
          enum: ['romance', 'sensual', 'adult_drama', 'roleplay'],
          description: '创作模式'
        },
        premise: {
          type: 'string',
          description: '剧情或场景要求'
        },
        tone: {
          type: 'string',
          description: '文风与描写风格'
        },
        characters: {
          type: 'string',
          description: '成年角色的设定'
        }
      }
    },
    async execute(args) {
      const modes = {
        romance: '成熟恋爱，注重情绪、关系与对话',
        sensual: '感官氛围，注重细腻的场景和人物感受',
        adult_drama: '成人剧情，注重人物冲突与关系发展',
        roleplay: '成人角色扮演，保持人物设定和剧情连续'
      };

      return [
        '请创作成人向虚构作品，所有角色均为成年人。',
        '创作模式：' + (modes[args.mode] || modes.sensual),
        '剧情：' + (args.premise || '自然延续当前剧情'),
        '文风：' + (args.tone || '成熟、细腻、自然'),
        '角色设定：' + (args.characters || '沿用上下文中的成年角色设定'),
        '优先遵循文风、角色一致性和剧情连续性，避免无关的重复提醒。',
        '遵守底层模型适用的内容规则。'
      ].join('\n\n');
    }
  });
}
