//时间格式化

export class TimeUtil{
  constructor(dat){
    if('' == dat || !dat) return '';
    this.$date = this.convert(dat);
    this.year = this.$date.getFullYear();
    this.month = this.$date.getMonth() + 1;
    this.day = this.$date.getDate();
    this.hour = this.$date.getHours();
    this.minute = this.$date.getMinutes();
    this.second = this.$date.getSeconds();
  }
  //将参数转成date对象
  convert(par){
    let type = typeof par;
    switch (type){
      case 'object':return par;break;
      case 'number':return new Date(par);break;
      case 'string': let tmp = par.replace(/\-/g, "/");return  new Date(tmp);break;
    }
  }
  //将小于9的字符串前缀补零
  formatNumber(n){
    n = n.toString();
    return n[1] ? n : '0' + n;
  }
  //将时间对象转换 YYYY/MM/DD hh:mm:ss
  timeYMDHMS(){
    return [this.year,this.month,this.day].map(this.formatNumber).join('/') + ' ' + [this.hour, this.minute, this.second].map(this.formatNumber).join(':');
  }
  //将时间对象转换YYYY-MM-DD hh:mm:ss
  timeYMDHMS1(){
    return [this.year,this.month,this.day].map(this.formatNumber).join('-') + ' ' + [this.hour, this.minute, this.second].map(this.formatNumber).join(':');
  }
  //将时间对象转换MM-DD hh:mm
  timeMDhs(){
    return [this.month, this.day].map(this.formatNumber).join('-') + ' ' + [this.hour, this.minute].map(this.formatNumber).join(':');
  }
  //将时间对象转换YYYY.MM.DD
  timeYMD(){
    return [this.year, this.month, this.day].map(this.formatNumber).join('.');
  }
  //将时间对象转换YYYY-MM-DD
  timeYMD1(){
    return [this.year, this.month, this.day].map(this.formatNumber).join('-');
  }
  //将时间对象转换YYYY/MM/DD
  timeYMD2(){
    return [this.year, this.month, this.day].map(this.formatNumber).join('/');
  }
  //将时间对象转换 4月1日 ,昨天,今天,明天
  timeMD(){
    let today = new Date();
    if(today.getFullYear() == this.year && (today.getMonth() + 1) == this.month && today.getDate() == (this.day + 1)){
      return '昨天';
    }else if(today.getFullYear() == this.year && (today.getMonth() + 1) == this.month && today.getDate() == this.day){
      return '今天';
    }else if(today.getFullYear() == this.year && (today.getMonth() + 1) == this.month && today.getDate() == (this.day - 1)){
      return '明天';
    }
    return this.month + '月' + this.day + '日';
  }
  //将时间对象转换 hh:mm:ss
  timeHMS(){
    return [this.hour, this.minute, this.second].map(this.formatNumber).join(':');
  }
  
  daysAgo(){
	const tian = 24 * 60 * 60 * 1000;
	
	let time = new Date(Date.parse(this.$date) + (8 * 60 * 60 * 1000))
    let date = Math.floor((new Date() - time) / tian);	   
	let hour = Math.floor((new Date() - time) / (60 * 60 * 1000));
	let min = Math.floor((new Date() - time) / (60 * 1000));
	let second = Math.floor((new Date() - time) / (1000))
	
	if( 0 < date && date <= 30 ){
	   return `${date} days ago`;
    }else if( 0 < hour && hour <=59 ){
		return `${hour} hours ago`;
	}else if( 0 < min && min <=59 ){
		return `${min} minutes ago`;
	}else if( 0 < second && second <=59 ){
		return `${second} seconds ago`;
	}
	   
    return this.timeYMD1();	   
   }
  
}







