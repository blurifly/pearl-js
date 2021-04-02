import { addExtension } from '@rollup/pluginutils'
const chalk = require('chalk');
const path = require('path')
const log = console.log
/**
* Adds a custon file extension other than js that can be compiled by rollup
* @param {string} extension - the extesion you want to add
*/
export default function AddCustionExtension(extension, options = {}) {
  if (extension === '.js') {
    log(chalk.dim('Files with `.js` are accepted by deault'))
  }
  return {
    resolveId(imported, id) {
      if (id !== undefined) {
        let reletiveLocation = addExtension(imported, extension);
        return path.resolve(path.dirname(id), reletiveLocation)
      }
    }
  };
}
