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
        map.setAttribute('style','width:381px;height:381px;background-color:#eee;margin:5% auto;position:relative;border:1px solid black;');
        var bchild = document.body.firstChild;
        //添加节点
        bchild==null?docuument.body.appendChild(map):document.body.insertBefore(map,bchild);
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){//创建3*3盒子
                var box = base.cdiv(null,'box');
                box.id = 'box'+(i*3+j)+'';
                box.setAttribute('style','left:'+j*this.bwidth+'px;top:'+i*this.bheight+'px;');
                base.appch('map',box,true);
                // base.get(box.id).num = false;
                //在每一个盒子中创建3*3cell
                for(var x=0;x<3;x++){
                    for(var y=0;y<3;y++){
                        var cid = box.id+''+(x*3+y);
                        var cell = base.cdiv(cid,'cell');
                        // cell.index = ;
                        //添加样式
                        cell.setAttribute('style','left:'+y*this.cwidth+'px;top:'+x*this.cheight+'px;');
                        //添加事件
                        cell.onclick=function(){
                            if(cellIndex!=null){//cellIndex用来存储上一次点击cell的ID
                                base.get(cellIndex).style.background='white';
                            }
                            base.get(this.id).style.background='#87CEEB';                         
                            cellIndex = this.id;
                            base.get(this.id).choose = true;
                        }
                        cell.ondblclick=function(){
                            base.get(this.id).innerHTML = '';
                            base.get(this.id).choose = false;
                        }
                        base.appch(box.id,cell,true); //添加节点
                        // base.get(cell.id).innerHTML = cell.id;
                        base.get(cell.id).choose = false;
                    }
                }
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
function carr(i,str,boole){

}
function randNum(n,str,boole){
    var i = Math.round(Math.random()*n);
    var num = str[i];
    if(boole){
       str.splice(i,1);
    }

    return num;
}
function layout(){
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            base.get('box'+0+'('+n+++')').innerHTML = randNum(x--);
        }
    }

}
layout();


