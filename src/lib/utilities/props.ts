import type { Snippet } from 'svelte';

export interface ChildrenProps {
    /** Children of the component's main element. */
    children: Snippet;
}

export interface StandardProps extends Partial<ChildrenProps> {
    /** Class to use on the component's main element. */
    class?: string;
    /** Reference to the component. */
    ref?: HTMLElement | null;
}

export interface BodyContainerProps extends StandardProps {
    /** Footer should be wrapped in a \<footer\> element. */
    footer?: Snippet;
    /** Header should be wrapped in a \<header\> element. */
    header?: Snippet;
}
