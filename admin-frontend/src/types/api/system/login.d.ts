/**
 * 登录表单类型声明
 */
export interface LoginFormData {
  username: string;
  password: string;
}

/**
 * 登录响应类型声明
 */
export interface LoginResponseData {
  access_token: string;
  token_type: string;
}
