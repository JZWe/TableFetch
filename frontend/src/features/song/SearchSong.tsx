import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import Input from '../../ui/Input';

function SearchSong() {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue, 300); // 用 debounced
  const [searchParams, setSearchParams] = useSearchParams();

  function onInputChanged(e: React.ChangeEvent<HTMLInputElement>) {
    // 調整 name 時，要重設其他 searchParams key 的資訊
    const keysToRemove = Array.from(searchParams.keys()).filter(
      (key) => key !== 'name'
    );
    keysToRemove.forEach((key) => {
      if (key !== 'name') {
        searchParams.delete(key);
      }
    });

    setSearchValue(e.target.value);
  }

  useEffect(() => {
    // 若有其他元件 ex: SongSelect, 清掉了 URL 的 name 的資訊，就 reset value
    if (!searchParams.get('name')) {
      setSearchValue('');
    }
  }, [searchParams]);

  useEffect(() => {
    // 等到 debounceSearchValue 更新後才更新 URL 資訊
    searchParams.set('name', debouncedSearchValue.trim());
    setSearchParams(searchParams);
  }, [debouncedSearchValue, searchParams, setSearchParams]);

  return (
    <div>
      <label htmlFor="search-name">Name: </label>
      <Input id="search-name" onChange={onInputChanged} value={searchValue} />
    </div>
  );
}

export default SearchSong;
