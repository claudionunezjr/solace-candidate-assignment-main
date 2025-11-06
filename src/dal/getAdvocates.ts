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
    const searchParamsString = new URLSearchParams(
        searchParams as Record<string, string>
    );

    const response = await fetch(
        `${process.env.API_URL}/advocates?${searchParamsString}`
    );

    return await response.json();
};
