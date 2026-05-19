import {Server} from '@tus/server';
import {FileStore} from '@tus/file-store';

export const tusServer = new Server({
    path: '/files',
    datastore: new FileStore({
        directory: './uploads'
    }),
});

