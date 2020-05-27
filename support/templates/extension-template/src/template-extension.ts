import {
  CustomKeyList,
  DefaultExtensionOptions,
  HandlerKeyList,
  PlainExtension,
  StaticKeyList,
} from '@remirror/core';

export interface TemplateOptions {}

/**
 * The default text passed into the prosemirror schema.
 *
 * @core
 */
export class TemplateExtension extends PlainExtension<TemplateOptions> {
  public static readonly staticKeys: StaticKeyList<TemplateOptions> = [];
  public static readonly handlerKeys: HandlerKeyList<TemplateOptions> = [];
  public static readonly customKeys: CustomKeyList<TemplateOptions> = [];

  public static readonly defaultOptions: DefaultExtensionOptions<TemplateOptions> = {};

  get name() {
    return 'template' as const;
  }
}