export const REGEX = {
  /**
   * 以中文或英文字母开头
   */
  USER_NAME_START: /^[a-zA-Z\u4e00-\u9fa5]/,

  /**
   * 手机号（中国大陆）
   */
  PHONE: /^1[3-9]\d{9}$/,
  
  /**
   * 邮箱
   */
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
