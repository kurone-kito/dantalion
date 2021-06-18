import { locales } from '@kurone-kito/dantalion-i18n';
import { ChangeEventHandler, useCallback, useMemo, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage, useRoute } from '../../hooks/useQuery';
import Select from '../atoms/Select';

type Source = readonly (readonly [string, string])[];

const autoKey = 'auto';
const baseSource: Source = Object.entries(locales);

const Component: VFC = () => {
  const route = useRoute();
  const { t } = useTranslation();
  const language = useLanguage() ?? autoKey;
  const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      e.preventDefault();
      const { value } = e.currentTarget;
      route({ lang: value === autoKey ? '' : value });
    },
    [route]
  );
  const source = useMemo<Source>(
    () => [[autoKey, t('web.language.automatic')], ...baseSource],
    [t]
  );
  return (
    <Select
      defaultValue={language}
      id="language"
      label={t('web.language.name')}
      onChange={onChange}
      source={source}
    />
  );
};
Component.displayName = 'LanguageSelector';

export default Component;
