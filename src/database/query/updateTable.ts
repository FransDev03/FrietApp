import addColumn from '../helpers/addColumnHelper';
import editColumn from '../helpers/editColumnHelper';
import deleteColumn from '../helpers/deleteColumnHelper';

interface TableContent {
    add?: Array<object>;
    edit?: Array<object>;
    delete?: Array<string>;
}

/**
 * UpdateTable Function
 *
 * @param { string } table
 * @param { object } tableContent
 */
const updateTable = (table: string, tableContent: TableContent): void => {
    if (tableContent.add) {
        addColumn(table, tableContent.add);
    }
    if (tableContent.edit) {
        editColumn(table, tableContent.edit);
    }
    if (tableContent.delete) {
        deleteColumn(table, tableContent.delete);
    }
};

export { updateTable };
