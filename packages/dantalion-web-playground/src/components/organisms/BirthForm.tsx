import { ChangeEventHandler, useCallback, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import BirthForm from '../molecules/BirthForm';
import { usePSRedirection } from '../../hooks/usePersonality';
import FormReducer, {
  setBirthday,
  setNickname,
} from '../../stores/FormReducer';

/** The birthday form component. */
const Component: VFC = () => {
  const { t } = useTranslation();
  const [state, action] = FormReducer.useContainer();
  return (
    <BirthForm
      birthday={state.birthday}
      birthdayLabel={t('web.form.birthday')}
      buttonLabel={t('web.form.submit')}
      legendLabel={t('web.form.legend')}
      nickname={state.nickname}
      nicknameLabel={t('web.form.nickname')}
      notes={t('web.form.notes', { returnObjects: true })}
      onChangeBirthday={useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => action([setBirthday, e.currentTarget.value]),
        [action]
      )}
      onChangeNickname={useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => action([setNickname, e.currentTarget.value]),
        [action]
      )}
      onSubmit={usePSRedirection(state)}
    />
  );
};
Component.displayName = 'BirthForm';

export default Component;
