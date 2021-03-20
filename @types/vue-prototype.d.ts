declare module 'vue/types/vue' {
    export interface Vue {
        $api: {
            [index: string]: any;
        };
        prototype: any
    }
}
