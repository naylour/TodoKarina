import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signinSchema } from '$schemas';

export const validator = zod(signinSchema);

export const getForm = (__event__: any = null) => superValidate(__event__, validator);
