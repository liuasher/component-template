import { Vue } from 'vue/types/vue';

const setPresetParams = (vue: Vue, params: any) => {
    const defaultParams = {};
    vue.prototype.$dashBoard = { ...defaultParams, ...params };
};

export default setPresetParams;
