import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from '$schemas';

export const validator = zod(signupSchema);

export const getForm = (__event__: any = null) => superValidate(__event__, validator);
