import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	// создать адаптированный под наш
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form className={styles.form}>
					<div className={styles.topContainer}>
						<Text as='h2' size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							selected={props.state.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={props.handleChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='font'
							selected={props.state.fontSizeOption}
							options={fontSizeOptions}
							title='Размер шрифта'
							onChange={props.handleChange('fontSizeOption')}
						/>
						<Select
							selected={props.state.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={props.handleChange('fontColor')}
						/>

						<Separator />

						<Select
							selected={props.state.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={props.handleChange('backgroundColor')}
						/>

						<Select
							selected={props.state.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={props.handleChange('contentWidth')}
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
