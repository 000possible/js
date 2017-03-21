/**
 * Created by Qing on 2017/3/19.
 *
 *
 *
 *
 *
 *  HTML,
 *
 *  <div id="qmove-id" style="width:500px; height:30px; background:#fff; border:solid 1px #ddd;">
 *       <div style=" height:30px; width:0px; border:none; background:green;">
 *          <div style="height:30px;width:100px; background:red; color:#ddd;  cursor:pointer;"></div>
 *       </div>
 *  </div>
 *
 *  <script>
 *  var q = new QMove('qmove-id',{callback:function(e){});
 *  </script>
 *
 *
 */
var QMove = function(id, params, e) {
    this._cid = document.getElementById(id);
    this._pid = this._id = null;
    this._col = this._cid.offsetLeft;
    this._x =this._y = 0;
    this._max = this._cid.offsetWidth;
    this.sw = 10;
    this.rate = 0;
    var that = this;

    this.init = function(){
        that._cid.style.margin = "0px auto";
        that._cid.style.position = "relative";

        nodes = that._cid.childNodes;
        pid = null;
        for(var i=0; i < nodes.length; i++){
            if(nodes[i].nodeType == 1){
                pid = nodes[i];
            }
        }
        that._pid = pid;

        nodes = that._pid.childNodes;
        for(var i=0; i<nodes.length; i++){
            if(nodes[i].nodeType == 1){
                pid = nodes[i];
            }
        }
        that._id = pid;
        that.sw = that._id.offsetWidth;
        //
        that._id.style.position = "absolute";
        that._id.style.display= "inline-block";
        that._id.style.border = "none";

    },

    this.doMove = function(e){
        if(e.clientX != that._x) {
            that._id.style.top = '0px';
            var ml = e.clientX - that._col;
            var p = false;
            var s = that.sw / 2;
            s = s -1;

            if(ml <= that._max && ml > 0 && (ml-s) > 0 && (ml + s) <=that._max){
                p = true;
            }

            //console.log('container left '+that._col + 'px, '+ 'clientX:'+e.clientX + ' move '+ ml +'px');
            if(p){
                that.rate = (that._id.offsetLeft / (that._max - that.sw)).toFixed(2);
                that._id.style.left = ml - (that.sw / 2) + 'px';
                that._pid.style.width = (ml) + "px";
                if(typeof(params.callback) == 'function') {
                    params.callback(that.rate);
                }
            }
        }

    };

    this.doDown = function(e){
        that._x = e.clientX;
        that._y = e.clientY;

        that.on(that._id, 'mousemove', that.doMove);
        that.on(that._id, 'mouseup', that.doUp);
        that.on(that._id, 'mouseout', that.doUp);
    };

    this.doUp = function(){
        that.off(that._id, 'mousemove', that.doMove);
        that.off(that._id, 'mouseup', that.doUp);
        that.off(that._id, 'mouseout', that.doUp);
    };

    this.off = function(element, event, fn){
        if(! document.removeEventListener) {
            element.detachEvent('on'+event, fn);
        }else{
            element.removeEventListener(event, fn, false);
        }
    };

    this.on = function(element, event, fn){
        if(! document.addEventListener) {
            element.attachEvent('on'+event, fn);
        }else{
            element.addEventListener(event, fn, false);
        }
    };

    this.run = function(){
        that.init();
        that._cid.style.width = (that._max) + "px";
        that._id.style.left = 0 + "px";
        that.on(that._id, 'mousedown', that.doDown);
    };

    this.test = function(){
        b = that.sw / 2;
        alert(b);
    }

    this.run();
}