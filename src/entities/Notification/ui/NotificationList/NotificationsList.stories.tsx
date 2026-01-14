import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { NotificationsList } from './NotificationsList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'entities/Notification/NotificationsList',
    component: NotificationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationsList>;

const Template: ComponentStory<typeof NotificationsList> = (args) => (
    <NotificationsList {...args} />
);
export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description:
                        'Поставь лайк и оставь комментарий под ulbi Tv',
                },
                {
                    id: '2',
                    title: 'Уведомление 2',
                    description:
                        'Поставь лайк и оставь комментарий под ulbi Tv',
                },
                {
                    id: '3',
                    title: 'Уведомление 3',
                    description:
                        'Поставь лайк и оставь комментарий под ulbi Tv',
                },
            ],
        },
    ],
};
