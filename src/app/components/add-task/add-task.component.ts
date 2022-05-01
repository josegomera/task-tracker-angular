import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter

  formTask = this.fb.group({
    text: ['', Validators.required],
    day: ['', Validators.required],
    reminder: [false, Validators.requiredTrue],
  })

  showAddTask!: boolean;
  subscription!: Subscription

  constructor(private uiService: UiService, private fb: FormBuilder) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onAddTask.emit(this.formTask.value);
    this.formTask.reset();
  }
}
