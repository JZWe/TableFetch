import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabase';
import { Song, SongFormValues } from '../features/song/types';

export async function getSongs({
  limit = 50,
  page = 1,
  sortBy,
  levelFilter,
}: {
  limit?: number;
  page?: number;
  sortBy?: Record<string, string>;
  levelFilter?: number | 'all';
}) {
  let query = supabase
    .from('sp_songs')
    .select(
      'id, name, beginnerDifficulty, lightDifficulty, heavyDifficulty, standardDifficulty, challengeDifficulty',
      { count: 'exact' }
    )
    .order('id', { ascending: true });

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // 沒有註明 levelFilter -> 透過 supabase 執行分頁
  if (!levelFilter || levelFilter === 'all') {
    query = query.limit(limit).range(from, to);
  }

  // 在此註明型別，避免引用 API 的時候，會改成顯示 supabase 的表格定義
  const result: {
    error: PostgrestError | null;
    count: number | null;
    data: Song[] | null;
  } = await query;

  let data = result.data;
  let count = result.count;
  let pageCount = count === null ? 0 : Math.ceil(count / limit);

  if (result.error) {
    console.error(result.error);
    throw new Error('Songs not found');
  }

  // 有註明 levelFilter，單純透過前端獲取所有資料並進行分頁以及等級篩選
  if (typeof levelFilter === 'number' && Array.isArray(data)) {
    const difficulties = [
      'beginnerDifficulty',
      'lightDifficulty',
      'standardDifficulty',
      'heavyDifficulty',
      'challengeDifficulty',
    ] as const;

    data = data
      .filter((element) => {
        return difficulties.some(
          (difficulty) => element[difficulty] === levelFilter
        );
      })
      .map((element) => {
        const obj: Song = {
          id: element.id,
          name: element.name,
          beginnerDifficulty: null,
          lightDifficulty: null,
          standardDifficulty: null,
          heavyDifficulty: null,
          challengeDifficulty: null,
        };
        difficulties.forEach((difficulty) => {
          obj[difficulty] =
            element[difficulty] != levelFilter ? null : element[difficulty];
        });
        return obj;
      })
      .sort((a, b) => a.id - b.id);

    count = data?.length ?? 0;
    data = data.filter((_, index) => index >= from && index <= to);
    pageCount = Math.ceil(count / limit);
  }

  return {
    data,
    error: result.error,
    pageCount,
    count,
  };
}

export async function getSong(id: number | string) {
  const query = supabase
    .from('sp_songs')
    .select(
      'id, name, beginnerDifficulty, lightDifficulty, heavyDifficulty, standardDifficulty, challengeDifficulty',
      { count: 'exact' }
    )
    .eq('id', id)
    .single();

  // 在此註明型別，避免引用 API 的時候，會改成顯示 supabase 的表格定義
  const {
    data,
    error,
  }: {
    error: PostgrestError | null;
    data: Song | null;
  } = await query;

  return {
    data,
    error,
  };
}

export async function editSong(newSong: SongFormValues, id: number | string) {
  // 1. Create/edit cabin
  const query = supabase.from('sp_songs').update(newSong).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Song could not be edited');
  }

  return data;
}

export async function uploadSongs(songs: Song[]) {
  const { error: deleteError } = await supabase
    .from('sp_songs')
    .delete()
    .gt('id', 0);

  if (deleteError) {
    throw new Error('Deletion failed');
  }

  const { data, error } = await supabase
    .from('sp_songs')
    .insert(songs)
    .select();

  if (error) {
    throw new Error('Insertion failed');
  }

  return data;
}
