import { Vue } from 'vue/types/vue';

const setPresetParams = (vue: Vue, params: Record<string, unknown>): void => {
    const defaultParams = {};
    vue.prototype.$dashBoard = { ...defaultParams, ...params };
};

export default setPresetParams;
