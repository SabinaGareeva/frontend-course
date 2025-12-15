import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input/Input';
import { ListBox } from '@/shared/ui/Popups/components/ListBox/ListBox';
import { HStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page/Page';

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page>
            <div />
        </Page>
    );
};

export default MainPage;
