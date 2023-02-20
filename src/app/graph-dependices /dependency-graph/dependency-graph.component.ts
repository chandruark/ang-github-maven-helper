import {
   OnInit,
   Component,
   ViewChild
} from '@angular/core';
import {
   MatPaginator
} from '@angular/material/paginator';
import {
   MatSort
} from '@angular/material/sort';
import {
   MatTableDataSource
} from '@angular/material/table';
import {
   HttpClient
} from '@angular/common/http';
import {
   environment
} from '../../../environments/environment';



export interface DependentColumns {
   repoName: string;
   owner: string;
   lifeCycle: string;
   description: string;
   commits: string;
   language: string;
}
/**
* @title Table with pagination
*/
@Component({
   selector: 'app-dependency-graph',
   templateUrl: './dependency-graph.component.html',
   styleUrls: ['./dependency-graph.component.scss']
})

export class DependencyGraphComponent implements OnInit {
   displayedFdsColumns: string[] = ['repoName', 'requestedArtifactVersionsUsed', 'owner', 'lifeCycle', 'description', 'commits', 'language'];
   fetchAllAvailableService: any;
   fetchAllDependentServiceDataSource = new MatTableDataSource < DependentColumns > ();
   fetchAllDependentService: any;
   showLoaderFAS: boolean = false;
   showLoaderFDS: boolean = false;
   showFASAPIFail: boolean = false;
   showFDSAPIFail: boolean = false;
   selectedRowIndex: number = -1;
   selected:any;
   noResult:boolean = false;



   constructor(private http: HttpClient) {
    
   }


   @ViewChild('dependentpaginator') dependentpaginator: any = MatPaginator;
   @ViewChild('sort') sort:any =  MatSort;

    ngOnInit() {
        this.showLoaderFAS = true;
        this.showFASAPIFail = false;
        this.http.get(environment.remoteServiceUrl + '/dependency-graph/all-services').subscribe(res => {
            this.fetchAllAvailableService = res;
            this.showLoaderFAS = false;
            }, err => {
                this.showLoaderFAS = false;
                this.showFASAPIFail = true;
            });
    }

    typeaheadOnSelect(event:any){
        this.fetchDependentService(event.value);
    }

    typeaheadNoResults(event: boolean): void {
        this.noResult = event;
    }
   

    fetchDependentService(artifactId: string) {
        this.fetchAllDependentService = undefined;
        this.showLoaderFDS = true;
        this.showFDSAPIFail = false;
        let groupId = "com.backbase.hdfc";
        this.http.get(environment.remoteServiceUrl + '/dependency-graph/dependent-services?groupId=' + groupId + '&artifactId=' + artifactId).subscribe(res => {
            this.fetchAllDependentService = res;
            this.fetchAllDependentServiceDataSource = new MatTableDataSource(this.fetchAllDependentService?.dependentServiceDetailsList);
            this.fetchAllDependentServiceDataSource.paginator = this.dependentpaginator;
            this.fetchAllDependentServiceDataSource.sort = this.sort;
            this.showLoaderFDS = false;

        }, err => {
            this.showLoaderFDS = false;
            this.showFDSAPIFail = true;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.fetchAllDependentServiceDataSource.filter = filterValue.trim().toLowerCase();
    }

}