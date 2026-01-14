import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationsList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationsListProps {
    className?: string;
}

export const NotificationsList = memo(
    ({ className }: NotificationsListProps) => {
        const { t } = useTranslation();
        const { data, isLoading } = useNotifications(null, {
            pollingInterval: 10000,
        });
        if (isLoading) {
            return (
                <VStack
                    gap="16"
                    max
                    className={classNames(cls.NotificationsList, {}, [
                        className,
                    ])}
                >
                    <Skeleton width="100%" border="8px" height="80px" />
                    <Skeleton width="100%" border="8px" height="80px" />
                    <Skeleton width="100%" border="8px" height="80px" />
                </VStack>
            );
        }
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationsList, {}, [className])}
            >
                {data?.map((item) => (
                    <NotificationItem key={item.id} item={item} />
                ))}
            </VStack>
        );
    }
);
