import { FC } from 'react';

import InGameUserRow from './InGameUserRow';
import { useGetRuneJson, useGetSpellJson } from 'hooks/queries';
import {
  InGameTeamColumnProps,
  InGameUser,
  InGameUserRowProps,
  RuneInfo,
  SpellInfoArr,
} from 'types';

const InGameTeamColumn: FC<InGameTeamColumnProps> = ({ team }) => {
  const { spellData } = useGetSpellJson();
  const { runeData } = useGetRuneJson();

  //Spell
  const spellEntries = Object?.entries(spellData);

  return (
    <div className='flex-col'>
      {team.map((user: InGameUser) => {
        // Spell
        const spellD = spellEntries.find(
          (spell) => Number(spell[1]?.key) === user.spell1Id
        );
        const spellF = spellEntries.find(
          (spell) => Number(spell[1]?.key) === user.spell2Id
        );
        const spell = [spellD, spellF] as SpellInfoArr;
        //Rune
        const mainRuneTheme = runeData?.find(
          (rune) => rune.id === user.perks.perkStyle
        );
        const mainRune = mainRuneTheme?.slots[0].runes.find(
          (rune) => rune.id === user.perks.perkIds?.[0]
        );
        const subRuneTheme = runeData?.find(
          (rune) => rune.id === user.perks.perkSubStyle
        );
        const rune = [mainRune, subRuneTheme] as RuneInfo[];

        const InGameUserRowProps: InGameUserRowProps = {
          nickname: user.summonerName,
          rune,
          spell,
          profileIconId: user.profileIconId,
        };

        return <InGameUserRow {...InGameUserRowProps} key={user.summonerId} />;
      })}
    </div>
  );
};

export default InGameTeamColumn;
