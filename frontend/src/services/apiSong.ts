import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabase';
import { Song } from '../features/song/types';

export async function getSongs({
  limit = 50,
  page = 1,
  sortBy,
}: {
  limit?: number;
  page?: number;
  sortBy?: Record<string, string>;
}) {
  let query = supabase
    .from('sp_songs')
    .select(
      'id, name, beginnerDifficulty, lightDifficulty, heavyDifficulty, standardDifficulty, challengeDifficulty',
      { count: 'exact' }
    );

  // limit
  query = query.limit(limit);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  // 在此註明型別，避免引用 API 的時候，會改成顯示 supabase 的表格定義
  const {
    data,
    error,
    count,
  }: {
    data: Song[] | null;
    error: PostgrestError | null;
    count: number | null;
  } = await query;

  if (error) {
    console.error(error);
    throw new Error('Songs not found');
  }

  return {
    data,
    pageCount: count === null ? 0 : Math.ceil(count / limit),
    count,
  };
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
