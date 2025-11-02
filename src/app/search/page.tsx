import {
    AdvocatesResults,
    AdvocatesSearchForm
} from '@/app/search/_components/advocates';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    description:
        'Search for an Advocate that will be with you every step of the way',
    title: 'Solace: Search Advocates'
};

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<URLSearchParams>;
}) {
    return (
        <article className="flex flex-col gap-4 items-stretch w-full">
            <section>
                <h1 className="mt-12 text-4xl text-center">
                    Search for an Advocate
                </h1>

                <div className="mt-12">
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdvocatesSearchForm />
                    </Suspense>
                </div>
            </section>

            <section className="overflow-x-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    <AdvocatesResults searchParams={searchParams} />
                </Suspense>
            </section>
        </article>
    );
}
