import { Range } from '../../utils/types';
import { Database } from '../../utils/supabase';

// 未來在做新增、編輯資料的時候可能會用到，所以也 export 出去
export type DifficultyNumber = Range<1, 20>;

// OriginalDifficultyName, OriginalData 給 Header 解析 JSON 資料用的
export type OriginalDifficultyName =
  | 'BEGINNER'
  | 'LIGHT'
  | 'STANDARD'
  | 'HEAVY'
  | 'CHALLENGE';

export type OriginalData = Record<
  string,
  Record<OriginalDifficultyName, { level: DifficultyNumber | null }>
>;

// 從 supabase 解析出來的 Table 定義
type SPRows = Database['public']['Tables']['sp_songs']['Row'];
export type SPDifficultyName =
  | 'beginnerDifficulty'
  | 'challengeDifficulty'
  | 'heavyDifficulty'
  | 'lightDifficulty'
  | 'standardDifficulty';

export type Song = Pick<SPRows, 'name' | SPDifficultyName>;
