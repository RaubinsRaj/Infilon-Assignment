const initialState = {
    data : [],
    

};

const usersReducers = (state = initialState, action) => {
    switch(action.type){
        case 'GET_DATA':
            let rawData = [...initialState.data];
            
        default: return state;
    }
};

export default usersReducers;