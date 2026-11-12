import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Project, ProjectsApiService } from '../services/projects-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    DatePipe,
    RouterLink,
    IonicModule,
  ],
})
export class HomePage implements OnInit {
  projects: Project[] = [];
  loading = true;
  errorMessage = '';
  searchTerm = '';

  constructor(private readonly api: ProjectsApiService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  get filteredProjects(): Project[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    if (!query) return this.projects;

    return this.projects.filter((project) =>
      [project.titel, project.beschreibung, project.Team?.name, project.Team?.klasse]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLocaleLowerCase().includes(query)),
    );
  }

  onSearchChange(event: { detail: { value?: string | null } }): void {
    this.searchTerm = event.detail.value ?? '';
  }

  loadProjects(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'Die Projekte konnten nicht geladen werden. Ist das Backend unter http://localhost:3000 gestartet?';
        this.loading = false;
      },
    });
  }
}
