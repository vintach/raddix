import type { PlopGeneratorConfig } from '@crutchcorn/plop';

const LIST_OF_CATEGORIES = [
  'interactions',
  'utilities',
  'state',
  'browser',
  'effects',
  'aria'
] as const;

export const createHook = (): PlopGeneratorConfig => ({
  description: 'Create a hook',
  prompts: [
    {
      type: 'input',
      name: 'hookName',
      message: 'What is your hook named?',
      validate: (value: string) => {
        if (value.trim().length < 2) {
          return 'The hook name is necessary';
        }

        if (value.startsWith('use')) {
          return 'It is not necessary to add the "use" prefix, just enter the name of your hook';
        }

        return true;
      }
    },
    {
      type: 'input',
      name: 'hookDescription',
      message: 'What is your hook description?'
    },
    {
      type: 'list',
      name: 'hookCategory',
      message: 'What is your hook category?',
      choices: LIST_OF_CATEGORIES
    }
  ],
  actions: [
    {
      type: 'addMany',
      destination: '../packages/{{hookCategory}}/use-{{kebabCase hookName}}',
      base: '../templates/create-hook',
      templateFiles: '../templates/create-hook/**'
    }
  ]
});
