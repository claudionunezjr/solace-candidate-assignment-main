import type { Advocate } from '@/db/schema';

export type AdvocateResponseData =
    | {
          data: Advocate[];
          hasNext: boolean;
          hasPrev: boolean;
          error: never;
          success: true;
      }
    | {
          data: never;
          hasNext: never;
          hasPrev: never;
          error: string;
          success: never;
      };

export type GetAdvocatesSearchParams = {
    cursor?: number;
    direction?: 'next' | 'prev';
    q?: string;
    size?: number;
};

export const getAdvocates = async (
    searchParams: GetAdvocatesSearchParams = {}
): Promise<AdvocateResponseData> => {
    let fetchUrl = `${process.env.API_URL}/advocates`;
    const urlSearchParams = new URLSearchParams(
        searchParams as Record<string, string>
    );

    if (urlSearchParams.size > 0) {
        fetchUrl += `?${urlSearchParams.toString()}`;
    }

    return await (await fetch(fetchUrl)).json();
};
