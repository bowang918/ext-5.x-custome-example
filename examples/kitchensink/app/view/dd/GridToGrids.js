/**
 * This example shows how to setup two way drag and drop from one GridPanel to another.
 */
Ext.define('KitchenSink.view.dd.GridToGrids', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.grid.*',
        'Ext.layout.container.HBox',
        'KitchenSink.model.dd.Simple',
        'Ext.grid.feature.Grouping'
    ],
    xtype: 'dd-grid-to-grids',

    //<example>
    exampleTitle: 'Drag and Drop from Grid to Grid Example',
    otherContent: [{
        type: 'Model',
        path: 'app/model/dd/Simple.js'
    }],
    //</example>

    layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },

    width: 1200,
    height: 600,

    myData: [
        {parent: 'PRec 0', name: 'Rec 0', column1: '0', column2: '0'},
        {parent: 'PRec 0', name: 'Rec 1', column1: '1', column2: '1'},
        {parent: 'PRec 0', name: 'Rec 2', column1: '2', column2: '2'},
        {parent: 'PRec 1', name: 'Rec 3', column1: '3', column2: '3'},
        {parent: 'PRec 1', name: 'Rec 4', column1: '4', column2: '4'},
        {parent: 'PRec 2', name: 'Rec 5', column1: '5', column2: '5'},
        {parent: 'PRec 3', name: 'Rec 6', column1: '6', column2: '6'},
        {parent: 'PRec 3', name: 'Rec 7', column1: '7', column2: '7'},
        {name: 'Rec 8', column1: '8', column2: '8'},
        {name: 'Rec 9', column1: '9', column2: '9'}
    ],

    initComponent: function () {
        var me = this,
            group1 = me.id + 'group1',
            group2 = me.id + 'group2',
            columns = [{//xtype: 'rownumberer'}, {
                text: 'Column Name',
                flex: 1,
                sortable: true,
                menuDisabled: true,
                dataIndex: 'name'
            }],
            sortedByColymns = [{
                //    xtype: 'rownumberer'
                //}, {
                text: 'Column Name',
                flex: 1,
                menuDisabled: true,
                sortable: true,
                dataIndex: 'name'
            }, {
                text: 'Direction',
                //xtype: 'actioncolumn',
                sortable: false,
                menuDisabled: true,
                width: 80,
                editor: {
                    xtype: 'combo',
                    allowBlank: false,
                    editable: false,
                    displayField: 'direction',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['direction'],
                        data: [
                            {direction: 'Asc'},
                            {direction: 'Desc'}
                        ]
                    })
                },
                dataIndex: 'sortedByDirection',
            }];

        me.items = [{
            itemId: 'sourceList',
            flex: 1,
            xtype: 'grid',
            selType: 'checkboxmodel',
            multiSelect: true,
            //features: [{
            //    ftype: 'grouping',
            //    groupHeaderTpl: '{name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
            //    hideGroupedHeader: true,
            //    startCollapsed: false,
            //
            //}],
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    containerScroll: true,
                    dragGroup: group1,
                    dropGroup: group2
                },
                listeners: {
                    //drop: function (node, data, dropRec, dropPosition) {
                    //
                    //}
                }
            },

            store: new Ext.data.Store({
                model: KitchenSink.model.dd.Simple,
                data: me.myData,
                groupField: 'parent'
            }),
            columns: columns,
            title: 'Available Output Columns',
            margin: '0 5 0 0'
        }, {
            xtype: 'container',
            width: 20,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            defaults: {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'tool'
                },
                margin: '0 0 30 0',
            },
            margin: '0 5 0 5',
            items: [{
                items: [{
                    type: 'right',
                    handler: function () {
                        me.moveRecords(me.down('#sourceList'), me.down('#selectedList'));
                    },
                    scale: 'medium',
                    margin: '0 0 5 0',
                }, {
                    //iconCls: 'fa fa-angle-double-right fa-2x',
                    type: 'next',
                    handler: function () {
                        me.moveRecords(me.down('#sourceList'), me.down('#selectedList'), true);
                    },
                    scale: 'medium',
                    margin: '5 0 0 0',
                }]
            }, {
                items: [{
                    type: 'prev',
                    handler: function () {
                        var selectedListGrid = me.down('#selectedList'),
                            sourceListGrid = me.down('#sourceList'),
                            sortedByListGrid = me.down('#sortedByList'),
                            groupedByListGrid = me.down('#groupedByList'), s;

                        s = selectedListGrid.getSelectionModel().getSelection();
                        me.removeRecords(sortedByListGrid, false, s);
                        me.removeRecords(groupedByListGrid, false, s);
                        me.moveRecords(selectedListGrid, sourceListGrid);
                    },
                    scale: 'medium',
                    margin: '0 0 5 0',
                }, {
                    type: 'left',
                    handler: function () {
                        me.onResetClick();
                    },
                    scale: 'medium',
                    margin: '5 0 0 0',
                }]
            }]
        }, {
            itemId: 'selectedList',
            flex: 1,
            xtype: 'grid',
            selType: 'checkboxmodel',
            //features: [{
            //    ftype: 'grouping',
            //    groupHeaderTpl: '{name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
            //    hideGroupedHeader: true,
            //    startCollapsed: false,
            //
            //}],
            viewConfig: {
                copy: true,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    containerScroll: true,
                    dragGroup: group2,
                    dropGroup: group1
                },
                listeners: {
                    //drop: function (node, data, dropRec, dropPosition) {
                    //}
                }
            },
            store: new Ext.data.Store({
                model: KitchenSink.model.dd.Simple,
                groupField: 'parent'
            }),
            columns: columns,
            stripeRows: true,
            title: 'Selected List',
            margin: '0 5 0 5',
            tools: [{
                type: 'up',
                tooltip: 'Up',
                scope: this,
                handler: this.onResetClick
            }, {
                type: 'down',
                tooltip: 'Down',
                scope: this,
                handler: this.onResetClick
            }, {
                type: 'refresh',
                cls: 'fa fa-check-circle fa-lg',
                tooltip: 'Reset both grids',
                scope: this,
                handler: this.onResetClick
            }]
        }, {
            xtype: 'container',
            width: 20,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'stretch'
            },
            margin: '0 5',
            defaults:{
                xtype: 'container',
                width: 20,
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                margin: '0 5 0 5',
                defaults: {
                    xtype: 'container',
                    width: 20,
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'tool'
                    },
                },
            },
            items: [{
                items: [{
                    margin: '0 0 30 0',
                    items: [{
                        type:'right',
                        handler: function () {
                            me.moveRecords(me.down('#selectedList'), me.down('#sortedByList'), false, true);
                        },
                        scale: 'medium',
                        margin: '0 0 5 0',
                    }, {
                        type:'next',
                        handler: function () {
                            me.moveRecords(me.down('#selectedList'), me.down('#sortedByList'), true, true);
                        },
                        scale: 'medium',
                        margin: '5 0 0 0',
                    }]
                }, {
                    margin: '30 0 0 0',
                    items: [{
                        type:'prev',
                        handler: function () {
                            me.removeRecords(me.down('#sortedByList'));
                        },
                        scale: 'medium',
                        margin: '0 0 5 0',
                    }, {
                        type:'left',
                        handler: function () {
                            me.removeRecords(me.down('#sortedByList'), true);
                        },
                        scale: 'medium',
                        margin: '5 0 0 0',
                    }]
                }],
                margin: '0 0 50 0',
            }, {
                margin: '0 5 0 5',
                items: [{
                    items: [{
                        type:'left',
                        handler: function () {
                            me.moveRecords(me.down('#selectedList'), me.down('#groupedByList'), false, true);
                        },
                        scale: 'medium',
                        margin: '0 0 5 0',
                    }, {
                        type:'next',
                        handler: function () {
                            me.moveRecords(me.down('#selectedList'), me.down('#groupedByList'), true, true);
                        },
                        scale: 'medium',
                        margin: '5 0 0 0',
                    }]
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'stretch'
                    },
                    margin: '30 0 0 0',
                    items: [{
                        type:'prev',
                        handler: function () {
                            me.removeRecords(me.down('#groupedByList'));
                        },
                        scale: 'medium',
                        margin: '0 0 5 0',
                    }, {
                        type:'left',
                        handler: function () {
                            me.removeRecords(me.down('#groupedByList'), true);
                        },
                        scale: 'medium',
                        margin: '5 0 0 0',
                    }]
                }],
                margin: '50 0 0 0',
            }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                itemId: 'sortedByList',
                flex: 1,
                xtype: 'grid',
                selType: 'checkboxmodel',
                //features: [{
                //    ftype: 'grouping',
                //    groupHeaderTpl: '{name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                //    hideGroupedHeader: true,
                //    startCollapsed: false
                //
                //}],
                multiSelect: true,
                plugins: [{
                    ptype: 'cellediting',
                    clicksToEdit: 1
                }],
                viewConfig: {
                    plugins: [{
                        ptype: 'gridviewdragdrop',
                        containerScroll: true,
                        enableDrag: false,
                        dragGroup: group1,
                        dropGroup: group2
                    }],
                    listeners: {
                        drop: function (node, data, dropRec, dropPosition) {
                        }
                    }
                },
                store: new Ext.data.Store({
                    model: KitchenSink.model.dd.Simple,
                    groupField: 'parent'
                }),
                columns: sortedByColymns,
                title: 'Sorted By List',
                tools: [{
                    type: 'up',
                    tooltip: 'Up',
                    scope: this,
                    handler: this.onResetClick
                }, {
                    type: 'down',
                    tooltip: 'Down',
                    scope: this,
                    handler: this.onResetClick
                }],
                margin: '0 0 5 5'
            }, {
                itemId: 'groupedByList',
                flex: 1,
                xtype: 'grid',
                selType: 'checkboxmodel',
                multiSelect: true,
                //features: [{
                //    ftype: 'grouping',
                //    groupHeaderTpl: '{name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                //    hideGroupedHeader: true,
                //    startCollapsed: false,
                //
                //}],
                viewConfig: {
                    plugins: {
                        ptype: 'gridviewdragdrop',
                        containerScroll: true,
                        enableDrag: false,
                        dragGroup: group1,
                        dropGroup: group2
                    },
                    listeners: {
                        drop: function (node, data, dropRec, dropPosition) {
                        }
                    }
                },
                store: new Ext.data.Store({
                    model: KitchenSink.model.dd.Simple,
                    groupField: 'parent'
                }),
                columns: columns,
                stripeRows: true,
                title: 'Group By List',
                //iconCls: 'fa fa-archive fa-lg',
                iconAlign: 'right',
                margin: '5 0 0 5'
            }]
        }];

        me.callParent();
    },

    onResetClick: function () {
        var me = this,
            selectedListGrid = me.down('#selectedList'),
            sourceListGrid = me.down('#sourceList'),
            sortedByListGrid = me.down('#sortedByList'),
            groupedByListGrid = me.down('#groupedByList');
        me.removeRecords(sortedByListGrid, true);
        me.removeRecords(groupedByListGrid, true);
        me.moveRecords(selectedListGrid, sourceListGrid, true);
    },

    moveRecords: function (sourceGrid, targetGrid, all, copy) {
        var me = this;
        if (sourceGrid && targetGrid) {
            var sourceStore = sourceGrid.getStore(), targetStore = targetGrid.getStore();
            if (all) {
                //copy all
                sourceStore.each(function (record) {
                    targetStore.add(record.copy());
                });
                if (!copy) {
                    sourceStore.removeAll();
                }
            } else {
                var s = sourceGrid.getSelectionModel().getSelection();
                Ext.each(s, function (record) {
                    targetStore.add(record.copy());
                }, this);
                if (!copy) {
                    sourceStore.remove(s);
                }
            }
        }
    },
    removeRecords: function (targetGrid, all, records) {
        var me = this;
        if (targetGrid) {
            var targetStore = targetGrid.getStore();
            if (all) {
                targetStore.removeAll();
            } else if (records) {
                Ext.each(records, function (record) {
                    targetStore.remove(record.copy());
                });
            } else {
                targetStore.remove(targetGrid.getSelectionModel().getSelection());
            }
        }
    }
});
