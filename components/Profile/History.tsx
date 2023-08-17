import { spells, items } from '@/constants';
import { Match, Rune } from '@/types';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

async function fetchJSON(url: RequestInfo | URL) {
  const response = await fetch(url, { cache: 'no-store' });
  return response.json();
}

async function fetchMatchesData() {
  try {
    const runes = await fetchJSON(`${process.env.API_URL}${process.env.API_PATCH}/data/es_ES/runesReforged.json`);
    const gamesId = await fetchJSON(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${process.env.PUUID}/ids?queue=420&start=0&count=10&api_key=${process.env.API_KEY}`
    );

    if (!gamesId) {
      return { notFound: true };
    }

    const history = await Promise.all(
      gamesId.map(async (result: any) => {
        const match = await fetchJSON(`https://americas.api.riotgames.com/lol/match/v5/matches/${result}?api_key=${process.env.API_KEY}`);
        const user = match.info?.participants.find((x: { summonerName: string }) => x.summonerName === 'TwTV Mirato');

        if (user) {
          let summoners = []
          summoners.push(spells?.find((x) => x.id === user?.summoner1Id)?.name);
          summoners.push(spells?.find((x) => x.id === user?.summoner2Id)?.name);
          user.summoners = summoners;
          let runesArr: { id: any; slots: { runes: any[]; }[]}[] = [];
          runes.forEach((rune: { id: any; slots: { runes: any[]; }[]; }) => {
            const primaryStyle = user.perks.styles.find((r: { description: string; style: any }) => r.description === 'primaryStyle' && r.style === rune.id);
            if (primaryStyle) {
              runesArr.push(rune.slots[0].runes.find((z: { id: any }) => z.id === primaryStyle.selections[0].perk));
            }
            const subStyle = user.perks.styles.find((r: { description: string; style: any }) => r.description === 'subStyle' && r.style === rune.id);
            if (subStyle) {
              runesArr.push(rune)
            }
            user.runes = runesArr;
          });

          match.info.user = user;
        }

        return match;
      })
    );

    return { gamesId, history };
  } catch (error) {
    return { error };
  }
}

export async function History () {
  const {notFound, error, history} = await fetchMatchesData();
  
  if (notFound) {
    return <div>NotFound</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }
  
	return (
		<div className='flex flex-col gap-2 flex-1 w-full md:w-8/12'>
			{history?.map((el) => {
				return (
					<div
						key={el.metadata.matchId}
						className={`w-full rounded-md border-l-[6px] p-[6px] ${
							el.info?.user?.win
								? 'border-blue-600 bg-blue-200 dark:bg-blue-500'
								: 'border-red-600 bg-red-200  dark:bg-red-500'
						} flex gap-1 dark:bg-opacity-30 h-24 `}
					>
						<div className='flex h-full max-w-[4rem] flex-col justify-evenly lg:max-w-[7rem]  '>
							<p className='text-[0.5rem] font-semibold text-gray-800 dark:text-gray-400  md:text-[.65rem] lg:text-xs'>
								Ranked Solo
							</p>
							{/* <Tooltip text={moment.unix(el.info.gameEndTimestamp / 1000).format('ddd DD MMM YYYY hh:mm')}> */}
								<p className='text-[0.5rem] text-gray-800 dark:text-gray-400 md:text-[.65rem] lg:text-xs '>
									{moment(el.info.gameEndTimestamp).fromNow()}
								</p>
							{/* </Tooltip> */}

							<hr
								className={`mx-0 my-[2px] h-[0.5px] w-12 ${
									el.info.user.win ? 'border-blue-400/50 ' : 'border-red-400/50 '
								} `}
							/>
							<div>
								<p
									className={`text-[0.5rem] font-semibold md:text-[.65rem] lg:text-xs ${
										el.info.user.win ? 'text-blue-500' : 'text-red-500'
									}`}
								>
									{el.info.user.win ? 'Victoria' : 'Derrota'}
								</p>
								<p className='text-[0.5rem] text-gray-800 dark:text-gray-400 md:text-[.65rem] lg:text-xs'>
									{Math.floor(el.info.gameDuration / 60) +
										':' +
										('0' + Math.round(el.info.gameDuration % 60)).slice(-2)}
								</p>
							</div>
						</div>
						<div className='flex gap-2'>
							<div className='flex shrink-0 flex-col justify-around'>
								<div className='flex items-center justify-around'>
									<div className='relative'>
										<img
											alt=''
											className='lg:w-13 w-8 rounded-full object-cover md:w-12 '
											src={`${process.env.API_URL}${process.env.API_PATCH}/img/champion/${el.info.user.championName}.png`}
										/>
										<span className='absolute bottom-0 right-0 rounded-full bg-slate-800 px-1 py-[2px] text-xs text-gray-100 '>
											{el.info.user.champLevel}{' '}
										</span>
									</div>

									<div className='flex flex-col gap-1'>
                    {
                      el.info.user.summoners.map((r: string) => (
                          <div key={r}>
                            <img
                              alt=''
                              className='w-3 rounded-md object-cover md:w-5 '
                              src={`${process.env.API_URL}${process.env.API_PATCH}/img/spell/${r}.png`}
                            />
                          </div>
                      ))
                    }
									</div>

									<div className='flex flex-col gap-1'>
                    {
                      el.info.user.runes.map((r: Rune, index: number) => {
                        if(index === 0){
                        return <div className='w-3 rounded-full bg-zinc-800 md:w-5' key={r.id}>
											    <img alt='' className='w-full object-cover' src={`${process.env.RUNE_URL}${r.icon}`} />
										    </div>
                        } 
                        return<img alt='' key={r.id} className='w-3 object-cover md:w-5' src={`${process.env.RUNE_URL}${r.icon}`} />
                      })
                    }
									</div>

									<div className='ml-1 md:min-w-[70px]'>
										<p className='text-xs font-semibold md:text-base'>
											{el.info.user.kills} <span className='font-extralight text-gray-800 dark:text-gray-400'>/</span>{' '}
											<span className='text-red-600'>{el.info.user.deaths}</span>{' '}
											<span className='font-extralight text-gray-800 dark:text-gray-400'>/</span> {el.info.user.assists}
										</p>
										<p className='text-[.6rem] font-light text-gray-800 dark:text-gray-400 md:text-xs'>
											{el.info.user.deaths === 0 ? 'Perfect KDA' : `${el.info.user.challenges.kda.toFixed(2)}:1KDA`}
										</p>
									</div>
								</div>

								<div className='flex gap-[2px] '>
									{items.map((r) => {
										return (
											<div key={r}>
												{el.info.user[r] !== 0 ? (
													<img
														alt=''
														className='w-3 rounded-md object-cover md:w-5 lg:w-6'
														src={`${process.env.API_URL}${process.env.API_PATCH}/img/item/${el.info.user[r]}.png`}
													/>
												) : (
													<div
														className={`h-full w-3 rounded-md md:w-5 lg:w-6 ${
															el.info.user.win ? ' bg-blue-400 dark:bg-blue-500/50 ' : ' bg-red-400 dark:bg-red-500/50 '
														}`}
													/>
												)}
											</div>
										);
									})}
								</div>
							</div>

							<div
								className={`border-l-2 ${
									el.info.user.win ? 'border-blue-400/50 ' : 'border-red-400/50 '
								} flex flex-col justify-around pl-1 `}
							>
								<div>
									{/* <Tooltip text='Contribución a las kills'> */}
										<p className='text-[0.4rem] font-semibold text-red-600 md:text-[.6rem] lg:text-xs'>
											P/Kill {(el.info.user.challenges.killParticipation * 100).toFixed(0)}%
										</p>
									{/* </Tooltip> */}
									<p className='text-[0.5rem] text-gray-800 dark:text-gray-400 md:text-[.6rem] lg:text-xs'>
										Control Ward {el.info.user.challenges.controlWardsPlaced}
									</p>
									{/* <Tooltip text='Minions por minuto'> */}
										<p className='text-[0.4rem] text-gray-800 dark:text-gray-400 md:text-[.6rem] lg:text-xs'>
											CS {el.info.user.totalMinionsKilled + el.info.user.neutralMinionsKilled} (
											{(
												(el.info.user.totalMinionsKilled + el.info.user.neutralMinionsKilled) /
												(Math.floor(el.info.gameDuration / 60) + (el.info.gameDuration % 60) / 100)
											).toFixed(1)}
											)
										</p>
									{/* </Tooltip> */}
								</div>
								<div className='h-3 md:h-5 lg:h-6'>
									{(el.info.user.doubleKills > 0 ||
										el.info.user.tripleKills > 0 ||
										el.info.user.quadraKills > 0 ||
										el.info.user.pentaKills > 0) && (
										<div className='flex h-full items-center justify-center rounded-3xl bg-red-500 bg-opacity-80 object-cover px-1 py-[1px] text-[0.5rem] font-semibold text-gray-100 md:px-2 md:py-[2px] md:text-[.7rem] '>
											{(el.info.user.doubleKills > 0 && 'Double Kill') ||
												(el.info.user.tripleKills > 0 && 'Triple Kill') ||
												(el.info.user.quadraKills > 0 && 'Quadra Kill') ||
												(el.info.user.pentaKills > 0 && 'Penta Kill')}
										</div>
									)}
								</div>
							</div>
						</div>

						<div className='ml-1 flex lg:ml-5 lg:gap-4'>
							<GameParticipants data={el.info.participants.slice(0, 5)} />
							<GameParticipants data={el.info.participants.slice(5)} />
						</div>
					</div>
				);
			})}
		</div>
	);
}



interface GameParticipantsProps {
  data: Match[];
}

const GameParticipants  = ({data} : GameParticipantsProps) => {
	
	return(
    <div className='flex flex-col justify-evenly md:min-w-[40px] md:max-w-[65px] lg:min-w-[95px] lg:max-w-[95px]'>
		{data.map((el: Match) => (
			<div key={el.summonerName} className='flex gap-1'>
				<img
					alt=''
					className={`w-[17px] object-cover ${el.summonerName === 'TwTV Mirato' && 'rounded-full'} `}
					src={`${process.env.API_URL}${process.env.API_PATCH}/img/champion/${el.championName}.png`}
				/>
				<span
					title={el.summonerName}
					className={`overflow-hidden text-ellipsis whitespace-nowrap text-[0.6rem] lg:text-[0.7rem] ${
						el.summonerName === 'TwTV Mirato'
							? 'font-semibold text-gray-900 dark:text-gray-100'
							: 'font-medium text-gray-700 dark:text-gray-400'
					}`}
				>
					{el.summonerName}{' '}
				</span>
			</div>
		))}
	</div>
  )
};
