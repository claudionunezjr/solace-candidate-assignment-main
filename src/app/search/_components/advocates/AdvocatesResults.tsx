import {
    getAdvocates,
    type GetAdvocatesSearchParams
} from '@/dal/getAdvocates';
import Link from 'next/link';
import React from 'react';

export type AdvocateResultsProps = {
    searchParams: Promise<URLSearchParams>;
};

export const AdvocatesResults: React.FC<AdvocateResultsProps> = async ({
    searchParams
}) => {
    const params: GetAdvocatesSearchParams = await searchParams;
    const qParam = params.q ? `&q=${params.q}` : '';
    const { data: advocates, hasNext, hasPrev } = await getAdvocates(params);
    const resultsNotFound = !advocates?.length;

    return resultsNotFound ? (
        <p>No advocates found</p>
    ) : (
        <>
            <table className="border-separate border-spacing-y-2 overflow-hidden">
                <caption className="sr-only">
                    {params.q
                        ? `Showing results for advocates filtered by "${params.q}"`
                        : 'Showing unfiltered results for all advocates'}
                </caption>

                <thead>
                    <tr className="bg-teal-700 text-white">
                        <th
                            className="align-bottom px-4 py-3 text-left"
                            scope="col"
                        >
                            First Name
                        </th>
                        <th
                            className="align-bottom px-4 py-3 text-left"
                            scope="col"
                        >
                            Last Name
                        </th>
                        <th
                            className="align-bottom px-4 py-3 text-left"
                            scope="col"
                        >
                            City
                        </th>
                        <th
                            className="align-bottom px-4 py-3 text-left"
                            scope="col"
                        >
                            Degree
                        </th>
                        <th
                            className="align-bottom px-4 py-3 text-left"
                            scope="col"
                        >
                            Specialties
                        </th>
                        <th
                            className="align-bottom px-4 py-3 text-left"
                            scope="col"
                        >
                            Years of Experience
                        </th>
                        <th
                            className="align-bottom px-4 py-3 text-left"
                            scope="col"
                        >
                            Phone Number
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {advocates.map(
                        ({
                            city,
                            degree,
                            firstName,
                            id,
                            lastName,
                            phoneNumber,
                            specialties,
                            yearsOfExperience
                        }) => (
                            <tr
                                className="even:bg-gray-200 mt-2 odd:bg-gray-100"
                                key={id}
                            >
                                <td className="align-top px-4 py-3">
                                    {firstName}
                                </td>
                                <td className="align-top px-4 py-3">
                                    {lastName}
                                </td>
                                <td className="align-top px-4 py-3 text-nowrap">
                                    {city}
                                </td>
                                <td className="align-top px-4 py-3">
                                    {degree}
                                </td>
                                <td className="max-w-[500px] align-top px-4 py-3 text-nowrap">
                                    <div
                                        className="truncate"
                                        title={specialties.join(', ')}
                                    >
                                        {specialties.join(', ')}
                                    </div>
                                </td>
                                <td className="align-top px-4 py-3 text-center">
                                    {yearsOfExperience}
                                </td>
                                <td className="align-top px-4 py-3">
                                    {phoneNumber}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            <div className="flex gap-2 sticky left-0">
                {hasPrev ? (
                    <Link
                        className="border rounded px-2 py-1 hover:bg-gray-100"
                        href={`/search?cursor=${advocates[0].id}&dir=prev${qParam}`}
                    >
                        Previous
                    </Link>
                ) : (
                    <span className="border rounded px-2 py-1 opacity-50 text-gray-400">
                        Previous
                    </span>
                )}
                {hasNext ? (
                    <Link
                        className="border rounded px-2 py-1 hover:bg-gray-100"
                        href={`/search?cursor=${advocates[advocates.length - 1].id}&dir=next${qParam}`}
                    >
                        Next
                    </Link>
                ) : (
                    <span className="border rounded px-2 py-1 opacity-50 text-gray-400">
                        Next
                    </span>
                )}
            </div>
        </>
    );
};
