import { Injectable, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';

@Injectable()
export class RsaService implements OnModuleInit {
  private publicKey: string;
  private privateKey: string;

  onModuleInit() {
    // 加载密钥文件,从环境变量中获取路径
    const SECRET_PREFIX_PATH = `${process.env.SECRET_PREFIX_PATH}`
    this.publicKey = fs.readFileSync(
      path.resolve(join(SECRET_PREFIX_PATH, 'secrets/public.pem')),
      'utf8',
    );
    this.privateKey = fs.readFileSync(
       path.resolve(join(SECRET_PREFIX_PATH, 'secrets/private.pem')),
      'utf8',
    );
  }

  /**
   * 公钥加密 (通常用于服务端测试，实际场景通常是前端加密)
   * @param data 明文数据
   */
  encrypt(data: string): string {
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = crypto.publicEncrypt(
      {
        key: this.publicKey,
        // 使用 OAEP 填充方式更安全
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      buffer,
    );
    return encrypted.toString('base64');
  }

  /**
   * 私钥解密 (核心功能：解密前端传来的密码)
   * @param encryptedData base64格式的密文
   */
  decrypt(encryptedData: string): string {
    try {
      const buffer = Buffer.from(encryptedData, 'base64');
      const decrypted = crypto.privateDecrypt(
        {
          key: this.privateKey,
          // 必须与加密时的 padding 方式一致
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: 'sha256',
        },
        buffer,
      );
      return decrypted.toString('utf8');
    } catch (error) {
      throw new Error('RSA Decryption failed: Invalid ciphertext or key');
    }
  }

  // 提供公钥给前端的接口
  getPublicKey(): string {
    return this.publicKey;
  }
}
