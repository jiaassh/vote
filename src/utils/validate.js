/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * pwdFormat验证密码格式
 * @param {string} pwd
 * @returns {Boolean}
 */
export function pwdFormat(pwd) {
  return /^[0-9a-zA-Z]{6,18}$/.test(pwd)
}