module.exports = {
	sum:0,             //窓の値
	reserve:0,         //現在のトータル
	operand: 'append', //トータルとsumの演算子
	is_append: true, //

	reset: function(){
		this.sum = 0;
		this.is_append = false;
	},
	ac: function(){
		this.sum = 0;
		this.reserve = 0;
		this.operand = 'append';
		this.is_append = true;
		return this.sum;
	},

	append: function (input ){
		if ( Number(this.sum) != 0  || String(this.sum).indexOf('.') >= 0){
			this.sum = String(this.sum) + String(input);
		}else{
			this.sum = String(input);
		}
		return this.sum;
	},

	add: function (input){
		this.sum = Number(this.reserve) + Number(input);
		return this.sum;
	},

	minus:function (input){
		this.sum = Number(this.reserve) - Number(input);
		return this.sum;
	},

	times: function (input){
		this.sum = Number(this.reserve) * Number(input);
		return this.sum;
	},

	divided: function (input){
		this.sum = Number(this.reserve) / Number(input);
		return this.sum;
	},

	remainder: function(input){
		this.sum = Number(this.reserve) % Number(input);
		return this.sum;
	},
	reverse: function(){
		this.sum =  - this.sum;
		return this.sum;
	},
	equal:function(input){
		this.reserve = this.sum;
		return this.sum;
	},
	point:function(){
		if ( String(this.sum).indexOf('.') === -1) {
			this.sum = this.sum + '.';
		}
		return this.sum;
	},
}
