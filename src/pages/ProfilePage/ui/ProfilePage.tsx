import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Text } from '@/shared/ui/Text/Text';

import { Page } from '@/widgets/Page/Page';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { EditableProfileCard } from '@/features/editableProfileCard';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};
export default ProfilePage;
