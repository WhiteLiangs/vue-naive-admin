import CryptoJS from 'crypto-js'

const CryptoSecret = '__CryptoJS_Secret__'

/**
 * 加密数据
 * @param data - 数据
 * @param secret - 密钥
 */
export function encrypto(data) {
  return CryptoJS.MD5(data).toString()
}

/**
 * 解密数据
 * @param ciphertext - 密文
 * @param secret - 密钥
 */
export function decrypto(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoSecret)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  if (originalText) {
    return JSON.parse(originalText)
  }
  return null
}
