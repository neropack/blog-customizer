import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type TPageState = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

interface ArticleParamsFormProps {
	setPageState: (pageState: TPageState) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	setPageState,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef: React.RefObject<HTMLDivElement> = useRef(null);

	const [formState, setFormState] = useState(defaultArticleState);

	const handleMenuClick = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const applyForm = () => {
		setPageState({
			'--font-family': formState.fontFamilyOption.value,
			'--font-size': formState.fontSizeOption.value,
			'--font-color': formState.fontColor.value,
			'--container-width': formState.contentWidth.value,
			'--bg-color': formState.backgroundColor.value,
		});
	};

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

	useEffect(() => {
		if (!isMenuOpen) return;
		const handleOutsideClick = (e: MouseEvent) => {
			if (e.target instanceof Node && !rootRef.current?.contains(e.target)) {
				isMenuOpen && handleMenuClick();
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);

		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isMenuOpen]);

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		applyForm();
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetForm();
	};

	const handleChange = (name: string) => (selected: OptionType) => {
		setFormState((prev) => ({
			...prev,
			[name]: selected,
		}));
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleMenuClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<div className={styles.topContainer}>
						<Text as='h2' size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={handleChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='font'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							title='Размер шрифта'
							onChange={handleChange('fontSizeOption')}
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={handleChange('fontColor')}
						/>

						<Separator />

						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={handleChange('backgroundColor')}
						/>

						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={handleChange('contentWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
