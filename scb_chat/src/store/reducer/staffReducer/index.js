import { combineReducers } from 'redux';

import staffProfile from './staffProfile';
import staffUpdate from './staffUpdate';

export default combineReducers({
    staffProfile,
    staffUpdate,
});