import { Accessors, createAccessors } from '@kurone-kito/dantalion-i18n';
import { useTranslation } from 'react-i18next';

export default (): Accessors => createAccessors(useTranslation().t);
