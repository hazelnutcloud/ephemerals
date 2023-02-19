import { PocketBase, Record, RecordListQueryParams } from "./deps.ts";

export async function* collectionIterator<T extends Record>(
  pb: PocketBase,
  collectionIdOrName: string,
  perPage: number,
  queryParams?: RecordListQueryParams,
) {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    try {
      const res = await pb.collection(collectionIdOrName).getList<T>(
        page,
        perPage,
        queryParams,
      );
      for (const item of res.items) {
        yield item;
      }
      hasMore = res.items.length > 0;
      page++;
    } catch (error) {
      throw error;
    }
  }
}
