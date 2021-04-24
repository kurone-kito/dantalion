/**
 * The base type definition in the structure of a resource.
 * @template D The type of details.
 */
interface DetailsBaseTypeGeneric<D> {
  /** The detail. */
  readonly detail: D;
  /** The resource name as a heading. */
  readonly name: string;
}

/** The type definition that the pair of name and detail. */
export type DetailsBaseType = DetailsBaseTypeGeneric<string>;

/** The type definition that the name, detail and more descriptions. */
export interface DetailsType extends DetailsBaseType {
  /**
   * The more detailed descriptions.
   *
   * It stores in an array format with elements divided for each paragraph.
   */
  readonly more: readonly string[];
}

/**
 * A type definition of a structure that stores a
 * description of a particular person's personality.
 */
export interface PersonalityType
  extends DetailsBaseTypeGeneric<readonly string[]> {
  /** The keywords. */
  readonly keyword: readonly string[];
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
export interface VectorType extends DetailsBaseType {
  /**
   * The strategies for communicating with people of this personality type.
   *
   * It stores in an array format with elements divided for each paragraph.
   */
  readonly strategy: readonly string[];
}