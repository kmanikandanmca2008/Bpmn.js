import { Component, OnInit, Inject } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import CustomModeler from './../custom-element/custom-modeler';
import CustomModule from './../custom-element/custom-modeler/custom';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';


const file = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
 xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
 xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
 xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" 
 id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
<bpmn2:process id="Process_1" isExecutable="false">
  <bpmn2:startEvent id="StartEvent_1"/>
</bpmn2:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
  <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
    <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
      <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
    </bpmndi:BPMNShape>
  </bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

@Component({
  selector: 'app-atom-modeler',
  templateUrl: './atom-modeler.component.html',
  styleUrls: ['./atom-modeler.component.scss']
})
export class AtomModelerComponent implements OnInit {
  isAdvanced = true;
  modeller: any;
  palette: any;

  secondFormGroup: FormGroup = new FormGroup({
    Addr: new FormControl()
  });
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.init();
  }
  toggleProps(val: boolean) {
    this.isAdvanced = val;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WizardDialogComponent, {
      width: '50vw',
      height: '50vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  showxml(xml): void {
    const dialogRef = this.dialog.open(XmlDialogComponent, {
      width: '50vw',
      height: '50vh',
      data: xml
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  filterPalette() {
    // const palette = this.modeller.get('palette');
    const pp = this.modeller.get('paletteProvider');
    pp.isFilterApplied = true;
    this.palette._update();
  }

  FullPalette() {
    const palette = this.modeller.get('palette');
    const pp = this.modeller.get('paletteProvider');
    pp.isFilterApplied = false;
    palette._update();
  }

  init() {
    const self = this;

    // const modeler = new BpmnModeler({
    //   container: '#js-canvas',
    //   propertiesPanel: {
    //     parent: '#props'
    //   },
    //   additionalModules: [
    //     propertiesPanelModule,
    //     propertiesProviderModule
    //   ],
    // });

    this.modeller = new CustomModeler({
      container: '#js-canvas',
      propertiesPanel: {
        parent: '#props'
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule
      ],
    });

    this.palette = this.modeller.get('palette');

    const eventBus = this.modeller.get('eventBus');
const pp = this.modeller.get('propertiesPanel');


    eventBus.on('commandStack.shape.create.postExecute', (param) => {
      this.openDialog();
    });
    createNewDiagram();
    // modeler.addCustomElements(customElements);

    function createNewDiagram() {
      self.openDiagram(file);
    }


  }

  togglePalette() {
    this.palette.toggle();
  }

  getxml() {
    this.saveDiagram((er, suc) => {
      console.log(suc, er);
      this.showxml(suc);
    });
  }

  openDiagram(xml) {

    this.modeller.importXML(xml, function (err) { });
  }

  saveSVG(done) {
    this.modeller.saveSVG(done);
  }

  saveDiagram(done) {

    this.modeller.saveXML({ format: true }, function (err, xml) {
      done(err, xml);
    });
  }

  updatePallete() {
    const pp = CustomModule.paletteProvider[1];

    //  console.log('updating pallete', pp.updatePaletteEntries());

  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'wizard',
  templateUrl: 'wizard.html',
})
export class WizardDialogComponent {
  firstFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl()
  });
  constructor(
    public dialogRef: MatDialogRef<WizardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  templateUrl: 'bpmn.html',
})
export class XmlDialogComponent {
  firstFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl()
  });
  constructor(
    public dialogRef: MatDialogRef<XmlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
