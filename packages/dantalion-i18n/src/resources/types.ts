import type {
  Brain,
  Communication,
  Genius,
  LifeBase,
  Management,
  Motivation,
  Position,
  Potential,
  Response,
  Vector,
} from '@kurone-kito/dantalion-core';

/** The type definition that the resources of description. */
export interface DescriptionsType {
  /** The title of personality code. */
  readonly cc: string;
  /** The title of the detail. */
  readonly detail: string;
  /** The title of the details list. */
  readonly details: string;
  /** The detail of the genius. */
  readonly genius1: string;
  /** The detail of the genius. */
  readonly genius2: string;
  /** The error message when specified invalid birthday. */
  readonly invalid: string;
  /** The title of personality. */
  readonly personality: string;
  /** The strategy. */
  readonly strategy: string;
  /** The weak points. */
  readonly weak: string;
}

/**
 * The base type definition in the structure of a resource.
 * @template T The type of details.
 */
export interface DetailsBaseType<T = string> {
  /** The detail. */
  readonly detail: T;
  /** The resource name as a heading. */
  readonly name: string;
}

/** The type definition that the name, detail and more descriptions. */
export interface DetailsType extends DetailsBaseType {
  /**
   * The more detailed descriptions.
   *
   * It stores in an array format with elements divided for each paragraph.
   */
  readonly more: readonly string[];
}

/** The type definition that the details of personality. */
export interface PersonalityDetailBaseType {
  /** The resource of inner personality. */
  readonly inner: string;
  /** The resource of outer personality. */
  readonly outer: string;
  /** The resource of personality at working. */
  readonly workStyle: string;
}

/** The type definition that the details of personality. */
export interface PersonalityDetailType
  extends Readonly<PersonalityDetailBaseType & DetailsBaseType> {
  /** Long descriptions */
  readonly descriptions: PersonalityDetailBaseType;
}

/**
 * A type definition of a structure that stores a
 * description of a particular person's personality.
 */
export interface PersonalityType extends DetailsBaseType<readonly string[]> {
  /**
   * The strategies for communicating with people of this personality type.
   *
   * It stores in an array format with elements divided for each paragraph.
   */
  readonly strategy: readonly string[];
  /** The short summary. */
  readonly summary: string;
  /**
   * The weak points.
   *
   * It stores in an array format with elements divided for each paragraph.
   */
  readonly weak: readonly string[];
}

/**
 * A type definition of a structure that
 * stores a description of a personality type.
 */
export interface VectorType extends DetailsBaseType<readonly string[]> {
  /**
   * The strategies for communicating with people of this personality type.
   *
   * It stores in an array format with elements divided for each paragraph.
   */
  readonly strategy: readonly string[];
}

type DetailCategoryType<K extends string> = {
  readonly detail: DetailsBaseType;
} & Record<K, DetailsType>;

type PotentialEntryType<
  Detail extends string | readonly string[],
  ArrayKeys extends Potential,
  StringKey extends Potential = never,
> = {
  readonly detail: Detail;
} & Record<ArrayKeys, readonly string[]> &
  Record<StringKey, string>;

/** The type definition of a complete locale document. */
export interface LocaleDocumentType {
  /** The resources related to thought methods. */
  readonly brain: DetailCategoryType<Brain>;
  /** The resources related to dialogue policies. */
  readonly communication: DetailCategoryType<Communication>;
  /** The resources for headings and descriptions. */
  readonly descriptions: DescriptionsType;
  /** The resources related to natural personality types. */
  readonly genius: {
    readonly detail: PersonalityDetailType;
  } & Record<Genius, PersonalityType>;
  /** The resources related to the base of ego types. */
  readonly lifeBase: {
    readonly detail: string;
  } & Record<LifeBase, DetailsBaseType<readonly string[]>>;
  /** The resources related to risk management types. */
  readonly management: DetailCategoryType<Management>;
  /** The resources related to motivational environments. */
  readonly motivation: {
    readonly detail: string;
  } & Record<Motivation, string>;
  /** The localized language name. */
  readonly name: string;
  /** The resources related to suitable roles. */
  readonly position: DetailCategoryType<Position>;
  /** The resources related to potential combinations. */
  readonly potentials: {
    readonly detail: DetailsBaseType;
    readonly Ci: PotentialEntryType<
      readonly string[],
      Exclude<Potential, 'Ci'>,
      'Ci'
    >;
    readonly Co: PotentialEntryType<
      readonly string[],
      Exclude<Potential, 'Ci'>
    >;
    readonly Ei: PotentialEntryType<string, Exclude<Potential, 'Ci' | 'Co'>>;
    readonly Eo: PotentialEntryType<
      string,
      Exclude<Potential, 'Ci' | 'Co' | 'Ei'>
    >;
    readonly Fi: PotentialEntryType<
      readonly string[],
      Exclude<Potential, 'Ci' | 'Co' | 'Ei' | 'Eo' | 'Fi'>,
      'Fi'
    >;
    readonly Fo: PotentialEntryType<
      string,
      Exclude<Potential, 'Ci' | 'Co' | 'Ei' | 'Eo' | 'Fi'>
    >;
    readonly Ii: PotentialEntryType<
      readonly string[],
      Exclude<Potential, 'Ci' | 'Co' | 'Ei' | 'Eo' | 'Fi' | 'Fo' | 'Ii'>,
      'Ii'
    >;
    readonly Io: PotentialEntryType<
      readonly string[],
      Exclude<Potential, 'Ci' | 'Co' | 'Ei' | 'Eo' | 'Fi' | 'Fo' | 'Ii' | 'Io'>,
      'Io'
    >;
    readonly Ni: PotentialEntryType<
      readonly string[],
      Exclude<Potential, 'Ci' | 'Co' | 'Ei' | 'Eo' | 'Fi' | 'Fo' | 'Ii' | 'Io'>
    >;
    readonly No: PotentialEntryType<readonly string[], 'No'>;
  };
  /** The resources related to work responses. */
  readonly response: DetailCategoryType<Response>;
  /** The resources related to major personality categories. */
  readonly vector: {
    readonly detail: DetailsBaseType;
  } & Record<Vector, VectorType>;
}
