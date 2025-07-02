#!/bin/bash

# --- CONFIGURATION ---
DB_SRC_PATH="/opt/mongodb/cdh-console/db"
DB_BASENAME="hdadb"
DB_TMP="/tmp/hsqldb-copy"
SQLTOOL_JAR="/home/admin/sqltool-2.7.3.jar"
HSQLDB_JAR="/home/admin/hsqldb-2.7.1.jar"
EXPORT_DIR="/tmp/hsqldb-csv-dump"
DOCKER_CONTAINER_NAME="cdh-console"
HSQLDB_JAR_IN_CONTAINER="/opt/softwareag/cdh-console/backend/lib/hsqldb-2.7.1.jar"

# --- STEP 0: Copy hsqldb.jar from container if missing ---
if [[ ! -f "$HSQLDB_JAR" ]]; then
  echo "Copying hsqldb JAR from container: $DOCKER_CONTAINER_NAME"
  docker cp "$DOCKER_CONTAINER_NAME:$HSQLDB_JAR_IN_CONTAINER" "$HSQLDB_JAR"
  if [[ $? -ne 0 ]]; then
    echo "Failed to copy hsqldb.jar from Docker container. Exiting."
    exit 1
  fi
else
  echo "hsqldb.jar already exists: $HSQLDB_JAR"
fi

# --- STEP 1: Copy DB files ---
echo "Copying DB files to $DB_TMP..."
mkdir -p "$DB_TMP"
cp "$DB_SRC_PATH"/${DB_BASENAME}.* "$DB_TMP"

mkdir -p "$EXPORT_DIR"

# --- STEP 2: Get table list ---
TABLE_LIST_SQL="$DB_TMP/get_tables.sql"
cat <<EOF > "$TABLE_LIST_SQL"
\o $DB_TMP/tables_raw.tmp
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.SYSTEM_TABLES
WHERE TABLE_TYPE='TABLE' AND TABLE_SCHEM='CDH_edge';
\q
EOF

echo "Extracting table list..."
java -cp "$SQLTOOL_JAR:$HSQLDB_JAR" org.hsqldb.cmdline.SqlTool \
  --inlineRc=url=jdbc:hsqldb:file:$DB_TMP/$DB_BASENAME,username=SA,password= \
  "$TABLE_LIST_SQL"

TABLES=$(grep -vE "(TABLE_NAME|rows)" "$DB_TMP/tables_raw.tmp" | awk '{$1=$1};1')

# --- STEP 3: Export each table to CSV ---
echo "Exporting tables to CSV in $EXPORT_DIR..."

for TABLE in $TABLES; do
  EXPORT_SQL="$DB_TMP/export_${TABLE}.sql"
  cat <<EOF > "$EXPORT_SQL"
* *DSV_COL_DELIM = ,
* *DSV_TARGET_FILE = $EXPORT_DIR/${TABLE}.csv
\xq SELECT * FROM "CDH_edge"."${TABLE}"
EOF

  echo "Exporting $TABLE to $EXPORT_DIR/${TABLE}.csv"

  java -cp "$SQLTOOL_JAR:$HSQLDB_JAR" org.hsqldb.cmdline.SqlTool \
    --inlineRc=url=jdbc:hsqldb:file:$DB_TMP/$DB_BASENAME,username=SA,password= \
    "$EXPORT_SQL"
done

echo "Export complete! All CSVs saved to: $EXPORT_DIR"