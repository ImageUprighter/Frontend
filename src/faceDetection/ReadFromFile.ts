import RNFS from 'react-native-fs';

import { Buffer } from 'buffer';

export async function readImage(uri: string): Promise<Uint8Array> {
  const base64 = await RNFS.readFile(uri, 'base64');
  // Buffer.from creates a buffer from base64, then we convert it to Uint8Array
  return new Uint8Array(Buffer.from(base64, 'base64'));
}