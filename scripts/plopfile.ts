import type { NodePlopAPI } from '@crutchcorn/plop';
import { createHook } from './create-hook';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('hook', createHook());
}
