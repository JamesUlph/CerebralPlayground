let addItem = function (cerebral) {
  cerebral.push('list', {value:cerebral.get('inputValue'),isAwesome:cerebral.get('showOnlyAwesome')});
  cerebral.set('inputValue', '');
};

export default addItem;