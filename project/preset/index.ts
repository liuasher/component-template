import { Vue } from "vue/types/vue";

const setPresetParams = (vue: Vue, params: any) => {
    const defaultParams = {};
    vue.prototype.$dashBoard = Object.assign({}, defaultParams, params);
}

export default setPresetParams