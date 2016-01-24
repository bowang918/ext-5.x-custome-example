/**
 * Created by bw79213 on 1/22/2016.
 */

/**
 * This example assumes prior knowledge of using a GridPanel.
 *
 * This illustrates how a DragZone can manage an arbitrary number of drag sources, and how
 * a DropZone can manage an arbitrary number of targets.
 *
 * Fields are editable. Drag the fields into the grid using the label as the handle.
 */
Ext.define('KitchenSink.view.dd.FieldToField', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ext.dd.DropZone',
        'Ext.dd.DragZone',
        'Ext.form.*',
        'KitchenSink.model.Company',
        'Ext.layout.container.VBox'
    ],    
    xtype: 'dd-field-to-field',
    
    //<example>
    otherContent: [{
        type: 'Model',
        path: 'app/model/Company.js'
    },{
        type: 'Data',
        path: 'app/data/DataSets.js'
    }],
    themes: {
        classic: {
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85
        },
        neptune: {
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115
        }
    },
    //</example>
    
    width: 700,
    height: 450,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    initComponent: function(){
        var store = new Ext.data.Store({
            model: KitchenSink.model.Company,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'array'
                }
            },
            data: KitchenSink.data.DataSets.company
        }), group = this.id + 'ddGroup';
        
        Ext.apply(this, {
            items: [{
                frame: true,
                margin: '10 0 0 0',
                bodyPadding: 5,
                //plugins: new Ext.ux.dd.PanelFieldDragZone({
                //    ddGroup: group
                //}),
                defaults: {
                    labelWidth: 150
                },
                items: [{
                    xtype: 'combo',
                    editable:false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['abbr', 'name'],
                        data : [
                            {"abbr":"AL", "name":"Alabama"},
                            {"abbr":"AK", "name":"Alaska"},
                            {"abbr":"AZ", "name":"Arizona"}
                        ]
                    }),
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    listeners:{
                        'render':function(field){
                            field.dragZone = new Ext.dd.DragZone(field.getEl(), {
                                ddGroup:group,
                                getDragData: function(e) {
                                    var text,oldMark,dragEl;
                                    // Temporary prevent marking the field as invalid, since it causes changes
                                    // to the underlying dom element which can cause problems in IE
                                    oldMark = field.preventMark;
                                    field.preventMark = true;
                                    if (field.isValid()) {
                                        field.preventMark = oldMark;
                                        dragEl = document.createElement('div');
                                        dragEl.className = Ext.baseCSSPrefix + 'form-text';
                                        text = field.getRawValue();
                                        dragEl.innerHTML = Ext.isEmpty(text) ? '&#160;' : text;
                                        Ext.fly(dragEl).setWidth(field.getEl().getWidth());
                                        return {
                                            field: field,
                                            ddel: dragEl
                                        };
                                    }
                                    e.stopEvent();
                                },
                                getRepairXY: function() {
                                    return this.dragData.field.getEl().getXY();
                                }
                            });
                        }
                    }
                },{
                    xtype: 'htmleditor',
                    listeners:{
                        'render':function(field){
                            field.dropZone = new Ext.dd.DropZone(field.getEl(), {
                                ddGroup:group,
                                // If the mouse is over a grid row, return that node. This is
                                // provided as the "target" parameter in all "onNodeXXXX" node event handling functions
                                getTargetFromEvent: function(e) {
                                    return field;
                                },

                                onNodeOver: function (target, dd, e, data) {
                                    return Ext.dd.DropZone.prototype.dropAllowed;
                                },

                                onNodeDrop: function (target, dd, e, data) {
                                    target.insertAtCursor(data.field.getDisplayValue());
                                    return true;
                                }
                            });
                        }
                    }
                }]
            }]
        });
        this.callParent();
    }
});
