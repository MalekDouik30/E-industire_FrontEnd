/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { RestVariable } from './restVariable';
import { UserRepresentation } from './userRepresentation';


export interface ProcessInstanceRepresentation { 
    id?: string;
    name?: string;
    businessKey?: string;
    processDefinitionId?: string;
    tenantId?: string;
    started?: string;
    ended?: string;
    startedBy?: UserRepresentation;
    processDefinitionName?: string;
    processDefinitionDescription?: string;
    processDefinitionKey?: string;
    processDefinitionCategory?: string;
    processDefinitionVersion?: number;
    processDefinitionDeploymentId?: string;
    graphicalNotationDefined?: boolean;
    startFormDefined?: boolean;
    variables?: Array<RestVariable>;
}
