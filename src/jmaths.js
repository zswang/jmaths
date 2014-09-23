var jmaths = typeof exports === 'undefined' ? jmaths || {} : exports;

void function(exports) {

  /**
   * 计算点到点之间的距离
   * @param {Array[Number,Number]} a 坐标1
   * @param {Array[Number,Number]} b 坐标2
   * @return {Number} 返回点与点间的距离
   */
  function pointToPoint(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }

  exports.pointToPoint = pointToPoint;

  /**
   * 计算点的角度
   * @param {Array} origin 圆心坐标
   * @param {Array} point 点坐标
   * @return {Number} 返回角度，单位：弧度
   */
  function pointToAngle(origin, point) {
    return Math.atan2(point[1] - origin[1], point[0] - origin[0]);
  }

  exports.pointToAngle = pointToAngle;

  /**
   * 旋转一个点坐标
   * @param {Array} point 目标坐标
   * @param {Array} center 中心点
   * @param {Number} angle 选择角度，单位:弧度
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

  exports.rotatePoint = rotatePoint;

}(jmaths);
