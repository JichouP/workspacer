import { Stats } from '@/cmds/getStatsCmd';
import languageColors from '@/languageColors';
import { FC } from 'react';

type Props = {
  stats: Stats;
};

const LanguagePercentageBar: FC<Props> = ({ stats: [, stats] }) => {
  return (
    <div className="flex h-2 w-96 overflow-hidden rounded-md">
      <>
        {stats
          .map((v) => ({
            ...v,
            percentage: Math.round(v.percentage * 10) / 10,
          }))
          .map(({ lang, percentage }, i) => (
            <div
              key={lang}
              style={{
                background: languageColors[lang],
                width: `${percentage}%`,
                marginLeft: i > 0 ? 2 : 0,
              }}
            ></div>
          ))}
        {stats.length === 0 && <div className="w-full bg-gray-600"></div>}
      </>
    </div>
  );
};

export default LanguagePercentageBar;
