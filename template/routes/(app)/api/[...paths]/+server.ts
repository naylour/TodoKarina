import server from '$server/hono';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ request }) => server.fetch(request);
export const DELETE: RequestHandler = ({ request }) => server.fetch(request);
export const POST: RequestHandler = ({ request }) => server.fetch(request);
export const PATCH: RequestHandler = ({ request }) => server.fetch(request);
