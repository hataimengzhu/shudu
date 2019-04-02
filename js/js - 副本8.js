var base={
    get:function(id){
        return document.getElementById(id);
    },
    create:function(name){
        return document.createElement(name);
    },
    cdiv:function(id,classname){
        var div = this.create("div");
        if(id!=null){
            div.id = id;
        }
        if(classname!=null){
            div.className = classname;
        }         
        return div;
    },
    appch:function(id,name,boole){
        if(boole||this.get(id).firstChild==null){
            this.get(id).appendChild(name);
        }else{
            this.get(id).insertBefore(name,this.get(id).firstChild);
        }
    },
    removeAll:function(){

    }
};
var cellIndex = null;
var count = 0;
var arr = [1,2,3,4,5,6,7,8,9];
var temp = [1,2,3,4,5,6,7,8,9];
var game={
    bwidth:126,
    bheight:126,
    cwidth:42,
    cheight:42,
    time:null,
    t:0,
    open:true,
    int:function(){//初始化游戏
        this.drawMap();
        this.drawOptions();
        this.intNum();
    },
    drawMap:function(){//绘制表格
        var map = base.cdiv('map',null);
        map.setAttribute('style','width:380px;height:380px;background-color:#eee;margin:5% auto;position:relative;border:1px solid black;');
        var bchild = document.body.firstChild;
        //添加节点
        bchild==null?docuument.body.appendChild(map):document.body.insertBefore(map,bchild);
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                var box = base.cdiv(null,'box');
                box.id = i+''+(j);
                box.fixed = false;//初始时，每一个box均可被鼠标点击消除
                box.setAttribute('style','width:'+this.cwidth+'px;'+'height:'+this.cheight+'px;'+'left:'+j*this.cwidth+'px;top:'+i*this.cheight+'px;'+'text-align:center;line-height:'+this.cheight+'px;border:'+2+'px sold ;');
                //添加事件
                box.onclick=function(){
                   if(game.open){
                        game.time();
                        game.open=false;
                    }
                    if(cellIndex!=null){//cellIndex用来存储上一次点击cell的ID
                        base.get(cellIndex).style.background='white';
                    }
                    base.get(this.id).style.background='#87CEEB';                         
                    cellIndex = this.id;
                    // base.get(this.id).choose = true;
                }
                box.ondblclick=function(){
                    if(!this.fiexd){
                        base.get(this.id).innerHTML = '';
                    }
                    // base.get(this.id).choose = false;
                }

                base.appch('map',box,true);
                // base.get(box.id).innerHTML = box.id;
            }
        }
    },
    drawOptions:function(){
        var opt = base.cdiv('option',null);
        document.body.appendChild(opt);

        var aga = base.cdiv('again',null);
        aga.innerHTML = '重新开始';
        aga.onclick=function(){
            game.again();
        }

        base.appch('option',aga,true);

        var tim = base.cdiv('timing',null);
        tim.innerHTML = '计时:00';
        base.appch('option',tim,true);             
    },
    time:function(){//计时
        base.get('timing').innerHTML = '计时:'+this.t;
        this.t++;
        this.timer = setTimeout('game.time()',1000);            
    },
    intNum:function(){
        layout();
        //挖空
    },
    addNum:function(n){//添加数字
        if(n>96&&n<106){
            base.get(cellIndex).innerHTML = n-96;
        }else if(n>48&&n<58){
            base.get(cellIndex).innerHTML = n-48;
        }
    },
    zcNum:function(){

    },
    again:function(){//重新开始游戏
        layout();
        game.open = true;
        game.t = 0;
        base.get('timing').innerHTML = '计时:'+game.t;
        clearTimeout(this.timer);
        // testAll();
    }
};

game.int();//游戏初始化
window.onkeydown=function(ev){
    var ev = ev||window.event;
    var key = ev.keyCode;
    game.addNum(key);
}
//检测3*3盒子
function checkBox(st,x,y){
    if(x>=0&&x<=2&&y>=0&&y<=2){
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }
    if(x>=3&&x<=5&&y>=0&&y<=2){
        for(var i=3;i<6;i++){
            for(var j=0;j<3;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }
    if(x>=6&&x<=8&&y>=0&&y<=2){
        for(var i=6;i<9;i++){
            for(var j=0;j<3;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }

    if(x>=0&&x<=2&&y>=3&&y<=5){
        for(var i=0;i<3;i++){
            for(var j=3;j<6;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }
    if(x>=3&&x<=5&&y>=3&&y<=5){
        for(var i=3;i<6;i++){
            for(var j=3;j<6;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }
    if(x>=6&&x<=8&&y>=3&&y<=5){
        for(var i=6;i<9;i++){
            for(var j=3;j<6;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }


    if(x>=0&&x<=2&&y>=6&&y<=8){
        for(var i=0;i<3;i++){
            for(var j=6;j<9;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }
    if(x>=3&&x<=5&&y>=6&&y<=8){
        for(var i=3;i<6;i++){
            for(var j=6;j<9;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }
    if(x>=6&&x<=8&&y>=6&&y<=8){
        for(var i=6;i<9;i++){
            for(var j=6;j<9;j++){
                if(i!=x||j!=y){
                    var dd=base.get(i+''+j).innerHTML;
                }        
                if(dd!=''&&dd==st){
                    return true;
                }
            }    
        }
    }                              

    return false;
}
//检测行
function checkRow(c,k,st,bool){
    if(bool){//如果bool为true，则全行检测
        for(var i=0;i<9;i++){
            if(i!=k){
                var dd=base.get(c+''+i).innerHTML;
                if(dd==st||temp.length<1){
                    return true;
                }                            
            }                        
        }
    }else{//否则只检测待检测项的前项数字
        for(var i=0;i<k;i++){
            var dd=base.get(c+''+i).innerHTML;
            if(dd==st||temp.length<1){
                return true;
            }
        }
    }
    return false;
}
//检测列 
function checkColumn(c,k,st,bool){
    if(bool){//如果bool为true，则全列检测
        for(var i=0;i<9;i++){
            if(i!=k){
                var dd=base.get(i+''+c).innerHTML;
                if(dd==st||temp.length<1){
                    return true;
                }                            
            }                        
        }
    }else{//否则只检测待检测项的前项数字
        for(var i=0;i<k;i++){
            var dd=base.get(i+''+c).innerHTML;
            if(dd==st||temp.length<1){
                return true;
            }
        }
    }
    return false;
}
function deletRowArr(k){
    //行  
    for(var s=0;s<k;s++){//删除重复行数字
        var leftRow = temp.indexOf(parseInt(base.get(k+''+s).innerHTML, 10));
        if(leftRow!=-1){
            temp.splice(leftRow,1);
        }
    }
    var temArr = [];
    for(var s=0;s<k;s++){//删除重复列数字，后在添加到temp中
        var topColu = temp.indexOf(parseInt(base.get(s+''+k).innerHTML, 10));
        if(topColu!=-1){
            temp.splice(topColu,1);
            temArr.push(parseInt(base.get(s+''+k).innerHTML, 10));
        }
    }
    for(var i=k;i<9;i++){
        if(i==k+1&&temArr.length!=0){//添加到temp中,当i=k+1时
            for(var y=0;y<temArr.length;y++){
                temp.push(temArr[y]);    
            }

        }
        do{//生成行，并检测3*3盒子和列
            var ss = Math.round(Math.random()*(temp.length-1));
            var temNum = temp[ss];
            var bools1 = checkBox(temNum,k,i);//检测3*3盒子
            if(i>k&&k>=3){//note:1：i=k时的值已不重复，不需要检测.2：i!=8,即不能自己检测是否和自己相等.
                var bools2 = checkColumn(i,k,temNum,false);//检查列
            }else{var bools2 = false;}
            if(!bools1&&!bools2&&temp.length>0){//生成行时，只有检测3*3的盒子和该项所在的列不重复时，才生成 .
               temp.splice(ss,1);
               base.get(k+''+i).innerHTML = temNum;
               count = 0;//计数器归零，计数器记录循环次数
            }
            count++;
            if(count>10){//循环次数超过10次时，本轮生成的已有的行都归零，在重新生成.或temp为空（即temp内的数字均与现有的行列或3*3盒子内的数字重复时，temp内的数字均被排除）
                count = 0;
                for(var i=k;i<9;i++){//行重置为空
                    base.get(k+''+i).innerHTML = '';
                }
                temp = [1,2,3,4,5,6,7,8,9];                
                return true;
            }
        }while(bools1||bools2);//只有3*3盒子和列 不重复时，才结束本次循环（生成行的循环）
    } 
    temp = [1,2,3,4,5,6,7,8,9];  
    return false;
}
function deletColArr(k){
    temp = [1,2,3,4,5,6,7,8,9];        
    //列
    for(var s=0;s<k+1;s++){//删除重复列数字
        var topColu = temp.indexOf(parseInt(base.get(s+''+k).innerHTML, 10));
        if(topColu!=-1){
            temp.splice(topColu,1);
        }
    }
    var temArr = [];
    for(var s=0;s<k;s++){//删除重复行数字，后在添加到temp中
        if(k<8&&temp.indexOf(parseInt(base.get((k+1)+''+s).innerHTML, 10))!=-1){
            temp.splice(temp.indexOf(parseInt(base.get((k+1)+''+s).innerHTML, 10)),1);
            temArr.push(parseInt(base.get((k+1)+''+s).innerHTML, 10));
        }
    }
    for(var i=k+1;i<9;i++){//列
        if(i==k+2&&temArr.length!=0){
            for(var y=0;y<temArr.length;y++){
                temp.push(temArr[y]);    
            }
        }
        do{
            var ss = Math.round(Math.random()*(temp.length-1));
            var temNum = temp[ss];
            var bools1 =checkBox(temNum,i,k);//检测3*3的盒子

            if(i>k+1&&k>=3){//检查行
                var bools2 = checkRow(i,k,temNum,false);
            }else{var bools2 = false;}
            if(!bools1&&!bools2&&temp.length>0){//生成列时，只有检测3*3的盒子和该项所在的行不重复时，才生成
               temp.splice(ss,1);
                base.get(i+''+k).innerHTML = temNum;
                count = 0;
            }
            count++;
            if(count>10){
                count = 0;
                for(var i=k+1;i<9;i++){//列重置为空
                    base.get(i+''+k).innerHTML = '';
                }         
                temp = [1,2,3,4,5,6,7,8,9];       
                return true;
            }
        }while(bools1||bools2);            
    }  
    return false;
}
function layout(){
    var start = new Date().getTime();//起始时间
    var k=0;//k=0~8
    var roNum = 0;//循环次数计数
    var coNum = 0;
    var hang = true;//用来控制只有生成行的数字不重复时，才可以开始生成列
    for(var i=0;i<9;i++){//初始化每一个cell上的数字为空
        for(var j=0;j<9;j++){
            base.get(i+''+j).innerHTML = '';
        }
    }
    while(k<9){//生成行、列
        do{//生成行
            var bool1 = deletRowArr(k);   
            roNum++;
            if(roNum>10&&bool1){//超过循环次数
                roNum = 0;              //重置为空，重新开始循环生成行
                switch(k){
                    case 1:
                        k = 0;
                    break;
                    case 2:
                        k = 1;
                    break;
                    case 3:
                        k = 2;
                    break;                    
                    case 4:
                        k = 3;
                    break;
                    case 5:
                        k = 2;
                    break;    
                    case 6:
                    case 7:
                    case 8:
                        k = k-3; 
                    break;                                                        
                }
                for(var i=k;i<9;i++){//(9-k)*(9-k)的盒子重置为空
                    for(var j=k;j<9;j++){
                        base.get(i+''+j).innerHTML = '';
                    }
                }
                hang = false;//生成的行重复，需要重新生成行，所以不能开始下面的生成列的程序         
            }else{
                hang = true;
            }
            
        }while(bool1);
        do{//生成列
            var bool2 = deletColArr(k);  
            coNum++;
            if(coNum>10&&bool2){
                coNum = 0;
                switch(k){
                    case 1:
                        k = 0;
                    break;
                    case 2:
                        k = 1;
                    break;
                    case 3:
                        k = 2;
                    break;                    
                    case 4:
                        k = 3;
                    break;
                    case 5:
                        k = 2;
                    break;    
                    case 6:
                    case 7:
                    case 8:
                        k = k-3; 
                    break;                                                        
                }
                for(var i=k;i<9;i++){
                    for(var j=k;j<9;j++){
                        base.get(i+''+j).innerHTML = '';
                    }
                } 
                k = k-1;
                bool2 = false; 
            }
        }while(bool2);
        roNum = 0;
        coNum = 0;
        k++;

    }
    var end = new Date().getTime();//结束时间
    var totalTime = '数独生成时间：'+(end - start)+'ms';
    console.log(totalTime);//打印函数执行需要时间
}
