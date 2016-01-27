/**
 * This example illustrates a combo box which loads data from a local array.
 */
Ext.define('KitchenSink.view.form.combobox.TreeCombo', {
    extend: 'Ext.form.Panel',
    xtype: 'tree-combo',

    //<example>
    requires: [
        'KitchenSink.store.Files',
        'Ext.ux.form.field.TreeCombo'
    ],

    exampleTitle: 'Tree ComboBox',
    //</example>

    title: 'Tree ComboBox',
    width: 500,
    layout: 'form',
    viewModel: true,

    items: [{
        xtype: 'fieldset',
        layout: 'anchor',
        items: [{
            xtype: 'displayfield',
            fieldLabel: 'Selected File',
            bind: '{file.value}'
        }, {
            xtype: 'treecombo',
            reference: 'file',
            publishes: 'value',
            fieldLabel: 'Select Leaf File',
            onlyLeafSelected:true,
            displayField: 'text',
            valueField: 'text',
            anchor: '-15',
            store: 'Files',
            minChars: 0,
            queryMode: 'local',
            forceSelection: true,
            editable: false
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Selected Files(Multi)',
            bind: '{files.value}'
        }, {
            xtype: 'treecombo',
            reference: 'files',
            multiSelect: true,
            publishes: 'value',
            editable: false,
            forceSelection: true,
            fieldLabel: 'Select Files',
            displayField: 'text',
            valueField: 'text',
            anchor: '-15',
            store: 'Files',
            minChars: 0,
            queryMode: 'local'
            //typeAhead: true
        },{
            xtype: 'displayfield',
            fieldLabel: 'Selected Nodes(Multi with CheckBox)',
            bind: '{nodes.value}'
        }, {
            xtype: 'treecombo',
            reference: 'nodes',
            multiSelect: true,
            publishes: 'value',
            editable: false,
            forceSelection: true,
            fieldLabel: 'Select Nodes',
            displayField: 'text',
            valueField: 'text',
            anchor: '-15',
            store: new Ext.data.TreeStore({
                proxy: {
                    type: 'ajax',
                    url: 'resources/data/tree/check-nodes.json'
                },
                sorters: [{
                    property: 'leaf',
                    direction: 'ASC'
                }, {
                    property: 'text',
                    direction: 'ASC'
                }]
            }),
            minChars: 0,
            queryMode: 'local'
            //typeAhead: true
        }]
    }]
});
