export const UPDATE_PROPERTY_VALUE = 'UPDATE_PROPERTY_VALUE';
export const UPDATE_PROPERTY_NAME  = 'UPDATE_PROPERTY_NAME';
export const DELETE_PROPERTY       = 'DELETE_PROPERTY';
export const SET_ENTIRE_STATE      = 'SET_ENTIRE_DATA';
export const SET_ENTIRE_HTML_DATA  = 'SET_ENTIRE_HTML_DATA';

export function updatePropertyValue( path, newPropertyValue){
  return{ type: UPDATE_PROPERTY_VALUE, path: path,  newPropertyValue: newPropertyValue };
}

export function updatePropertyName( path, newPropertyName){
  return{ type: UPDATE_PROPERTY_NAME, path: path,  newPropertyName: newPropertyName };
}

export function deleteProperty( path ){
  return{ type: DELETE_PROPERTY, path: path };
}

export function setEntireState( css ){
  return{ type: SET_ENTIRE_STATE, css: css };
}

export function setEntireHTMLState( html ){
  return{ type: SET_ENTIRE_HTML_DATA, html: html };
}
