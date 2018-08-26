"CreateFTable"(arg_account bigint, arg_tmp_schema TEXT)\n                      RETURNS void AS\n                    $BODY$DECLARE\n                            res_new_schemaQ TEXT;\n                            res_new_table TEXT;\n                            res_new_tableQ TEXT;\n                            var_user TEXT := NULL;\n                    BEGIN\n                    res_new_schemaQ = quote_ident(arg_tmp_schema);\n                    SELECT "GetUser"() INTO var_user;\nSELECT new FROM tables_map WHERE old = 1 INTO res_new_table;\n                          res_new_tableQ = res_new_schemaQ || '.' || quote_ident(res_new_table);\nEXECUTE 'CREATE SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '\nSTART WITH 1\nINCREMENT BY  1\nMINVALUE 1\nMAXVALUE 9223372036854775807\nCACHE 1;';\n\nEXECUTE 'CREATE TABLE ' || res_new_tableQ || '(\nid bigint DEFAULT nextval(''' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '''::regclass) NOT NULL,\nlabel text);';\nEXECUTE 'ALTER TABLE ' || res_new_tableQ || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNED BY ' || res_new_tableQ || '.id;';\nEXECUTE 'ALTER TABLE ONLY ' || res_new_tableQ || ' ADD CONSTRAINT ' || quote_ident(res_new_table || '_pkey') || ' PRIMARY KEY (id);';\nSELECT new FROM tables_map WHERE old = 2 INTO res_new_table;\n                          res_new_tableQ = res_new_schemaQ || '.' || quote_ident(res_new_table);\nEXECUTE 'CREATE SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '\nSTART WITH 1\nINCREMENT BY  1\nMINVALUE 1\nMAXVALUE 9223372036854775807\nCACHE 1;';\n\nEXECUTE 'CREATE TABLE ' || res_new_tableQ || '(\nid bigint DEFAULT nextval(''' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '''::regclass) NOT NULL,\nlabel text,\nvalue bigint,\npoll_id bigint);';\nEXECUTE 'ALTER TABLE ' || res_new_tableQ || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNED BY ' || res_new_tableQ || '.id;';\nEXECUTE 'ALTER TABLE ONLY ' || res_new_tableQ || ' ADD CONSTRAINT ' || quote_ident(res_new_table || '_pkey') || ' PRIMARY KEY (id);';\nSELECT new FROM tables_map WHERE old = 3 INTO res_new_table;\n                          res_new_tableQ = res_new_schemaQ || '.' || quote_ident(res_new_table);\nEXECUTE 'CREATE SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '\nSTART WITH 1\nINCREMENT BY  1\nMINVALUE 1\nMAXVALUE 9223372036854775807\nCACHE 1;';\n\nEXECUTE 'CREATE TABLE ' || res_new_tableQ || '(\nid bigint DEFAULT nextval(''' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '''::regclass) NOT NULL,\ntext text,\ndate bigint,\nhead text,\nusers_id bigint,\ncategories_id bigint);';\nEXECUTE 'ALTER TABLE ' || res_new_tableQ || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNED BY ' || res_new_tableQ || '.id;';\nEXECUTE 'ALTER TABLE ONLY ' || res_new_tableQ || ' ADD CONSTRAINT ' || quote_ident(res_new_table || '_pkey') || ' PRIMARY KEY (id);';\nSELECT new FROM tables_map WHERE old = 4 INTO res_new_table;\n                          res_new_tableQ = res_new_schemaQ || '.' || quote_ident(res_new_table);\nEXECUTE 'CREATE SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '\nSTART WITH 1\nINCREMENT BY  1\nMINVALUE 1\nMAXVALUE 9223372036854775807\nCACHE 1;';\n\nEXECUTE 'CREATE TABLE ' || res_new_tableQ || '(\nid bigint DEFAULT nextval(''' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '''::regclass) NOT NULL,\nlabel text);';\nEXECUTE 'ALTER TABLE ' || res_new_tableQ || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNED BY ' || res_new_tableQ || '.id;';\nEXECUTE 'ALTER TABLE ONLY ' || res_new_tableQ || ' ADD CONSTRAINT ' || quote_ident(res_new_table || '_pkey') || ' PRIMARY KEY (id);';\nSELECT new FROM tables_map WHERE old = 5 INTO res_new_table;\n                          res_new_tableQ = res_new_schemaQ || '.' || quote_ident(res_new_table);\nEXECUTE 'CREATE SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '\nSTART WITH 1\nINCREMENT BY  1\nMINVALUE 1\nMAXVALUE 9223372036854775807\nCACHE 1;';\n\nEXECUTE 'CREATE TABLE ' || res_new_tableQ || '(\nid bigint DEFAULT nextval(''' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || '''::regclass) NOT NULL,\nddddd real);';\nEXECUTE 'ALTER TABLE ' || res_new_tableQ || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNER TO ' || '"apd_' || var_user || '";';\nEXECUTE 'ALTER SEQUENCE ' || res_new_schemaQ || '.' || quote_ident(res_new_table || '_id_seq') || ' OWNED BY ' || res_new_tableQ || '.id;';\nEXECUTE 'ALTER TABLE ONLY ' || res_new_tableQ || ' ADD CONSTRAINT ' || quote_ident(res_new_table || '_pkey') || ' PRIMARY KEY (id);';\n\n                    END;$BODY$\n                      LANGUAGE plpgsql VOLATILE\n                      COST 100;/*"1"\tid\tbigint\t"nextval(""1"")::regclass"\t1\n"1"\tlabel\ttext\t\\N\t0\n"2"\tid\tbigint\t"nextval(""2"")::regclass"\t1\n"2"\tlabel\ttext\t\\N\t0\n"2"\tvalue\tbigint\t\\N\t0\n"2"\tpoll_id\tbigint\t\\N\t0\n"3"\tid\tbigint\t"nextval(""3"")::regclass"\t1\n"3"\ttext\ttext\t\\N\t0\n"3"\tdate\tbigint\t\\N\t0\n"3"\thead\ttext\t\\N\t0\n"3"\tusers_id\tbigint\t\\N\t0\n"3"\tcategories_id\tbigint\t\\N\t0\n"4"\tid\tbigint\t"nextval(""4"")::regclass"\t1\n"4"\tlabel\ttext\t\\N\t0\n"5"\tid\tbigint\t"nextval(""5"")::regclass"\t1\n"5"\tddddd\treal\t\\N\t0\n*/
