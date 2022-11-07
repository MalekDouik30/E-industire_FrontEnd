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
import { FormOutcome } from './formOutcome';
import { FormModelRepresentationFieldsInner } from './formModelRepresentationFieldsInner';


export interface FormModelRepresentation { 
    id?: string;
    name?: string;
    description?: string;
    key?: string;
    version?: number;
    fields?: Array<FormModelRepresentationFieldsInner>;
    outcomes?: Array<FormOutcome>;
    outcomeVariableName?: string;
}
