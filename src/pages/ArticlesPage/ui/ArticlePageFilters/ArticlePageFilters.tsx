import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleTypeTabs,
    ArticleView,
    ArticleViewSelector,
} from 'entities/Article';

import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlePageFilters.module.scss';

interface ArticlePageFiltersProps {
    className?: string;
}

export const ArticlePageFilters = memo(
    ({ className }: ArticlePageFiltersProps) => {
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const view = useSelector(getArticlesPageView);
        const sort = useSelector(getArticlesPageSort);
        const order = useSelector(getArticlesPageOrder);
        const search = useSelector(getArticlesPageSearch);
        const type = useSelector(getArticlesPageType);
        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, [dispatch]);
        const debouncedFetchData = useDebounce(fetchData, 500);
        const onChangeView = useCallback(
            (view: ArticleView) => {
                dispatch(articlesPageActions.setView(view));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData]
        );
        const onChangeSort = useCallback(
            (newSort: ArticleSortField) => {
                dispatch(articlesPageActions.setSort(newSort));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData]
        );
        const onChangeOrder = useCallback(
            (newOrder: SortOrder) => {
                dispatch(articlesPageActions.setOrder(newOrder));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData]
        );
        const onChangeSearch = useCallback(
            (search: string) => {
                dispatch(articlesPageActions.setSearch(search));
                dispatch(articlesPageActions.setPage(1));
                debouncedFetchData();
            },
            [debouncedFetchData, dispatch]
        );
        const onChangeType = useCallback(
            (value: ArticleType) => {
                dispatch(articlesPageActions.setType(value));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData]
        );

        return (
            <div
                className={classNames(cls.ArticlePageFilters, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input
                        onChange={onChangeSearch}
                        value={search}
                        placeholder={t('Поиск')}
                    />
                </Card>
                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
            </div>
        );
    }
);
