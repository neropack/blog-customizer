import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// сделать состояние страницы
	const [pageState, setPageState] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});
	// перенести состояния сюда
	const [formState, setFormState] = useState(defaultArticleState);

	const handleChange = (name: string) => (selected: OptionType) => {
		setFormState(
			(prev) =>
				(prev = {
					...prev,
					[name]: selected,
				})
		);
	};

	// надо как-то получить данные из формы
	const applyForm = () => {
		setPageState({
			'--font-family': formState.fontFamilyOption.value,
			'--font-size': formState.fontSizeOption.value,
			'--font-color': formState.fontColor.value,
			'--container-width': formState.contentWidth.value,
			'--bg-color': formState.backgroundColor.value,
		});
	};

	// ресет формы и стилей
	const resetForm = () => {
		setFormState(defaultArticleState);
		setPageState({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		});
	};

	return (
		<main className={clsx(styles.main)} style={pageState as CSSProperties}>
			<ArticleParamsForm
				handleChange={handleChange}
				state={formState}
				applyForm={applyForm}
				resetForm={resetForm}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
