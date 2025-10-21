import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleViewSelector } from 'entities/Article';
import { ArticleView } from 'entities/Article/model/types/article';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from '../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
    getArticlesPageError,
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}
const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch]
    );
    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);
    useInitialEffect(() => {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({ page: 1 }));
    });
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    articles={articles}
                    view={view}
                />
            </Page>
        </DynamicModuleLoader>
    );
};
export default memo(ArticlesPage);
