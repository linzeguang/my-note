import { hasStringify } from "./utils";
import {
  StorageBootStrapConfig,
  StorageSaveFormat,
} from "./typings/webStorage";

export default class CustomStorage {
  private readStorage: Storage;
  private config: StorageBootStrapConfig;

  constructor() {
    if (!window) {
      throw new Error("当前环境非浏览器，无法消费全局window实例。");
    }
    if (!window.localStorage) {
      throw new Error("当前环境非无法使用localStorage");
    }
    if (!window.sessionStorage) {
      throw new Error("当前环境非无法使用sessionStorage");
    }
  }

  /**
   * 初始化Storage的数据
   * @param config StorageBootStrapConfig
   */
  initStorage(config: StorageBootStrapConfig): void {
    switch (config.mode) {
      case "session":
        this.readStorage = window.sessionStorage;
        break;

      case "local":
        this.readStorage = window.localStorage;
        break;

      default:
        throw new Error("当前配置的mode未再配置区内，可以检查传入配置。");
    }
    this.config = config;
  }

  /**
   * 存储数据
   * @param key 设置当前存储key
   * @param value 设置当前存储value
   */
  save(key: string, value): void {
    if (hasStringify(value)) {
      const saveData: StorageSaveFormat = {
        timestamp: new Date().getTime(),
        data: value,
      };
      console.log(">>>>>>>>>>>>>> storage save <<<<<<<<<<<<<", saveData);
      this.readStorage.setItem(key, JSON.stringify(saveData));
    } else {
      throw new Error("需要存储的data不支持JSON.stringify方法，请检查当前数据");
    }
  }

  /**
   * 获取数据
   * @param key 获取当前数据key
   * @returns 存储数据
   */
  get<T = any>(key: string): T | null {
    const content: StorageSaveFormat | null = JSON.parse(
      this.readStorage.getItem(key)
    );
    if (
      this.config.timeout &&
      content?.timestamp &&
      new Date().getTime() - content.timestamp >= this.config.timeout
    ) {
      this.remove(key);
      return null;
    }
    return content?.data || null;
  }

  /**
   * 删除存储数据
   * @param key 移除key
   */
  remove(key: string): void {
    this.isHas(key) && this.readStorage.removeItem(key);
  }

  /**
   * 清除存储中所有数据
   */
  clear(): void {
    this.readStorage.clear();
  }

  /**
   * 判断Storage中是否有当前数据
   * @param key 数据key
   * @returns 返回boolean
   */
  isHas(key): boolean {
    return this.readStorage.hasOwnProperty(key);
  }

  /**
   * 返回当前存储库大小
   * @returns number
   */
  size(): number {
    return this.readStorage.length;
  }

  /**
   * 获取所有key
   * @returns 回storage当中所有key集合
   */
  getKeys(): Array<string> {
    return Object.keys(this.readStorage);
  }

  /**
   * 获取所有value
   * @returns 所有数据集合
   */
  getValues() {
    return Object.values(this.readStorage);
  }
}
