import { Interpolation } from '@emotion/core';
import { textblockTypeInputRule } from 'prosemirror-inputrules';

import {
  CommandNodeTypeParams,
  convertCommand,
  EDITOR_CLASS_SELECTOR,
  ManagerNodeTypeParams,
  KeyBindings,
  NodeExtension,
  NodeExtensionSpec,
  NodeGroup,
  toggleBlockItem,
} from '@remirror/core';

export class CodeBlockExtension extends NodeExtension {
  get name() {
    return 'codeBlock' as const;
  }

  get schema(): NodeExtensionSpec {
    return {
      attrs: this.extraAttributes(),
      content: 'text*',
      marks: '',
      group: NodeGroup.Block,
      code: true,
      defining: true,
      draggable: false,
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
      toDOM: () => ['pre', ['code', 0]],
    };
  }

  public commands({ type, schema }: CommandNodeTypeParams) {
    return { toggleCodeBlock: () => toggleBlockItem({ type, toggleType: schema.nodes.paragraph }) };
  }

  public keys({ type, schema }: ManagerNodeTypeParams): KeyBindings {
    return {
      'Shift-Ctrl-\\': convertCommand(
        toggleBlockItem({ type, toggleType: schema.nodes.paragraph }),
      ),
    };
  }

  public styles(): Interpolation {
    return {
      [`${EDITOR_CLASS_SELECTOR} pre`]: {
        backgroundColor: '#000',
        borderRadius: '5px',
        padding: '.7rem 1rem',
        color: '#fff',
        fontSize: '.8rem',
        overflowX: 'auto',
      },
      [`${EDITOR_CLASS_SELECTOR} pre code`]: {
        display: 'block',
      },
    };
  }

  public inputRules({ type }: ManagerNodeTypeParams) {
    return [textblockTypeInputRule(/^```$/, type)];
  }
}
