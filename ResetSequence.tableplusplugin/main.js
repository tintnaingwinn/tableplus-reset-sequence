'use strict';

const reset = async function(context) {
    const items = context.selectedItems();
    const driver = context.driver();

    if (driver !== "PostgreSQL") {
        context.alert('Error', 'This supports only Postgres.');
        return;
    }

    if (items.length == null) {
        context.alert('Error', 'Please select tables!');
        return;
    }

    items.forEach(item => {
        const table = item.name();

        const statement = `SELECT setval('${table}_id_seq', (SELECT max(id) FROM ${table}));`;

        context.execute(statement, res => {
            if (res.errorPosition === -1) {
                SystemService.notify("Success", `The sequence of table ${table} has been reset successfully.`);
            } else {
                context.alert('Error', res.message);
            }
        });

    });
};


global.reset = reset;
