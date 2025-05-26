import { dev } from "$app/environment";
import ky from "ky";

const prefix = dev ? 'http://192.168.31.82:50000/api' : 'https://todo.thodle.tech/api';

export default ky.create({
    prefixUrl: prefix,
    throwHttpErrors: false,
    credentials: 'include',
    fetch
});
