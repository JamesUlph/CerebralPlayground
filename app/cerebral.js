import Cerebral from 'cerebral';

let cerebral = Cerebral({
  inputValue: '',
  showOnlyAwesome:false,
  list: function() {
    return {
      initialState:[],
      lookupState:['showOnlyAwesome'],
      get(cerebral, lookupState,items){
        console.log('get fired');
        return items.filter(function(item){
          if (lookupState.showOnlyAwesome){
             return item.isAwesome;
          } else {
          return true;
        }
        
      });
    }
  };
  }
});

export default cerebral;