function Obj() {
  this.divpart = null;
  this.iTimer = null;
  this.oldtime = null;
  this.newtime = null;
  this.timeinterval = null;
  this.move_len = null;
  this.move_direct = 0;
  //此处为1/4时间
  this.moveElastic = function(l_pis, mid_pis, r_pis, time) {
    var me = this;
    var move_div = this.divpart;
    var fix_Hz = 1000 / 60;
    var move_len_max = (mid_pis - l_pis) * 2 / (fix_Hz * time);
    var move_len_t = move_len_max / (fix_Hz * time);
    me.move_len = 0;
    me.iTimer = setInterval(function() {
      //向右加速
      if (move_div.offsetLeft < mid_pis && me.move_direct == 0) {
        // console.log('right ++');
        move_div.style.left = move_div.offsetLeft + me.move_len + 'px';
        me.move_len = me.move_len + move_len_t;
      } else if (move_div.offsetLeft >= mid_pis && me.move_direct == 0) {
        // console.log('right --');
        //向右减速
        move_div.style.left = move_div.offsetLeft + me.move_len + 'px';
        me.move_len = me.move_len - move_len_t;
        if (move_div.offsetLeft >= r_pis) {
          me.move_direct = 1;
          me.move_len = 0;
        }
        //向左加速
      } else if (move_div.offsetLeft >= mid_pis && me.move_direct == 1) {
        // console.log('left++')
        move_div.style.left = move_div.offsetLeft - me.move_len + 'px';
        me.move_len = me.move_len + move_len_t;
        //向左减速
      } else if (move_div.offsetLeft < mid_pis && me.move_direct == 1) {
        // console.log('left--');
        move_div.style.left = move_div.offsetLeft - me.move_len + 'px';
        me.move_len = me.move_len - move_len_t;
        if (move_div.offsetLeft <= l_pis) {
          me.move_direct = 0;
          me.move_len = 0;
        }
      }
    }, 1000 / 60)
  }
  this.deceMove = function(start, end, time) {

    var me = this;
    var st = new Date().getTime();
    me.oldtime = st;
    // var iTimer = null;
    var flag = 1;
    if (start > end) {
      flag = -1;
    }
    me.move_len = (end - start) * 3 / (25 * time);
    var move_len_t = 3 * me.move_len / (50 * time);
    me.iTimer = setInterval(function() {

      if (me.divpart.offsetLeft >= end || me.move_len <= 0) {
        clearInterval(me.iTimer);
      } else {

        me.divpart.style.left = me.divpart.offsetLeft + me.move_len * flag + 'px';
        console.log(me.divpart.offsetLeft);
        me.move_len = me.move_len - move_len_t * flag;
      }
    }, 1000 / 60);
  }
  this.normalMove = function(startx, starty, endx, endy, time) {
    var me = this;
    var st = new Date().getTime();
    me.oldtime = st;
    me.iTimer = setInterval(function() {
      if (me.divpart.offsetLeft > endy) {
        clearInterval(me.iTimer);
      } else {
        var now = new Date().getTime();
        me.divpart.style.left = me.divpart.offsetLeft + Math.ceil((now - st) / (time * 1000) * (endx - startx)) + 'px';
      }
    }, 1000 / 60);
  }
  this.accMove = function(start, end, time) {
    var me = this;
    var st = new Date().getTime();
    me.oldtime = st;
    var flag = 1;
    if (end < start) {
      flag = -1;
    }
    var move_len = 0;
    var fix_Hz = 1000 / 60;
    var move_len_max = (end - start) * 2 / (fix_Hz * time);
    var move_len_t = move_len_max / (fix_Hz * time);
    me.iTimer = setInterval(function() {
      if (me.divpart.offsetLeft >= end) {
        clearInterval(me.iTimer);
      } else {
        move_len = move_len + move_len_t * flag;
        me.divpart.style.left = me.divpart.offsetLeft + flag * move_len + 'px';
      }
    }, fix_Hz);
  }
  this.pause = function() {
    var me = this;
    clearInterval(me.iTimer);
    me.newtime = new Date().getTime();
    me.timeinterval = (me.newtime - me.oldtime) / 1000;
  }
  this.moveElastic1 = function(l_pis, mid_pis, r_pis, time) {
    var me = this;
    var beginleft = me.divpart.style.left;
    var fix_Hz = 1000 / 60;
    var move_len_max = (mid_pis - l_pis) * 2 / (fix_Hz * time);
    var move_len_t = move_len_max / (fix_Hz * time);
    if (me.move_direct == 0) {
      if (beginleft <= mid_pis) {
        me.divpart.accMove(beginleft, mid_pis, time - me.timeinterval);
        me.divpart.deceMove(mid_pis, r_pis, time);
        me.divpart.accMove(r_pis, mid_pis, time);
        me.divpart.deceMove(mid_pis, l_pis, time);

      } else {
        me.divpart.deceMove(mid_pis, r_pis, time * 2 - me.timeinterval);
        me.divpart.accMove(r_pis, mid_pis, time);
        me.divpart.deceMove(mid_pis, l_pis, time);
      }
    } else {
      if (beginleft >= mid_pis) {
        me.divpart.accMove(r_pis, mid_pis, time * 3 - me.timeinterval);
        me.divpart.deceMove(mid_pis, l_pis, time);

      } else {
        me.divpart.deceMove(r_pis, mid_pis, time * 4 - me.timeinterval);
      }
    }
    moveElastic(l_pis, mid_pis, r_pis, time);
  }
}