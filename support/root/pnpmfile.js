// This file has been copied from `support/root`.
// TO EDIT update the `support/root` file and run `pnpm run update:root`.

module.exports = {
  hooks: {
    readPackage,
  },
};

/**
 * @param {import('type-fest').PackageJson} pkg
 */
function readPackage(pkg) {
  const setDependency = createSetDependency(pkg);

  setDependency('graphql', '^14.6.0');
  setDependency('@types/react', '^16.9.41');
  setDependency('@types/prosemirror-view', '^1.15.0');

  return pkg;
}

/**
 * @typedef {(name: string, version: string, includePeer?: boolean) => void} SetDependency
 */

/**
 * @param {import('type-fest').PackageJson} pkg
 *
 * @returns {SetDependency}
 */
function createSetDependency(pkg) {
  return function (name, version, peer = false) {
    if (pkg.dependencies && pkg.dependencies[name]) {
      pkg.dependencies[name] = version;
    }

    if (pkg.devDependencies && pkg.devDependencies[name]) {
      pkg.devDependencies[name] = version;
    }

    if (peer && pkg.peerDependencies && pkg.peerDependencies[name]) {
      pkg.peerDependencies[name] = version;
    }
  };
}
