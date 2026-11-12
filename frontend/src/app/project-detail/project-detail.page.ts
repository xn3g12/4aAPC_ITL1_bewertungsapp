import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Project, ProjectsApiService } from '../services/projects-api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
  imports: [
    DatePipe,
    RouterLink,
    IonicModule,
  ],
})
export class ProjectDetailPage implements OnInit {
  project?: Project;
  loading = true;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ProjectsApiService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id < 1) {
      this.errorMessage = 'Die Projekt-ID ist ungültig.';
      this.loading = false;
      return;
    }

    this.api.getProject(id).subscribe({
      next: (project) => {
        this.project = project;
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'Das Projekt konnte nicht geladen werden. Prüfe, ob das Backend erreichbar ist.';
        this.loading = false;
      },
    });
  }
}
