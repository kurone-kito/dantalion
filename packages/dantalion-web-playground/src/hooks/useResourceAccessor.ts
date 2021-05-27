import { Accessors, createAccessors } from '@kurone-kito/dantalion-i18n';
import { useTranslation } from 'react-i18next';

/**
 * The React custom hooks that create the concreted accessors collection
 * from the i18next instance
 */
export default (): Accessors => createAccessors(useTranslation().t);
