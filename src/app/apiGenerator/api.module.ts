import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AppDefinitionsResourceService } from './api/appDefinitionsResource.service';
import { CaseDefinitionResourceService } from './api/caseDefinitionResource.service';
import { CaseDefinitionsResourceService } from './api/caseDefinitionsResource.service';
import { CaseInstanceDisplayJsonClientResourceService } from './api/caseInstanceDisplayJsonClientResource.service';
import { CaseInstanceQueryResourceService } from './api/caseInstanceQueryResource.service';
import { CaseInstanceResourceService } from './api/caseInstanceResource.service';
import { CaseInstancesResourceService } from './api/caseInstancesResource.service';
import { CommentsResourceService } from './api/commentsResource.service';
import { DebuggerResourceService } from './api/debuggerResource.service';
import { HelloService } from './api/hello.service';
import { HistoricTaskQueryResourceService } from './api/historicTaskQueryResource.service';
import { MigrateAppDefinitionsResourceService } from './api/migrateAppDefinitionsResource.service';
import { ProcessDefinitionResourceService } from './api/processDefinitionResource.service';
import { ProcessDefinitionsResourceService } from './api/processDefinitionsResource.service';
import { ProcessInstanceQueryResourceService } from './api/processInstanceQueryResource.service';
import { ProcessInstanceResourceService } from './api/processInstanceResource.service';
import { ProcessInstancesResourceService } from './api/processInstancesResource.service';
import { RelatedContentResourceService } from './api/relatedContentResource.service';
import { RemoteAccountResourceService } from './api/remoteAccountResource.service';
import { RuntimeDisplayJsonClientResourceService } from './api/runtimeDisplayJsonClientResource.service';
import { TaskActionResourceService } from './api/taskActionResource.service';
import { TaskFormResourceService } from './api/taskFormResource.service';
import { TaskQueryResourceService } from './api/taskQueryResource.service';
import { TaskResourceService } from './api/taskResource.service';
import { TasksResourceService } from './api/tasksResource.service';
import { UserResourceService } from './api/userResource.service';
import { WorkflowGroupResourceService } from './api/workflowGroupResource.service';
import { WorkflowGroupsResourceService } from './api/workflowGroupsResource.service';
import { WorkflowUsersResourceService } from './api/workflowUsersResource.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
