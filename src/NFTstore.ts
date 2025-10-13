import { createHelia, Helia } from 'helia'
import { unixfs, UnixFS } from '@helia/unixfs'

export default class NFTstore {
  private helia: Helia | undefined
  private hfs: UnixFS | undefined

  async init() {
    this.helia = await createHelia()
    this.hfs = unixfs(this.helia)
  }

  async upload(svg: string) {
    const bytes = new TextEncoder().encode(svg);
    const cid = await this.hfs?.addBytes(bytes);

    return cid?.toString();
  }
}

