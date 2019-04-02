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
        map.setAttribute('style','width:380px;height:380px;background-color:#eee;margin:5% auto;position:relative;border:'+4+'px solid black;');
        var bchild = document.body.firstChild;
        //添加节点
        bchild==null?docuument.body.appendChild(map):document.body.insertBefore(map,bchild);
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                var box = base.cdiv(null,'cell');
                box.id = i+''+(j);
                box.fixed = true;//初始时，每一个box均不可被(双击消除数字和键盘添加数字)
                var btWidth = 2;
                var blWidth = 2;
                switch(i){
                    case 3:
                    case 6:
                        btWidth = 4;
                    break;
                    default:
                        btWidth = 2;                   
                    break;
                }   
                switch(j){
                    case 3:
                    case 6:
                        blWidth = 4;
                    break;
                    default:
                        blWidth = 2;                   
                    break;
                }                              
                box.setAttribute('style','width:'+this.cwidth+'px;height:'+this.cheight+'px;left:'+j*this.cwidth+'px;top:'+i*this.cheight+'px;text-align:center;line-height:'+this.cheight+'px;border-top:'+btWidth+'px solid green;border-left:'+blWidth+'px solid green');
                //添加事件
                box.onclick=function(){
                   if(game.open){
                        game.time();
                        game.open=false;
                    }
                    if(cellIndex!=null){//cellIndex用来存储上一次点击cell的ID
                        base.get(cellIndex).style.background='white';
                    }
                    if(!(this.fixed)){
                        base.get(this.id).style.background='#87CEEB';  
                    }                       
                    cellIndex = this.id;
                    document.title = this.fixed;
                    // base.get(this.id).choose = true;
                }
                box.ondblclick=function(){
                    if(!(this.fixed)){
                        base.get(this.id).innerHTML = '';
                    }
                    // base.get(this.id).choose = false;
                }

                base.appch('map',box,true);
                base.get(box.id).innerHTML = box.id;
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
        layout();// 填充数字 
        numHole(5);
    },
    addNum:function(n){//添加数字
        if(cellIndex){
            var fixed = base.get(cellIndex).fixed;
            if(!fixed){
                if(n>96&&n<106){
                    base.get(cellIndex).innerHTML = n-96;
                }else if(n>48&&n<58){
                    base.get(cellIndex).innerHTML = n-48;
                }
                base.get(cellIndex).style.color = 'rgb(119, 119, 221)';
            }       
        }
        // testAll();
    },
    again:function(){//重新开始游戏
        game.intNum();   
        game.open = true;
        game.t = 0;
        base.get('timing').innerHTML = '计时:'+game.t;
        clearTimeout(this.timer);
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
    var a,b;
    switch(true){//判断cell在哪个3*3盒子中
        case x>=0&&x<=2&&y>=0&&y<=2:
            a = 0;b = 0;
        break;
        case x>=3&&x<=5&&y>=0&&y<=2:
            a = 3;b = 0;
        break;
        case x>=6&&x<=8&&y>=0&&y<=2:
            a = 6;b = 0;
        break;
        case x>=0&&x<=2&&y>=3&&y<=5:
            a = 0;b = 3;
        break;
        case x>=3&&x<=5&&y>=3&&y<=5:
            a = 3;b = 3;
        break;
        case x>=6&&x<=8&&y>=3&&y<=5:
            a = 6;b = 3;
        break;
        case x>=0&&x<=2&&y>=6&&y<=8:
            a = 0;b = 6;
        break;
        case x>=3&&x<=5&&y>=6&&y<=8:
            a = 3;b = 6;
        break;
        case x>=6&&x<=8&&y>=6&&y<=8:
            a = 6;b = 6;
        break;
    }
    for(var i=a;i<a+3;i++){
        for(var j=b;j<b+3;j++){
            if(i!=x||j!=y){//不与自己比较
                var dd=base.get(i+''+j).innerHTML;
                if(dd!=''&&dd==st||temp.length<1){//temp.length=0时，即该项的左行上列的数字包含1~9时，temp.length=0,直接返回true,重新生成
                    return true;
                }
            }        
        }    
    }
    return false;
}
//检测行、列
function checkRC(c,k,st,bool1,bool2){
    var ai,rc;
    var ai = bool1?9:k;//如果bool1为true，则全行检测,否则只检测行中待检测项的前项数字
    for(var i=0;i<ai;i++){
        var rc = bool2?c+''+i:i+''+c;//检测行//检测列
        if(i!=k){
            var dd=base.get(rc).innerHTML;
            if(dd==st||temp.length<1){
                return true;
            }                            
        }                        
    }
    return false;
}
function generateRC(k,bool){//生成行、列
    //行 
    temp = [1,2,3,4,5,6,7,8,9];//每次重新生成行+列时之前，初始化temp.  
    var as = bool?k:k+1; 
    for(var s=0;s<as;s++){//删除重复行数字/重复列数字
        var rc = bool?k+''+s:s+''+k;
        var e = base.get(rc).innerHTML;
        if(temp.indexOf(parseInt(e, 10))!=-1){
            temp.splice(temp.indexOf(parseInt(e, 10)),1);
        }
    }
    var temArr = [];
    for(var s=0;s<k;s++){//删除重复列数字/重复行数字，后在添加到temp中
        if(bool&&k!=8){
            var rc = bool?s+''+k:(k+1)+''+s;//确认是删除行还是列
            var e = base.get(rc).innerHTML;
            if(temp.indexOf(parseInt(e, 10))!=-1){//判断已存在的数字 是否在temp中也有，有则删除
                temp.splice(temp.indexOf(parseInt(e,10)),1);
                temArr.push(parseInt(e, 10));
            }
        }
    }
    for(var i=as;i<9;i++){
        if(i==as+1&&temArr.length!=0){//添加到temp中,当i=k+1时
            for(var y=0;y<temArr.length;y++){
                temp.push(temArr[y]);    
            }
        }
        var rc = bool?k+''+i:i+''+k;
        var a = bool?k:i;
        var b = bool?i:k;
        do{//生成行/列，并检测3*3盒子和列
            var ss = Math.round(Math.random()*(temp.length-1));
            var temNum = temp[ss];
            var bools1 = checkBox(temNum,a,b);//检测3*3盒子
            var bools2 = (i>k&&k>=3)?checkRC(i,k,temNum,false,!bool):false;;
            // if(i>k&&k>=3){//note:1：i=k时的值已不重复，不需要检测.2：i!=8,即不能自己检测是否和自己相等.
            //     var bools2 = checkRC(i,k,temNum,false,!bool);//检查列
            // }else{var bools2 = false;}
            if(!bools1&&!bools2&&temp.length>0){//生成行时，只有检测3*3的盒子和该项所在的列不重复时，才生成 .
               temp.splice(ss,1);
               base.get(rc).innerHTML = temNum;
               count = 0;//计数器归零，计数器记录循环次数
            }
            count++;
            if(count>10){//循环次数超过10次时，本轮生成的已有的行都归零，在重新生成.或temp为空（即temp内的数字均与现有的行列或3*3盒子内的数字重复时，temp内的数字均被排除）
                count = 0;
                for(var j=as;j<9;j++){//行重置为空
                    var rc = bool?k+''+j:j+''+k;
                    base.get(rc).innerHTML = '';
                }
                temp = [1,2,3,4,5,6,7,8,9];                
                return true;
            }
        }while(bools1||bools2);//只有3*3盒子和列 不重复时，才结束本次循环（生成行的循环）
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
            base.get(i+''+j).fixed = true;
            base.get(i+''+j).style.background='white';
            base.get(i+''+j).style.color = 'black';
        }
    }
    while(k<9){//生成行、列
        do{//生成行
            var bool1 = generateRC(k,true);   
            roNum++;
            if(roNum>5&&bool1){//超过循环次数
                roNum = 0;              //重置为空，重新开始循环生成行
                switch(k){
                    case 1:
                    case 2:
                    case 3:                  
                    case 4:
                        k = k-1;
                    break;
                    case 5:   
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
            }
        }while(bool1);
        do{//生成列
            var bool2 = generateRC(k,false);  
            coNum++;
            if(coNum>5&&bool2){
                coNum = 0;
                switch(k){
                    case 3:                  
                    case 4:
                        k = k-1;
                    break;
                    case 5: 
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
function layout2(){
    temp = [1,2,3,4,5,6,7,8,9];    
    for(var i=0;i<9;i++){//初始化每一个cell上的数字为空
        for(var j=0;j<9;j++){
            base.get(i+''+j).innerHTML = '';
            base.get(i+''+j).fixed = true;
            base.get(i+''+j).style.background='white';
            base.get(i+''+j).style.color = 'black';
        }
    }
    for(var i=0;i<9;i++){
        var bool = true;
        do{ loop:
            for(var j=0;j<9;j++){
                var ss = Math.round(Math.random()*(temp.length-1));
                var temNum = temp[ss];
                var bools1 = checkBox(temNum,a,b);//检测3*3盒子
                var bools2 = (i>2)?checkRC(i,k,temNum,false,false):false;;
                if(!bools1&&!bools2&&temp.length>0){//生成行时，只有检测3*3的盒子和该项所在的列不重复时，才生成 .
                   temp.splice(ss,1);
                   base.get(i+''+j).innerHTML = temNum;
                   count = 0;//计数器归零，计数器记录循环次数
                }
                if(count>10){//循环次数超过10次时，本轮生成的已有的行都归零，在重新生成.或temp为空（即temp内的数字均与现有的行列或3*3盒子内的数字重复时，temp内的数字均被排除）
                    count = 0;
                    for(var s=0;s<9;s++){//行重置为空
                        base.get(i+''+s).innerHTML = '';
                    }
                    temp = [1,2,3,4,5,6,7,8,9];                
                    bool =  true;
                    break loop;
                } 
            }
            count++;

        }while(bool);           

    }    
}
function numHole(n){
    var a,b;
    for(var k=0;k<9;k++){
        switch(k){
            case 0:
                a = 0;b = 0;
            break;
            case 1:
                a = 3;b = 0;
            break;
            case 2:
                a = 6;b = 0;
            break;
            case 3:
                a = 0;b = 3;
            break;
            case 4:
                a = 3;b = 3;
            break;
            case 5:
                a = 6;b = 3;
            break;
            case 6:
                a = 0;b = 6;
            break;
            case 7:
                a = 3;b = 6;
            break;
            case 8:
                a = 6;b = 6;
            break;
        }
        var tempIndex = [];
        var x = 0;
        for(var i=a;i<a+3;i++){
            for(var j=b;j<b+3;j++){
                 tempIndex[x++] = i+''+j;        
            }    
        }
        x = 0;
        for(var y=0;y<n;y++){
            var ss = Math.round(Math.random()*(tempIndex.length-1));
            var temNum = tempIndex[ss];
            tempIndex.splice(ss,1);
            base.get(temNum).innerHTML = '';
            base.get(temNum).fixed = false;
        }
    }
}
function testAll(){
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            //检测3*3盒子
            var testNum = base.get(i+''+j).innerHTML;
            var testBox = checkBox(testNum,i,j);

            var testRow = checkRC(i,j,testNum,true,true);
            var testCol = checkRC(j,i,testNum,true,false);
            if(testBox||testRow||testCol){
                document.title = i+''+j+''+'error'+testBox+''+testRow+''+testCol;
                if(!(base.get(i+''+j).fixed)){
                    base.get(i+''+j).style.background = 'red';
                }
            }else{
                document.title = 'right';
            }
            
        }
    }
}
