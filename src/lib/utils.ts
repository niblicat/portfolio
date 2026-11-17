import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const toImageUrl = (processedImagePath: string) =>
    `url('${processedImagePath.slice(1).replaceAll('\\', '/')}')`;

/**
 * Formats the start and end dates as a range of dates.
 *
 * @param {Date} start The start date.
 * @param {Date} [end] The end date.
 * @param {Intl.LocalesArgument} [opts.locale] Locale identifier.
 * @param {Intl.DateTimeFormatOptions} [opts.format] Date and time formatting.
 * @param {string} [opts.separator=" - "] The separator between the start and end dates.
 * @param {string} [opts.current="Present"] The string to use for undefined dates.
 * @returns {string} Date range.
 *
 * @example
 * const startDate = new Date('2006-11');
 * const endDate = new Date('2020-07');
 *
 * const rangeA = dateRange(startDate, endDate);
 * console.log(rangeA);
 * // 10/31/2006 - 6/30/2020
 * const rangeB = dateRange(startDate, undefined);
 * console.log(rangeB);
 * // 10/31/2006 - Present
 * const rangeC = dateRange(startDate, endDate, { format: { month: 'long', year: 'numeric' }, separator: " to "});
 * console.log(rangeC);
 * // October 2006 to June 2020
 */
export function dateRange(
    start: Date,
    end?: Date,
    opts?: {
        current?: string;
        format?: Intl.DateTimeFormatOptions;
        locale?: Intl.LocalesArgument;
        separator?: string;
    },
): string {
    const options = {
        ...opts,
        separator: opts?.separator ?? ' - ',
        current: opts?.current ?? 'Present',
    };

    const startString: string = start.toLocaleDateString(options.locale, options.format);
    const endString: string = end
        ? end.toLocaleDateString(options.locale, options.format)
        : options.current;

    // Join the start and end date using a separator
    return [startString, endString].join(options.separator);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
