/**
 * Created by FANFAN on 2016/1/24.
 */
/**
 * This example illustrates a combo box which loads data from a local array.
 */
Ext.define('KitchenSink.view.form.combobox.CheckBoxSelectionMode', {
    extend: 'Ext.form.Panel',
    xtype: 'check-combo',

    //<example>
    requires: [
        'KitchenSink.model.State',
        'KitchenSink.store.States',
        'Ext.ux.form.field.CheckCombo'
    ],

    exampleTitle: 'Check ComboBox',
    otherContent: [{
        type: 'Model',
        path: 'app/model/State.js'
    }, {
        type: 'Store',
        path: 'app/store/States.js'
    }],
    //</example>

    title: 'Check ComboBox',
    width: 500,
    layout: 'form',
    viewModel: {},

    items: [{
        xtype: 'fieldset',
        layout: 'anchor',
        items: [{
            xtype: 'component',
            anchor: '100%',
            html: [
                '<h3>Locally loaded data</h3>',
                '<p>This ComboBox uses local data from a JS array</p>'
            ]
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Selected State',
            bind: '{state.value}'
        }, {
            xtype: 'checkcombo',
            reference: 'state',
            publishes: 'value',
            fieldLabel: 'Select State',
            displayField: 'state',
            anchor: '-15',
            store: {
                type: 'states'
            },
            minChars: 0,
            queryMode: 'local',
            typeAhead: true
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Selected States',
            bind: '{states.value}'
        }, {
            xtype: 'checkcombo',
            reference: 'states',
            publishes: 'value',
            multiSelect: true,
            fieldLabel: 'Select States(Multi Selection)',
            displayField: 'state',
            anchor: '-15',
            store: {
                type: 'states'
            },
            minChars: 0,
            queryMode: 'local'
        }]
    }]
});
