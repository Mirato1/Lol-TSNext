'use client';
import { CustomButtonProps } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CustomButton = ({
	title,
	containerStyles,
	handleClick,
	btnType,
	textStyles,
	rightIcon,
	isDisabled,
}: CustomButtonProps) => {
	return (
		<motion.button
			disabled={false}
			type={btnType ?? 'button'}
			className={`custom-btn ${containerStyles}`}
			onClick={handleClick}
			whileTap={{ scale: 0.95 }}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
		>
			<span className={` flex-1 ${textStyles} `}>{title}</span>
			{rightIcon && (
				<div className='relative h-6 w-6 '>
					<Image src={rightIcon} alt='right icon' sizes='100vw' fill className='h-auto w-full object-contain' />
				</div>
			)}
		</motion.button>
	);
};

export default CustomButton;
