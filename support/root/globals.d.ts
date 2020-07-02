// This file has been copied from `support/root`.
// TO EDIT update the `support/root` file and run `pnpm run update:root`.

/**
 * Identifies whether this is an e2e test
 */
declare const __E2E__: boolean;

/**
 * A constant injected by jest to identify when this is a test run.
 */
declare const __TEST__: boolean;

/**
 * A constant injected by the build process to identify the version of the
 * currently running package. This is currently only available in public
 * packages with a types field.
 */
declare const __VERSION__: string;

/**
 * A constant injected by the build process which is true when this is a
 * development build.
 */
declare const __DEV__: boolean;

declare module 'tiny-querystring' {
  export function parse(queryString: string): Record<string, unknown>;
  export function stringify(object: Record<string, unknown>): string;
}
