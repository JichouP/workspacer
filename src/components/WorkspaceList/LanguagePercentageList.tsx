import { Stats } from '@/cmds/getStatsCmd';
import languageColors from '@/languageColors';
import { FC } from 'react';

type Props = {
  stats: Stats;
};

const LanguagePercentageList: FC<Props> = ({ stats: [, stats] }) => {
  return (
    <div className="flex flex-wrap">
      {stats
        .map((v) => ({
          ...v,
          percentage: Math.round(v.percentage * 10) / 10,
        }))
        .map(({ lang, percentage }) => (
          <div key={lang} className="flex items-center">
            <div
              className="h-3 w-3 rounded-xl"
              style={{ background: languageColors[lang] }}
            ></div>
            <span className="ml-1 mr-4">
              {lang}: {percentage}%
            </span>
          </div>
        ))}
      {stats.length === 0 && <div>Other</div>}
    </div>
  );
};

export default LanguagePercentageList;
