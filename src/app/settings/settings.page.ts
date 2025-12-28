import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonText, IonRadioGroup, IonRadio, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [IonText, IonRadioGroup, IonRadio, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  measurementType!: string;

  constructor(private mds: MyDataService) {
  }

  ngOnInit() {
    this.updateMeasurementType();
  }

  async updateMeasurementType(): Promise<void> {
    let measurementType = await this.mds.get("measurementType");
    // Set this.measure to metric if null
    this.measurementType = measurementType || "metric";
    this.setMeasurementType();
  }

  async setMeasurementType(): Promise<void> {
    await this.mds.set("measurementType", this.measurementType)
  }

}
