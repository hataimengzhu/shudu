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
var arr = [1,2,3,4,5,6,7,8,9];
var temp = [1,2,3,4,5,6,7,8,9];
var game={
    bwidth:126,
    bheight:126,
    cwidth:42,
    cheight:42,
    int:function(){//初始化游戏
        this.drawMap();
        this.drawOptions();
        // this.intNum();
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
                box.setAttribute('style','width:'+this.cwidth+'px;'+'height:'+this.cheight+'px;'+'left:'+j*this.cwidth+'px;top:'+i*this.cheight+'px;'+'text-align:center;line-height:'+this.cheight+'px;');
                //添加事件
                box.onclick=function(){
                    if(cellIndex!=null){//cellIndex用来存储上一次点击cell的ID
                        base.get(cellIndex).style.background='white';
                    }
                    base.get(this.id).style.background='#87CEEB';                         
                    cellIndex = this.id;
                    base.get(this.id).choose = true;
                }
                box.ondblclick=function(){
                    base.get(this.id).innerHTML = '';
                    base.get(this.id).choose = false;
                }

                base.appch('map',box,true);
                // base.get(box.id).innerHTML = box.id;
            }
        }
    },
    drawOptions:function(){},
    intNum:function(){
    },
    addNum:function(n){
        if(n>96&&n<106){
            base.get(cellIndex).innerHTML = n-96;
        }else if(n>48&&n<58){
            base.get(cellIndex).innerHTML = n-48;
        }
    },
    checkBox:function(){
        
    }
};

game.int();
window.onkeydown=function(ev){
    var ev = ev||window.event;
    var key = ev.keyCode;
    document.title = key;
    game.addNum(key);
}
function randNum(str,boole){
    var ss = Math.round(Math.random()*(str.length-1));
    var num = str[ss];
    if(boole){
       str.splice(ss,1);
    }

    return num;
}
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
function checkRow(){

} 
function checkColumn(){

}
function deletArr(k,){
        for(var s=0;s<k;s++){//删除重复行数字
            if(temp.indexOf(parseInt(base.get(k+''+s).innerHTML, 10))!=-1){
                temp.splice(temp.indexOf(parseInt(base.get(k+''+s).innerHTML, 10)),1);
            }
        }
        var temArr = [];
        for(var s=0;s<k;s++){//删除重复列数字，后在添加到temp中
            if(temp.indexOf(parseInt(base.get(s+''+k).innerHTML, 10))!=-1){
                temp.splice(temp.indexOf(parseInt(base.get(s+''+k).innerHTML, 10)),1);
                temArr.push(parseInt(base.get(s+''+k).innerHTML, 10));
            }
        }
        for(var i=k;i<9;i++){//行
            if(i==k+1&&temArr.length!=0){
                for(var y=0;y<temArr.length;y++){
                    temp.push(temArr[y]);    
                }
            }
            do{
                var ss = Math.round(Math.random()*(temp.length-1));
                var temNum = temp[ss];
                var bools =checkBox(temNum,k,i)
                if(!bools){
                   temp.splice(ss,1);
                   base.get(k+''+i).innerHTML = temNum;
                }
            }while(bools)
        } 
        temp = [1,2,3,4,5,6,7,8,9];
}
function layout(){
    for(var k=0;k<9;k++){
        for(var s=0;s<k;s++){//删除重复行数字
            if(temp.indexOf(parseInt(base.get(k+''+s).innerHTML, 10))!=-1){
                temp.splice(temp.indexOf(parseInt(base.get(k+''+s).innerHTML, 10)),1);
            }
        }
        var temArr = [];
        for(var s=0;s<k;s++){//删除重复列数字，后在添加到temp中
            if(temp.indexOf(parseInt(base.get(s+''+k).innerHTML, 10))!=-1){
                temp.splice(temp.indexOf(parseInt(base.get(s+''+k).innerHTML, 10)),1);
                temArr.push(parseInt(base.get(s+''+k).innerHTML, 10));
            }
        }
        for(var i=k;i<9;i++){//行
            if(i==k+1&&temArr.length!=0){
                for(var y=0;y<temArr.length;y++){
                    temp.push(temArr[y]);    
                }
            }
            do{
                var ss = Math.round(Math.random()*(temp.length-1));
                var temNum = temp[ss];
                var bools =checkBox(temNum,k,i)
                if(!bools){
                   temp.splice(ss,1);
                   base.get(k+''+i).innerHTML = temNum;
                }
            }while(bools)
        } 
        temp = [1,2,3,4,5,6,7,8,9];


        for(var s=0;s<k+1;s++){//删除重复列数字
            if(temp.indexOf(parseInt(base.get(s+''+k).innerHTML, 10))!=-1){
                temp.splice(temp.indexOf(parseInt(base.get(s+''+k).innerHTML, 10)),1);
            }
        }
        var temArr = [];
        for(var s=0;s<k;s++){//删除重复行数字，后在添加到temp中
            if(k<8&&temp.indexOf(parseInt(base.get((k+1)+''+s).innerHTML, 10))!=-1){
                temp.splice(temp.indexOf(parseInt(base.get((k+1)+''+s).innerHTML, 10)),1);
                temArr.push(parseInt(base.get((k+1)+''+s).innerHTML, 10));
            }
        }

        for(var j=k+1;j<9;j++){//列
            if(j==k+2&&temArr.length!=0){
                for(var y=0;y<temArr.length;y++){
                    temp.push(temArr[y]);    
                }
            }
            do{
                var ss = Math.round(Math.random()*(temp.length-1));
                var temNum = temp[ss];
                var bools =checkBox(temNum,j,k)
                if(!bools){
                   temp.splice(ss,1);
                    base.get(j+''+k).innerHTML = temNum;
                }
            }while(bools)            
        }
        temp = [1,2,3,4,5,6,7,8,9];
    }
}
layout();