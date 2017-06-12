/* @flow */

import { format } from 'url';

type Options = { user: string, gistId: string, revision: string, filename: string };

export default
  ({ user, gistId, revision, filename }: Options): string =>
    format({
      protocol: 'https',
      hostname: 'gist.githubusercontent.com',
      pathname: [user, gistId, 'raw', revision, filename].join('/'),
    });
