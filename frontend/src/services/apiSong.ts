import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabase';
import { Song, SongFormValues } from '../features/song/types';

export async function getSongs({
  limit = 50,
  page = 1,
  filters,
}: {
  limit?: number;
  page?: number;
  filters?: { level?: number | 'all'; name?: string | null };
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

  // 沒有等級 filter, 等級顯示全部 && 沒名字 filter  -> 透過 supabase 執行分頁
  if (!filters?.level || (filters?.level === 'all' && !filters?.name)) {
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

  // 有等級 filter，單純透過前端獲取所有資料並進行分頁以及等級篩選
  // 有名稱 filter，單純透過前端獲取所有資料並進行分頁以及名稱篩選
  if (typeof filters?.level === 'number' && Array.isArray(data)) {
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
          (difficulty) => element[difficulty] === filters.level
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
            element[difficulty] != filters.level ? null : element[difficulty];
        });
        return obj;
      })
      .sort((a, b) => a.id - b.id);

    count = data?.length ?? 0;
    data = data.filter((_, index) => index >= from && index <= to);
    pageCount = Math.ceil(count / limit);
  } else if (typeof filters?.name === 'string' && Array.isArray(data)) {
    const difficulties = [
      'beginnerDifficulty',
      'lightDifficulty',
      'standardDifficulty',
      'heavyDifficulty',
      'challengeDifficulty',
    ] as const;

    data = data
      .filter(
        (element) =>
          typeof element.name === 'string' &&
          element.name?.includes(`${filters.name}`)
      )
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
          obj[difficulty] = element[difficulty];
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
  const query = supabase.from('sp_songs').update(newSong).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Song could not be edited');
  }

  return data;
}

export async function deleteSong(id: number | string) {
  const query = supabase.from('sp_songs').delete().eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Song could not be deleted');
  }

  return data;
}

export async function uploadSongs(newSongs: SongFormValues[]) {
  const { error: deleteError } = await supabase
    .from('sp_songs')
    .delete()
    .gt('id', 0);

  if (deleteError) {
    throw new Error('Deletion failed');
  }

  const { data, error } = await supabase
    .from('sp_songs')
    .insert(newSongs)
    .select();

  if (error) {
    throw new Error('Insertion failed');
  }

  return data;
}
