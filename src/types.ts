export type Props = { [key: string]: string };

export type CustomElement = {
  type: string;
  props: Props;
  children: (any | CustomElement | string)[];
};
