import type { UserDTOSchema } from '$schemas';

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: UserDTOSchema;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
