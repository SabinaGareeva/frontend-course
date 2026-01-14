import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page data-testid="MainPage">
            <Counter />
            <div />
        </Page>
    );
};

export default MainPage;
