import { ElementType, ReactElement } from 'react';
import { Except } from 'type-fest';

import { AnyCombinedUnion } from '@remirror/core';
import { SocialOptions, SocialPreset } from '@remirror/preset-social';
import {
  BaseReactCombinedUnion,
  CreateReactManagerOptions,
  I18nContextProps,
  RemirrorProviderProps,
} from '@remirror/react';
import { RemirrorThemeType } from '@remirror/theme';

export interface MentionChangeParameter extends BaseMentionState {
  name: MatchName;
  /**
   * The currently active matching index
   */
  index: number;
}

export interface CreateSocialManagerOptions extends CreateReactManagerOptions {
  /**
   * The social preset options.
   */
  social?: SocialOptions;
}

export interface SocialProviderProps<Combined extends AnyCombinedUnion = SocialCombinedUnion>
  extends Except<
      Partial<RemirrorProviderProps<Combined>>,
      'managerSettings' | 'reactPresetOptions' | 'corePresetOptions' | 'children'
    >,
    Partial<I18nContextProps> {
  /**
   * Unlike the remirror provider you can provide any number of children to this component.
   */
  children: ReactElement | ReactElement[];

  /**
   * Provide a theme to use for the editor. When this is provided your
   * editor will be wrapped in an extra wrapper component depending on the
   * value of the `ThemeComponent`.
   */
  theme?: RemirrorThemeType;

  /**
   * The theme component used to render the `theme`.
   *
   * @defaultValue 'div'
   */
  ThemeComponent?: ElementType;

  /**
   * The social options used to create the initial manager when a manager is not
   * provided.
   */
  socialOptions?: CreateSocialManagerOptions;

  /**
   * Display a typing hint that limits the number of characters to this number.
   * Defaults to 140, set to `null` to disable.
   */
  characterLimit?: number | null;

  /**
   * The message to show when the editor is empty.
   */
  placeholder?: string;
}

interface BaseMentionState {
  /**
   * The currently matched query which can be used to search and populate data.
   */
  query: string;
}

/**
 * The possible active suggestion names.
 */
export type MatchName = 'at' | 'tag';

export interface UserData {
  id?: string;
  href?: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export interface TagData {
  id?: string;
  href?: string;
  tag: string;
}

/**
 * The extensions used by the social editor.
 *
 * Using this as a generic value allows for better type inference in the editor.
 */
export type SocialCombinedUnion = BaseReactCombinedUnion | SocialPreset;