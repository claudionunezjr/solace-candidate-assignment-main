'use client';

import Form from 'next/form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const AdvocatesSearchForm = () => {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const getSearchParams = () => {
        return new URLSearchParams(searchParams.toString());
    };

    const unsetParams = (params: URLSearchParams) => {
        params.delete('cursor');
        params.delete('dir');
        params.delete('size');
        params.delete('q');

        return params;
    };

    const updateParams = (params: URLSearchParams) => {
        replace(`${pathname}?${params.toString()}`);
    };

    const handleReset = () => {
        const params = getSearchParams();
        updateParams(unsetParams(params));
    };

    const handleSearch = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const params = getSearchParams();
            const newQuery = e.target.value;

            unsetParams(params).set('q', newQuery);
            updateParams(params);
        },
        300
    );

    return (
        <Form
            action={pathname}
            className="inline-flex flex-col gap-1"
            onReset={handleReset}
        >
            <label htmlFor="q">Search term</label>
            <div className="flex gap-2">
                <input
                    className="border rounded px-2 py-1"
                    defaultValue={query}
                    id="q"
                    name="q"
                    onChange={handleSearch}
                />

                <button
                    className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-100"
                    type="reset"
                >
                    Show all
                </button>
            </div>
        </Form>
    );
};
