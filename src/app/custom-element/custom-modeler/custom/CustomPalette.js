import {
  assign
} from 'min-dash';

const customElements = require('../../../custom-element/custom-elements.json');

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(palette, create, elementFactory, spaceTool, lassoTool) {

  this._create = create;
  this._elementFactory = elementFactory;
  this._spaceTool = spaceTool;
  this._lassoTool = lassoTool;
  
  palette.registerProvider(this);

  //   palette.isFilterAppied = false;

  //   palette.getEntries = function() {

  //     var entries = {};

  //     var e = this.getPaletteEntries();
  //       if(palette.isFilterAppied) {
  //         e = this.filterPaletteEntries();
  //       }

  //       forEach(e, function(entry, id) {
  //         entries[id] = entry;
  //       });

  //     return entries;
  //   };
  this.isFilterApplied = false;

  // palette.updateFilter(flag) {
  //   this.isFilterApplied = flag;
  // }

}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool'
];


PaletteProvider.prototype.getPaletteEntries = function (element) {

  var actions = {},
    create = this._create,
    elementFactory = this._elementFactory,
    spaceTool = this._spaceTool,
    lassoTool = this._lassoTool,
    filtered = this.isFilterApplied;


  function createAction(type, group, className, title, options) {
    function createListener(event) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }

      create.start(event, shape);
    }

    var shortType = type.replace(/^bpmn:/, '');

    return {
      group: group,
      className: className,
      title: title || 'Create ' + shortType,
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }

  function createParticipant(event, collapsed) {
    create.start(event, elementFactory.createParticipantShape(collapsed));
    alert('hello world!');
  }
  function filterPaletteEntries () {

    return {
      'custom-triangle': createAction(
        'custom:triangle', 'custom', 'icon-custom-triangle'
      ),
      'custom-circle': createAction(
        'custom:circle', 'custom', 'icon-custom-circle'
      ),
      'bpmn:ServiceTask': createAction(
        'bpmn:ServiceTask', 'custom', 'icon-custom-servicetask'
      )
    };
  
  }


  var customCreates = {};

  //   customElements.forEach(element => {
  //    customCreates[element.type]= createAction(element.type, 'custom', element.class),
  //   });
  // }

  console.log(customCreates);

  assign(actions, {
    'custom-triangle': createAction(
      'custom:triangle', 'custom', 'icon-custom-triangle'
    ),
    'custom-circle': createAction(
      'custom:circle', 'custom', 'icon-custom-circle'
    ),
    'bpmn:ServiceTask': createAction(
      'bpmn:ServiceTask', 'custom', 'icon-custom-servicetask'
    ),
    'custom-separator': {
      group: 'custom',
      separator: true
    },
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      title: 'Activate the lasso tool',
      action: {
        click: function (event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    'space-tool': {
      group: 'tools',
      className: 'bpmn-icon-space-tool',
      title: 'Activate the create/remove space tool',
      action: {
        click: function (event) {
          spaceTool.activateSelection(event);
        }
      }
    },
    'tool-separator': {
      group: 'tools',
      separator: true
    },
    'create.start-event': createAction(
      'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none'
    ),
    'create.intermediate-event': createAction(
      'bpmn:IntermediateThrowEvent', 'event', 'bpmn-icon-intermediate-event-none'
    ),
    'create.end-event': createAction(
      'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none'
    ),
    'create.exclusive-gateway': createAction(
      'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor'
    ),
    'create.task': createAction(
      'bpmn:Task', 'activity', 'bpmn-icon-task'
    ),
    'create.subprocess-expanded': createAction(
      'bpmn:SubProcess', 'activity', 'bpmn-icon-subprocess-expanded', 'Create expanded SubProcess',
      { isExpanded: true }
    ),
    'create.participant-expanded': {
      group: 'collaboration',
      className: 'bpmn-icon-participant',
      title: 'Create Pool/Participant',
      action: {
        dragstart: createParticipant,
        click: createParticipant
      }
    }
  });
 
  return filtered ? filterPaletteEntries(): actions;
};

