import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

interface ArticleParamsFormProps {
	handleChange: (name: string) => (selected: OptionType) => void;
	state: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	};
	applyForm: () => void;
	resetForm: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	handleChange,
	state,
	applyForm,
	resetForm,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef: React.RefObject<HTMLDivElement> = useRef(null);

	const handleMenuClick = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (e.target instanceof Node && !rootRef.current?.contains(e.target)) {
				isOpen && handleMenuClick();
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);

		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		applyForm();
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetForm();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleMenuClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
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
							selected={state.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={handleChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='font'
							selected={state.fontSizeOption}
							options={fontSizeOptions}
							title='Размер шрифта'
							onChange={handleChange('fontSizeOption')}
						/>
						<Select
							selected={state.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={handleChange('fontColor')}
						/>

						<Separator />

						<Select
							selected={state.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={handleChange('backgroundColor')}
						/>

						<Select
							selected={state.contentWidth}
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
