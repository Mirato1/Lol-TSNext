'use client';
import { seasonElo } from '@/constants';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Rank from './Rank';
import { CustomButton } from '..';
import { SummonerData } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchData } from '@/utils';
import { SlRefresh } from 'react-icons/sl';

const fetchUser = async (): Promise<SummonerData> => {
	const url = `https://${process.env.NEXT_PUBLIC_SV_1}/lol/summoner/v4/summoners/${process.env.NEXT_PUBLIC_SUMMONER}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

	return await fetchData({ url });
};

const UserContent = () => {
	const queryClient = useQueryClient();
	const { data, isFetching } = useQuery({
		queryKey: ['user'],
		queryFn: fetchUser,
	});

	const [waitTime, setWaitTime] = useState(60); // Tiempo de espera en segundos
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		if (isButtonDisabled && waitTime > 0) {
			const interval = setInterval(() => {
				setWaitTime((prevWaitTime) => prevWaitTime - 1);
			}, 1000);

			return () => clearInterval(interval);
		} else if (waitTime === 0) {
			setIsButtonDisabled(false);
			setWaitTime(60); // Reiniciar el tiempo de espera
		}
	}, [isButtonDisabled, waitTime]);

	if (!data) {
		return <h1 className='font-bold'>Loading...</h1>;
	}

	const handleClick = async () => {
		setIsButtonDisabled(true); // Deshabilitar el botón
		return await queryClient.refetchQueries();
	};

	return (
		<>
			<div className='absolute top-0 w-full h-96'>
				<div className='relative w-full h-full'>
					<div
						className='sticky w-full h-full bg-img'
						style={{
							backgroundPosition: '50% -50px',
						}}
					/>
					<div className='absolute top-0 w-full h-full gradient-bg' />
				</div>
			</div>
			<div className='h-24 w-full rounded-lg px-3 py-2 md:h-36 md:py-[18px] z-[2] '>
				<div className='flex self-center w-full h-full gap-5 '>
					<div className='flex min-w-[5rem] flex-col items-center justify-center self-center md:block md:min-w-[6rem] relative h-[5rem] w-20 md:h-24 md:w-24 object-contain'>
						<Image
							src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/profileicon/${data.profileIconId}.png`}
							alt='profile-icon'
							priority
							sizes='100vw'
							fill
							className='object-contain w-full h-auto shadow rounded-xl shadow-red-600 dark:shadow-cyan-600 '
						/>
						<div className='absolute w-full h-4 mx-auto my-0 -mt-3 text-center -bottom-1'>
							<span className='inline-block rounded-xl bg-red-700 px-2 py-0 text-[0.5rem] text-zinc-50  dark:bg-cyan-600 md:text-xs'>
								{data.summonerLevel}
							</span>
						</div>
					</div>
					<div className='flex flex-col justify-between w-full gap-1'>
						<div className='flex items-center gap-1 '>
							{seasonElo
								.slice(-2)
								.reverse()
								.map((el) => (
									<div className='text-center' key={el.season}>
										<span className='flex gap-1 rounded-md bg-red-700 text-[0.55rem] leading-3 font-medium text-zinc-50 dark:bg-cyan-600 sm:text-xs md:font-semibold bg-opacity-80 px-2 py-1'>
											<p>S{el.season}</p>
											<p>{el.elo}</p>
										</span>
									</div>
								))}
							<Rank />
						</div>
						<h2 className='text-base font-semibold md:text-2xl'>{data.name}</h2>
						<CustomButton
							title={isButtonDisabled ? `Available in ${waitTime} seconds` : 'Refresh'}
							textStyles='text-zinc-50 text-[10px] md:text-[14px] leading-[17px] font-bold'
							containerStyles={`self-start`}
							handleClick={handleClick}
							rightIcon={
								<SlRefresh className={`animate-spin animate-infinite ml-1  ${isFetching ? 'block' : 'hidden'} `} />
							}
							isDisabled={isButtonDisabled}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserContent;
