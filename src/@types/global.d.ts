declare type Any =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>;
declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      [index: string]: Any;
    };
    prototype: {
      $dashBoard: Record<string, unknown>;
    };
  }
}
