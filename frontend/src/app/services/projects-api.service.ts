import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Team {
  id: number;
  name: string;
  klasse: string;
}

export interface Criterion {
  id: number;
  name: string;
  maxScore: number;
}

export interface Evaluation {
  id: number;
  score: number;
  comment: string | null;
  criterionId: number;
  jurorId: number;
  Criterion?: Criterion;
}

export interface Project {
  id: number;
  teamId: number;
  titel: string;
  beschreibung: string;
  praesentiertAm: string;
  Team?: Team;
  Evaluations?: Evaluation[];
}

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private readonly url = `${environment.apiUrl}/projects`;

  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}/${id}`);
  }
}
