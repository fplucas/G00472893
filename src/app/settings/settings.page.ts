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

  measure!: string;

  constructor(private mds: MyDataService) {
  }

  ngOnInit() {
    this.updateMeasureSetting();
  }

  async updateMeasureSetting(): Promise<void> {
    let measure = await this.mds.get("measure");
    // Set this.measure to metric if null
    this.measure = measure || "metric";
    this.setMeasureSetting();
  }

  async setMeasureSetting(): Promise<void> {
    await this.mds.set("measure", this.measure)
  }

}
