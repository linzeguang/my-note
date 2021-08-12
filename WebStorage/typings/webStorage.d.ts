export interface StorageBootStrapConfig {
  /** 当前环境 */
  mode: "session" | "local";

  /** 超时时间 */
  timeout?: number;
}

export interface StorageSaveFormat {
  /** 存储时间 */
  timestamp?: number;

  /** 数据 */
  data: any;
}
