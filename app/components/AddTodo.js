import React from 'react';

import {Rxlite} from 'rx';
import Cerebral from 'cerebral/decorator';
import classNames from 'classnames';

@Cerebral(['inputValue', 'list','showOnlyAwesome'])
class AddTodo extends React.Component {

	constructor(){
		super();

		this.state={year:2015,month:0,offset:1};
		
		this.days=[];
		this.weeks=[];
		this.heading=[];

		this.monthName=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		this.dayOfWeek=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		this.monthDays=[31,28,31,30,31,30,31,31,30,30,30,31]

		let i=0;

		let q=i%7;

		var ee=new Rx.ReplaySubject(1);

		ee.subscribe( (payload)=>{
			console.log('payload=',payload);
		});

		ee.onNext({key:1});

		setTimeout(()=>{
			ee.onNext({key:331});
			this.setState({fred:true});
		},3000);
		

		var ob=Rx.Observable.create((observer)=>{
			console.log('obs');
			setTimeout( ()=>{
				observer.onNext(42);
				
			},1000);

			return ()=>{
				console.log('dispose');
			};			
		});

		var disp=ob.subscribe(x=> console.log('done ',x));
		var disp2=ob.subscribe(x=> console.log('done2 ',x));

		//disp.dispose();

		var d=new Date(2015,0);


		//alert(this.monthName[d.getMonth()]);

		//this.setState({month:this.monthName[d.getMonth()]});

		console.log(d);

		let offset=this.state.offset; // start of week offset (0=sun)
		let mth=d.getMonth();
		let days=this.monthDays[mth];
		
		

		let day=1-((d.getDay()-offset));

		if (day>1) day-=7;

		

		for (let w=0; w<6; w++){

			var dy=[];

			// gen a week
			for (let p=0;p<7;p++){
				let q=(p+offset)%7;		

				if (day>0 && day <= days){
					dy.push({title:this.dayOfWeek[q],day:day});
				}
				else {
					if (day>days){
						dy.push({title:'',day:-1});
					}
					else {
						dy.push({title:'',day:-1});
					}
					
				}
				day++;
			}

			this.weeks.push(dy);
			if (day>days) break;
		}


		this.renderWeek=this.renderWeek.bind(this);
		this.renderHeading=this.renderHeading.bind(this);
		this.calculate=this.calculate.bind(this);

		
	}


	calculate(){
		console.log('calculate ',this.state.month);

		var d=new Date(this.state.year,this.state.month);		

		let y=this.state.year;
		this.monthDays[1]= !(y % 4) && (y % 100) || !(y % 400)==true ? 29 : 28;

		this.heading=[];
		this.weeks=[];

		let offset=this.state.offset; // start of week offset (0=sun)
		let mth=d.getMonth();
		let days=this.monthDays[mth];

		let prevmth = mth==0 ? 11 : mth-1;

		console.log('prev ',prevmth);

		let day=1-((d.getDay()-offset));

		if (day>1) day-=7;

		for (let p=0; p<7; p++){
			let q=(p+offset)%7;
			this.heading.push(this.dayOfWeek[q]);

		}

console.log(this.heading);
		for (let w=0; w<6; w++){

			var dy=[];


			// gen a week
			for (let p=0;p<7;p++){
				let q=(p+offset)%7;		

				if (day>0 && day <= days){
					dy.push({title:this.dayOfWeek[q],day:day,current:true});
				}
				else {
					if (day<=0) {
						dy.push({title:this.dayOfWeek[q],day:this.monthDays[prevmth]+day,current:false});
					}
					else {
						dy.push({title:this.dayOfWeek[q],day:day-this.monthDays[mth],current:false});
					}
				}
				day++;
			}

			this.weeks.push(dy);
			if (day>days) break;
		}



	}


	renderDay(item,index){
		if (item==undefined) return;

		var cl=classNames({'cellTitle':true,'current':!item.current});
		var cl2=classNames({'cellBody':true,'current':!item.current});
		//return (<td className={cl}><div className={cl}>{item.title}</div><div className={cl2}>{item.day==-1 ? '' : item.day}</div></td>);
		return (<td className={cl}><div className={cl2}>{item.day==-1 ? '' : item.day}</div></td>);
	}

	renderWeek(item,index){
		if (item==undefined) return;

		var t=item.map(this.renderDay);
		return (<tr>{t}</tr>);
	}

	renderHeading(){

		var t=this.heading.map((i,x)=>{
			return <td>{i}</td>;
		});
		
		return <tr>{t}</tr>;
	}

	addMonth(){
		
		this.setState(function(previousState, currentProps) {
			var p=(previousState.month+1)%12;
			return {month: p};
		});

		
		console.log('add month ');
		
		
	}

	addYear(){
		this.setState(function(previousState, currentProps) {
			var p=previousState.year+1;
			return {year: p};
		});

		
		console.log('add year ');
	}

	addOffset(){
		this.setState(function(previousState, currentProps) {
			var p=(previousState.offset+1)%7;
			return {offset: p};
		});
	}

	render(){
		this.calculate();
		
		var dy=this.renderDay();

		return(
			<div>
			<span onClick={this.addMonth.bind(this)}> {this.monthName[this.state.month]} </span>
			<span onClick={this.addYear.bind(this)}>{this.state.year}</span>
			<span onClick={this.addOffset.bind(this)}>Offset {this.state.offset}</span>
			<table className="mycal"><tbody>{this.renderHeading()}{this.weeks.map(this.renderWeek)}</tbody></table>
			
			</div>
			);
	}


};

export default AddTodo;

