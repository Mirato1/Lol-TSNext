'use client';
import { CustomButtonProps } from '@/types';
import { motion } from 'framer-motion';

const CustomButton = ({
	title,
	containerStyles,
	handleClick,
	btnType,
	textStyles,
	rightIcon,
	isDisabled = false,
}: CustomButtonProps) => {
	return (
		<motion.button
			disabled={isDisabled}
			type={btnType ?? 'button'}
			className={`custom-btn ${isDisabled && 'custom-btn__disabled'} ${containerStyles}`}
			onClick={handleClick}
			whileTap={{ scale: 0.97 }}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
		>
			<span className={`${textStyles}`}>{title}</span>
			{rightIcon && <>{rightIcon}</>}
		</motion.button>
	);
};

export default CustomButton;
