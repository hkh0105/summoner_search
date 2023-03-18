import { FC } from 'react';
import Link from 'next/link';

import ChampionIcon from 'components/championIcon/ChampionIcon';
import Typography from 'userInterface/typography/Typography';
import { TeamChampionProps } from 'types';
import { ChampionIconPropsMapper, TypographyPropsMapper } from 'utils';

const TeamChampion: FC<TeamChampionProps> = ({
  team,
  imageSize,
  typoSize,
  width,
}) => {
  const wrapperClassName = `flex w-[${width}px] gap-1`;

  return (
    <div className='flex-col gap-y-1'>
      {team.map((user) => {
        const userName =
          user.summonerName.length > 6
            ? user.summonerName.slice(0, 5) + '...'
            : user.summonerName;

        const SummonerNameProps = TypographyPropsMapper({
          type: 'default',
          size: typoSize,
          color: 'gray',
          text: userName,
        });

        const ChampionIconProps = ChampionIconPropsMapper(
          imageSize,
          user.championName
        );

        return (
          <div className={wrapperClassName} key={user.puuid}>
            <ChampionIcon {...ChampionIconProps} />
            <Link
              href={{
                pathname: '/search/[nickname]',
                query: { nickname: user.summonerName },
              }}
              className='hover:underline'
            >
              <Typography {...SummonerNameProps} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TeamChampion;
