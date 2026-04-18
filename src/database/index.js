import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('sigar.db');

export default db;