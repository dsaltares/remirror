import React from 'react';
import { renderToString } from 'react-dom/server';

import { AnyExtension, ExtensionManager, object } from '@remirror/core';
import { Remirror, RemirrorProps } from '@remirror/react';

import { nodeExtensions } from './jest-remirror-schema';

/**
 * Render the editor with the params passed in. Useful for testing.
 */
export const renderSSREditor = <GExtension extends AnyExtension = any>(
  extensions: GExtension[] = [],
  props: Partial<Omit<RemirrorProps<GExtension>, 'manager'>> = object(),
): string => {
  const manager = ExtensionManager.create([...nodeExtensions, ...extensions]);

  return renderToString(
    <Remirror {...props} manager={manager as any}>
      {params => {
        if (props.children) {
          return props.children(params);
        }
        return <div />;
      }}
    </Remirror>,
  );
};
