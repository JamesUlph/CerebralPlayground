import React from 'react';
import AddTodo from './AddTodo';

import Cerebral from 'cerebral/decorator';



@Cerebral(['inputValue', 'list','showOnlyAwesome'])
class App extends React.Component {
	
	constructor(){
		super();
		this.renderRow=this.renderRow.bind(this);
	}

	onInputValueSubmit(event) {
		event.preventDefault();
		if (this.props.inputValue) {
			this.signals.inputValueSubmitted();
		}
	}
	changeInputValue(event) {
		this.signals.inputValueChanged(event.target.value);
	}



	renderListItem(item, index) {
		return <li key={index}>
		{item.value} - 
		{item.isAwesome ? ' awesome' : ' boring'}</li>
	}

	plop(){
		console.log('f');
	}

	renderRow(item,index){
		var _this=this;

		return <tr key={index} onClick={this.signals.itemSelect.bind(this,item)}><td>{index}</td><td>{item.value}</td><td>{item.isAwesome ? ' awesome' : ' boring'}</td></tr>

	}

	renderOption(item,index){
		return <option key={item.value} value={index}>{item.value}</option>
	}

	render(){


		return (
			<div>
			<div className="nicebar">Toolbar</div>
			<h1>Prototype</h1>
			
			<AddTodo />
			<AddTodo />
			<AddTodo />
		
			<button type="button" onClick={this.signals.onClearClick.bind(this)}>Clear</button>
			
			<form onSubmit={this.onInputValueSubmit.bind(this)}>
			<input type="text" value={this.props.inputValue} onChange={this.changeInputValue.bind(this)}/>
			<button type="button" onClick={this.onInputValueSubmit.bind(this)}>Add</button>
			
			
			</form>
			<input type="checkbox" checked={this.props.showOnlyAwesome} onChange={this.signals.showOnlyAwesomeToggled} />
			
			{this.props.list.length}
			
			<ul>
			
			
			{this.props.list.map(this.renderListItem)}
			
			</ul>
			
			<table className="mytable">
			<tbody>
			{this.props.list.map(this.renderRow)}
			</tbody>
			</table>
			
			<select>{this.props.list.map(this.renderOption)}</select>
			<select onChange={this.plop}>{this.props.list.map(this.renderOption)}</select>


			

			</div>
			);
	}
}

export default App;