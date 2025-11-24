import { classNames } from 'shared/lib/classNames/classNames';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';

import { VStack } from 'shared/ui/Stack';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo(
    ({ className, isLoading, comments }: CommentListProps) => {
        const { t } = useTranslation();
        if (isLoading) {
            return (
                <VStack
                    gap="16"
                    max
                    className={classNames('', {}, [className])}
                >
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </VStack>
            );
        }
        return (
            <VStack gap="16" max className={classNames('', {}, [className])}>
                {comments?.length ? (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            isLoading={isLoading}
                            comment={comment}
                        />
                    ))
                ) : (
                    <Text text={t('Комментарий отсутствует')} />
                )}
            </VStack>
        );
    }
);
