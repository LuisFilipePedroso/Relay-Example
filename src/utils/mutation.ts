import {
  ConnectionHandler,
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';

type ConnectionUpdater = {
  store: RecordSourceSelectorProxy;
  parentId: string;
  connectionName: string;
  edge: RecordProxy;
  before?: boolean;
};

export function connectionUpdater({
  store,
  parentId,
  connectionName,
  edge,
  before = false,
}: ConnectionUpdater) {
  if (edge) {
    if (!parentId) {
      // eslint-disable-next-line
      console.log('maybe you forgot to pass a parentId: ');
      return;
    }

    const parentProxy = store.get(parentId);
    const conn = ConnectionHandler.getConnection(parentProxy, connectionName);
    console.log('PARENT: ', conn);
    if (!conn) {
      // eslint-disable-next-line
      console.log('maybe this connection is not in relay store: ', connectionName);
      return;
    }

    if (before) {
      ConnectionHandler.insertEdgeBefore(conn, edge);
    } else {
      ConnectionHandler.insertEdgeAfter(conn, edge);
    }
  }
}
