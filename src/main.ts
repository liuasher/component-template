import Vue from 'vue';
import setPresetParams from '@/preset/index';
import { Dashboard01, Dashboard02 } from './views/index';
import { Graph01, Graph02, Graph03 } from './components';

const install: any = (v: typeof Vue) => {
  if (install.installed) return;
  v.component('a-dashboard-01', Dashboard01);
  v.component('a-dashboard-02', Dashboard02);
};

export { Dashboard01, Dashboard02, Graph01, Graph02, Graph03, setPresetParams };

export default {
  install
};
