


// Store is one central  place to access the state 

// Actions an object that describe what changes need to be made to the state of the applicaion

// Dispatch  --- it send action to the store , store will communication to reducer

// Reducer --  Calculate the state based on the action.


addtodoItem:(state, action) =>{
    state.push(action.payload)
}


