import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../../ui/Select';

const songOptions = Array.from({ length: 19 }).map((_, index) => ({
  value: index + 1,
  label: `Level ${index + 1}`,
}));

function SongSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentValue, setCurrentValue] = useState<string>(
    searchParams.get('level') || 'all'
  );

  function onSelectChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    // 調整 level 時，要重設其他 searchParams key 的資訊
    const keysToRemove = Array.from(searchParams.keys()).filter(
      (key) => key !== 'level'
    );
    keysToRemove.forEach((key) => {
      if (key !== 'level') {
        searchParams.delete(key);
      }
    });
    setCurrentValue(e.target.value);
    searchParams.set('level', e.target.value);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    // 若有其他元件 ex: SearchSong, 清掉了 URL 的 level 的資訊，就 reset value
    if (!searchParams.get('level')) {
      setCurrentValue('all');
    }
  }, [searchParams]);

  return (
    <Select
      id="difficulty-selection"
      label="Choose Difficulty"
      placeholder="Select your option"
      hasAll={true}
      onChange={onSelectChanged}
      value={currentValue}
      options={songOptions}
    />
  );
}

export default SongSelect;
