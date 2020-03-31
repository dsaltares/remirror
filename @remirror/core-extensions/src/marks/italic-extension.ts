import { toggleMark } from 'prosemirror-commands';

import {
  CommandMarkTypeParams,
  convertCommand,
  ManagerMarkTypeParams,
  KeyBindings,
  MarkExtension,
  MarkExtensionSpec,
  MarkGroup,
  markInputRule,
  markPasteRule,
} from '@remirror/core';

export class ItalicExtension extends MarkExtension {
  get name() {
    return 'italic' as const;
  }

  get schema(): MarkExtensionSpec {
    return {
      group: MarkGroup.FontStyle,
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM: () => ['em', 0],
    };
  }

  public keys({ type }: ManagerMarkTypeParams): KeyBindings {
    return {
      'Mod-i': convertCommand(toggleMark(type)),
    };
  }

  public commands({ type }: CommandMarkTypeParams) {
    return { italic: () => toggleMark(type) };
  }

  public inputRules({ type }: ManagerMarkTypeParams) {
    return [markInputRule({ regexp: /(?:^|[^*_])(?:\*|_)([^*_]+)(?:\*|_)$/, type })];
  }

  public pasteRules({ type }: ManagerMarkTypeParams) {
    return [markPasteRule({ regexp: /(?:^|[^*_])(?:\*|_)([^*_]+)(?:\*|_)/g, type })];
  }
}
