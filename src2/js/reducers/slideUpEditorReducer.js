import { SLIDEUP_EDITOR, CLOSE_EDITOR } from '../actions/popupEditorActions'

export function slideUp(state = {}, action = undefined){
  switch(action.type) {
    case CLOSE_EDITOR:
      console.log("action received:", action);
      return { action: CLOSE_EDITOR };
    case SLIDEUP_EDITOR:
      console.log("action received:", action);
      return { action: SLIDEUP_EDITOR };
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}