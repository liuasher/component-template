declare module "vue/types/vue" {
    interface Vue {
        $api: {
            [index: string]: any;
        };
        prototype: {
            $dashBoard: Object
        }
    }
}
