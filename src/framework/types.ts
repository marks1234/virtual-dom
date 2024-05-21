export type Props = { [key: string]: string | ((event: Event) => void) };

export type CustomElement = {
  type: string;
  props: Props;
  children: (any | CustomElement | string)[];
};
