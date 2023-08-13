import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import useGetSong from './useGetSong';
import useEditSong from './useEditSong';
import { Song, SongFormValues } from './types';

function isDifficultyNumber(value: number | null) {
  if (!value) return true;

  return (1 <= value && value <= 19) || 'Number should be less than 20';
}

// Get form value with null in fields
const getInitialFormValues = (): SongFormValues => {
  return {
    name: null,
    beginnerDifficulty: null,
    lightDifficulty: null,
    standardDifficulty: null,
    heavyDifficulty: null,
    challengeDifficulty: null,
  };
};

const getFormValuesBySong = (song: Song) => {
  const result = getInitialFormValues();
  const formKeys = Object.keys(song).filter((key) => key !== 'id') as Array<
    keyof typeof result
  >;
  formKeys.forEach((key) => {
    if (key !== 'name') {
      result[key] = song[key] === null ? null : Number(song[key]);
    } else {
      result[key] = song[key];
    }
  });

  return result;
};

// 若包覆的外層有使用到 Modal 元件，就會透過 cloneElement 注入 onCloseModal
// 所以有可能會使用到 onCloseModal
export default function EditSongForm({
  id,
  onCloseModal,
}: {
  id: string | number;
  onCloseModal?: () => void;
}) {
  const { song, isLoading } = useGetSong(id);
  const { editSong } = useEditSong();
  const { register, handleSubmit, formState, reset } =
    useForm<SongFormValues>();
  const { errors } = formState;

  // Set default values of form through reset function
  // https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
  useEffect(() => {
    // 因為 useGetSong 回傳的資料有 id，不想將 id 傳至後端，所以排除 id 欄位

    if (song) {
      reset(getFormValuesBySong(song));
    }
  }, [song, reset]);

  const onSubmit: SubmitHandler<SongFormValues> = (result) => {
    const newSong = { ...result };
    editSong(
      { newSong, id },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Name" error={errors?.name?.message ?? ''}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Beginner level"
        error={errors?.beginnerDifficulty?.message ?? ''}
      >
        <Input
          type="number"
          id="beginnerDifficulty"
          disabled={isLoading}
          {...register('beginnerDifficulty', {
            validate: {
              isDifficultyNumber,
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Light level"
        error={errors?.lightDifficulty?.message ?? ''}
      >
        <Input
          type="number"
          id="lightDifficulty"
          disabled={isLoading}
          {...register('lightDifficulty', {
            validate: {
              isDifficultyNumber,
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Standard level"
        error={errors?.standardDifficulty?.message ?? ''}
      >
        <Input
          type="number"
          id="standardDifficulty"
          disabled={isLoading}
          {...register('standardDifficulty', {
            validate: {
              isDifficultyNumber,
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Heavy Level"
        error={errors?.heavyDifficulty?.message ?? ''}
      >
        <Input
          type="number"
          id="heavyDifficulty"
          disabled={isLoading}
          {...register('heavyDifficulty', {
            validate: {
              isDifficultyNumber,
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Challenge Level"
        error={errors?.challengeDifficulty?.message ?? ''}
      >
        <Input
          type="number"
          id="challengeDifficulty"
          disabled={isLoading}
          {...register('challengeDifficulty', {
            validate: {
              isDifficultyNumber,
            },
          })}
        />
      </FormRowVertical>
      <FormRow>
        <div>
          <Button>Submit</Button>
        </div>
      </FormRow>
    </Form>
  );
}
