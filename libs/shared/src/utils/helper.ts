import { AES, enc } from 'crypto-js';
import { parse } from 'url';
import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { BadRequestException } from '@nestjs/common';

export const getRelationsFromIncludes = (
  include: string,
  ignores: Array<string>
): string => {
  const tree = convertStringToObject(include);
  ignores.forEach((item) => {
    delete tree[item];
  });

  return `[${convertTreeToString(tree)}]`;
};

export const encryptData = (message: string, secret: string) => {
  return AES.encrypt(message, secret).toString();
};

export const decryptData = (code: string, secret: string) => {
  const newCode = code.trim().split(' ').join('+');
  return AES.decrypt(newCode, secret).toString(enc.Utf8);
};

export const validScopes = (clientScope: string, scope?: string) => {
  if (!scope) return true;
  const scopes = scope.split(' ');
  const clientScopes = clientScope.split(' ');
  return scopes.filter((item) => clientScopes.indexOf(item) < 0).length === 0;
};

function encodeQueryData(data: any) {
  const ret = [];
  for (const d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

export const buildUrl = (redirect_uri: string, data: any) => {
  return redirect_uri + '?' + encodeQueryData(data);
};

export const getQueryParams = (url: string) => {
  return parse(url, true).query;
};

export const encryptCode = (codeVerifier: string, method: string) => {
  return crypto.createHash(method).update(codeVerifier).digest();
};

export const decodeJWT = (token: string, secretKey: string) => {
  try {
    const decodeData = jwt.verify(token, secretKey, {
      ignoreExpiration: true,
    });

    return decodeData as JwtPayload;
  } catch (error) {
    throw new BadRequestException('Invalid token');
  }
};

export const converUnixTimeStamp = (date: string | Date) =>
  Math.floor(new Date(date).getTime() / 1000);

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function convertObjectToString(
  data: string[] | string | object = ''
): string {
  if (data instanceof Object) {
    const result: any[] = [];

    // eslint-disable-next-line no-inner-declarations
    function dfs(path: string[], currentObject: any) {
      if (Object.keys(currentObject).length === 0) {
        result.push([...path].join('.'));
      }
      for (const key of Object.keys(currentObject)) {
        path.push(key);
        dfs(path, currentObject[key]);
        path.pop();
      }
    }

    dfs([], data);
    return result.join(',');
  }
  return data;
}

export function convertTreeToString(data: object = {}): string {
  const keys = Object.keys(data);
  let result = '';
  for (let i = 0; i < keys.length; i++) {
    if (Object.keys(data[keys[i]]).length > 0) {
      result += `${keys[i]}.[${convertTreeToString(data[keys[i]])}]`;
    } else {
      result += keys[i];
    }
    if (i < keys.length - 1) {
      result += ',';
    }
  }
  return `${result}`;
}

export function convertStringToObject(
  include: string[] | string | object = ''
): Record<string, any> {
  if (include instanceof Object) {
    return include;
  }

  let includes;

  if (Array.isArray(include)) {
    includes = include.join(',');
  } else if (typeof include === typeof String()) {
    includes = include.trim();
  }
  const result = {};

  function set(parts, mainMap) {
    let map = mainMap;
    for (const item of parts) {
      map[item] = map[item] || {};
      map = map[item];
    }
  }

  includes
    .split(',')
    .map((item) => item.split('.'))
    .forEach((parts) => {
      set(parts, result);
    });
  // console.log(result)

  return result;
}
