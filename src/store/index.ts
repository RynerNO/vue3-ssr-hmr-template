import {createStore} from 'vuex'


type State = {
 
}

const state: State = {
    test: "SJDFHJSDJAS"
};

const mutations = {

};

export const store = createStore({ state() {
    return state;
    
}, mutations });
