import {
  IDB_SETTING,
  DATA_RESOURCE
} from './constants';

export const createIndexedDB = (IDB_SETTING) => {
  return new Promise((resolve, rejected) => {
    const req = indexedDB.open(IDB_SETTING.name, IDB_SETTING.version);

    req.onsuccess = (event) => resolve('opened');
    req.onerror = (err) => rejected(err);

    //callback run init or versionUp
    req.onupgradeneeded = (event) => {
      const db = event.target.result;

      for (let i in IDB_SETTING.tables) {
        var OS = db.createObjectStore(IDB_SETTING.tables[i].tableName, {
          keyPath: IDB_SETTING.tables[i].keyPath,
          autoIncrement: IDB_SETTING.tables[i].autoIncrement
        });

        for (let j in IDB_SETTING.tables[i].index) {
          OS.createIndex(
            IDB_SETTING.tables[i].index[j],
            IDB_SETTING.tables[i].index[j], {
              unique: IDB_SETTING.tables[i].unique[j]
            }
          );
        }
      }

      resolve('inited');
    }
  });
};

export const loadDataToIDB = (IDB_SETTING, resources) => {
  return new Promise((resolve, rejected) => {
    const addData = (table, data) => {
      const req = indexedDB.open(IDB_SETTING.name, IDB_SETTING.version);

      req.onsuccess = (event) => {
        try {
          const db = req.result;
          const transaction = db.transaction([table], 'readwrite');
          const objectStore = transaction.objectStore(table);
          var objectStoreRequest = objectStore.add(data);
        } catch (err) {
          rejected(err);
        }

        objectStoreRequest.onsuccess = (event) => {};
        objectStoreRequest.onerror = (err) => rejected(err);
      };
      req.onerror = (event) => rejected('add data open fail');
    }

    for (let i = 0; i < resources.length; ++i) {
      const table = Object.keys(resources[i])[0];
      const datas = resources[i][table];
      for (let i = 0; i < datas.length; ++i) {
        addData(table, datas[i]);
      }
    }
    resolve('loaded');
  });
}


const tableToObject = (table) => {
  const res = Object.create(null);

  for (let i = 0; i < table.length; ++i) {
    res[table[i]['id']] = table[i];
  }

  return res;
}

export const getTable = (table) => {
  return new Promise((resolve, rejected) => {
    const openRequest = indexedDB.open(IDB_SETTING.name, IDB_SETTING.version);
    openRequest.onupgradeneeded = (err) => rejected(err);
    openRequest.onerror = (err) => rejected(err);

    openRequest.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([table], 'readonly');
      const store = transaction.objectStore(table);

      const request = store.getAll();

      request.onerror = (err) => rejected(err);
      request.onsuccess = (res) => resolve(tableToObject(res.target.result));
    }
  });
}

export const initLoadIDB = () => {
  return createIndexedDB(IDB_SETTING)
    .then(res => fetch(DATA_RESOURCE))
    .then(res => res.json())
    .then(res => loadDataToIDB(IDB_SETTING, res));
}
