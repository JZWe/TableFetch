import supabase from './supabase';

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

  console.log(from, to);
  const { data, error, count } = await query;
  console.log(await query);
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

export async function uploadSongs(songs) {
  const { error: deleteError } = await supabase
    .from('sp_songs')
    .delete()
    .gt('id', 0);

  const { data, error } = await supabase
    .from('sp_songs')
    .insert(songs)
    .select();

  return data;
}
