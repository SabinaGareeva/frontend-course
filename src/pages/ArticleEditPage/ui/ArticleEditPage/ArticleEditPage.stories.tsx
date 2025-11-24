import { ComponentMeta, ComponentStory } from '@storybook/react';

import ArticlesEditPage from './ArticleEditPage';

export default {
    title: 'pages/ArticleEditPage/ArticleEditPage',
    component: ArticlesEditPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesEditPage>;

const Template: ComponentStory<typeof ArticlesEditPage> = (args) => (
    <ArticlesEditPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
