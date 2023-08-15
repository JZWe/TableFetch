import { useForm, SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import useCreateSong from './useCreateSong';
import { SongFormValues } from './types';

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

const getFormattedSongFormValues = (
  formValues: SongFormValues
): SongFormValues => {
  const result = getInitialFormValues();
  const formKeys = Object.keys(formValues) as Array<keyof typeof result>;
  formKeys.forEach((key) => {
    if (key !== 'name') {
      result[key] = formValues[key] === null ? null : Number(formValues[key]);
    } else {
      result[key] = formValues[key];
    }
  });

  return result;
};

// 若包覆的外層有使用到 Modal 元件，就會透過 cloneElement 注入 onCloseModal
// 所以有可能會使用到 onCloseModal
export default function CreateSongForm({
  onCloseModal,
}: {
  onCloseModal?: () => void;
}) {
  const { createSong, isLoading } = useCreateSong();
  const { register, handleSubmit, formState } = useForm<SongFormValues>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { errors } = formState;

  const onSubmit: SubmitHandler<SongFormValues> = (result) => {
    const newSong = getFormattedSongFormValues(result);
    createSong(
      { newSong },
      {
        onSuccess: () => {
          onCloseModal?.();
          const keysToRemove = Array.from(searchParams.keys()).filter(
            (key) => key !== 'level'
          );
          keysToRemove.forEach((key) => {
            if (key !== 'level') {
              searchParams.delete(key);
            }
          });
          searchParams.set('level', 'all');
          setSearchParams(searchParams);
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
