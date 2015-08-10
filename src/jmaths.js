(function (exportName) {

  /*<remove>*/
  'use strict';
  /*</remove>*/

  var exports = exports || {};

  /*<jdists encoding="ejs" data="../package.json">*/
  /**
   * @file <%- name %>
   *
   * <%- description %>
   * @author
       <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
   *   <%- item.name %> (<%- item.url %>)
       <% }); %>
   * @version <%- version %>
       <% var now = new Date() %>
   * @date <%- [
        now.getFullYear(),
        now.getMonth() + 101,
        now.getDate() + 100
      ].join('-').replace(/-1/g, '-') %>
   */
  /*</jdists>*/

  /*<function name="pointToPoint">*/
  /**
   * 计算点到点之间的距离
   *
   * @param {Array[number,number]} a 坐标1
   * @param {Array[number,number]} b 坐标2
   * @return {number} 返回点与点间的距离
   */
  function pointToPoint(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }
  /*</function>*/

  exports.pointToPoint = pointToPoint;

  /*<function name="pointToAngle">*/
  /**
   * 计算点的角度
   *
   * @param {Array} origin 圆心坐标
   * @param {Array} point 点坐标
   * @return {number} 返回角度，单位：弧度
   */
  function pointToAngle(origin, point) {
    return Math.atan2(point[1] - origin[1], point[0] - origin[0]);
  }
  /*</function>*/
  exports.pointToAngle = pointToAngle;

  /*<function name="rotatePoint" dependencies="pointToPoint,pointToAngle">*/
  /**
   * 旋转一个点坐标
   *
   * @param {Array} point 目标坐标
   * @param {Array} center 中心点
   * @param {number} angle 选择角度，单位:弧度
   * @return {Array} 返回旋转后的坐标
   */
  function rotatePoint(point, center, angle) {
    var radius = pointToPoint(center, point); // 半径
    angle = pointToAngle(center, point) + angle; // 角度
    return [
      center[0] + Math.cos(angle) * radius,
      center[1] + Math.sin(angle) * radius
    ];
  }
  /*</function>*/
  exports.rotatePoint = rotatePoint;

  /*<function name="bezier">*/
  /**
   * 贝赛尔公式，支持多维数组
   *
   * @param{Array[Array[number, ...],...]} items 每个参考点
   * @param{number} rate 比率
   * @return{number|Array[number, ...]} 返回
   */
  function bezier(items, rate) {
    if (!items || !items.length) {
      return;
    }
    var first = items[0];
    var second = items[1];
    var level = first instanceof Array ? first.length : 0; // 下标数,0为非数组
    var i;
    switch (items.length) {
    case 1:
      return level ? first.slice() : first; // 数组需要克隆，非数组直接返回
    case 2:
      if (level) { // 非数组
        var result = [];
        for (i = 0; i < level; i++) {
          result[i] = bezier([first[i], second[i]], rate);
        }
        return result;
      }
      return first + (second - first) * rate;
    default:
      var temp = [];
      for (i = 1; i < items.length; i++) {
        temp.push(bezier([items[i - 1], items[i]], rate));
      }
      return bezier(temp, rate);
    }
  }
  /*</function>*/
  exports.bezier = bezier;

  /*<function name="cutBezier" dependencies="bezier">*/
  /**
   * 将一条贝赛尔数组剪成两段
   *
   * @param {Array[Array[number, number],...]} items 贝赛尔每个参考点
   * @param {number} rate 比率
   * @return {Array[Array,Array]} 返回被裁剪后的两个贝赛尔数组
   */
  function cutBezier(items, rate) {
    if (!items || items.length < 2) {
      return;
    }
    var ta = [];
    var tb = [];
    var ra = [];
    var rb = [];
    for (var i = 0; i < items.length; i++) {
      ta.push(items[i]);
      ra.push(bezier(ta, rate));

      tb.unshift(items[items.length - i - 1]);
      rb.unshift(bezier(tb, rate));
    }
    return [ra, rb];
  }
  /*</function>*/
  exports.cutBezier = cutBezier;

  /*<function name="cutBezier" dependencies="pointToPoint,bezier">*/
  /**
   * 计算点到线段的距离
   *
   * @param {Array[number,number]} point 点坐标
   * @param {Array[number,number]} a 线段坐标1
   * @param {Array[number,number]} b 线段坐标2
   * @return {number} 返回点到线段的距离
   */
  function pointToLine(point, a, b) {
    if (a[0] == b[0] && a[1] == b[1]) {
      return pointToPoint(point, a);
    }
    var t = ((a[0] - b[0]) * (a[0] - point[0]) + (a[1] - b[1]) * (a[1] - point[1])) /
      ((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
    return pointToPoint(point, bezier([a, b], Math.max(0, Math.min(1, t))));
  }
  /*</function>*/
  exports.pointToLine = pointToLine;

  /*<function name="sign">*/
  /**
   * 获取正负符号
   *
   * @param {number} x 数值
   * @return 返回x的符号
   */
  function sign(x) {
    return x === 0 ? 0 : (x < 0 ? -1 : 1);
  }
  /*</function>*/
  exports.sign = sign;

  /*<function name="doubleLineIntersect">*/
  /**
   * 获取两条线段的交点
   *
   * @see http://www.kevlindev.com/gui/math/intersection/Intersection.js
   * @param {Array[number,number]} a 第一条线段坐标1
   * @param {Array[number,number]} b 第一条线段坐标2
   * @param {Array[number,number]} c 第二条线段坐标1
   * @param {Array[number,number]} d 第二条线段坐标2
   * @return {Array[number,number]} 返回两条线段的交点坐标
   */
  function doubleLineIntersect(a, b, c, d) {
    var ua_t = (d[0] - c[0]) * (a[1] - c[1]) - (d[1] - c[1]) * (a[0] - c[0]);
    var ub_t = (b[0] - a[0]) * (a[1] - c[1]) - (b[1] - a[1]) * (a[0] - c[0]);
    var u_b = (d[1] - c[1]) * (b[0] - a[0]) - (d[0] - c[0]) * (b[1] - a[1]);

    if (u_b !== 0) {
      var ua = ua_t / u_b;
      var ub = ub_t / u_b;

      if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        return [
          a[0] + ua * (b[0] - a[0]),
          a[1] + ua * (b[1] - a[1])
        ];
      }
    }
  }
  /*</function>*/
  exports.doubleLineIntersect = doubleLineIntersect;

  /*<function name="pointToPolyline" dependencies="pointToPoint,pointToLine">*/
  /**
   * 计算点到多边形的距离
   *
   * @param {Array[number,number]} point
   * @param {Array[Array[number,number]]} polyline
   * @return {number} 返回距离
   */
  function pointToPolyline(point, polyline) {
    if (!point || !polyline || !polyline.length) {
      return;
    }
    var result = pointToPoint(point, polyline[0]);
    for (var i = 1, l = polyline.length; i < l; i++) {
      result = Math.min(result, pointToLine(point, polyline[i - 1], polyline[i]));
    }
    return result;
  }
  /*</function>*/
  exports.pointToPolyline = pointToPolyline;

  /*<function name="pointInPolygon">*/
  /**
   * 判断点是否在多边形中
   *
   * @param {Array} p 点坐标
   * @param {Array} polygon 多边形坐标
   * @return {boolean} 返回点是否在多边形中
   */
  function pointInPolygon(p, polygon) {
    var cross = 0;
    for (var i = 0; i < polygon.length; i++) {
      var p1 = polygon[i];
      var p2 = polygon[(i + 1) % polygon.length];
      if (p1[1] === p2[1]) {
        continue;
      }
      if (p[1] < Math.min(p1[1], p2[1])) {
        continue;
      }
      if (p[1] >= Math.max(p1[1], p2[1])) {
        continue;
      }
      var x = (p[1] - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0];
      if (x > p[0]) {
        cross++;
      }
    }
    return cross % 2 === 1;
  }
  /*</function>*/
  exports.pointInPolygon = pointInPolygon;

  /*<function name="regularPolygon">*/
  /**
   * 生成正多边形顶点
   *
   * @param {number} edges 边数
   * @param {number} x 中心坐标 x
   * @param {number} y 中心坐标 y
   * @param {number} radius 半径
   * @param {=number} starting 默认为 0
   * @return {Array} 返回正多边形顶点数组
   */
  function regularPolygon(edges, x, y, radius, starting) {
    var angle = starting || 0;
    var result = [];
    for (var i = 0; i < edges; i++) {
      var a = angle + i / edges * Math.PI * 2;
      var p = [x + Math.cos(a) * radius, y + Math.sin(a) * radius];
      result.push(p);
    }
    return result;
  }
  /*</function>*/
  exports.regularPolygon = regularPolygon;

  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function () {
        return exports;
      });
    }
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  }
  else {
    window[exportName] = exports;
  }

})('jmaths');