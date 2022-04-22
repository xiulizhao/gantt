# gantt
通过条状图来显示项目进度及其他时间相关的系统进展<br>
普通属性<br>
data-navigate	设置导航类型	buttons/scroll<br>
data-scale	设置显示单元格	months/weeks/days/hours<br>
data-maxscale	设置视图缩放最大单元	months/weeks/days/hours<br>
data-minscale	设置视图缩放最小单元	months/weeks/days/hours<br>
data-itemsperpage	设置每页项目数	10<br>
data-scrolltotoday	设置是否滚动到当天	false/true<br>
控制属性<br>
data--source	后端返回项目数据源:json数组	[{"name":"标题1","desc":"标题1描述部分","values":[{"from":1323802400000,"to":1325685200000,"desc":"鼠标悬停时的描述文字","label":"甘特图项目的标题文字","customClass":"ganttGreen"},{"from":1330011200000,"to":1336611200000,"desc":"描述文字乱七八糟的文字","label":"显示烂七八糟的信息文件","customClass":"ganttOrange"}]},{"name":"哈哈哈","desc":"Showcasing","values":[{"from":1325685200000,"to":1325695200000,"label":"Showcasing","customClass":"ganttBlue"}]},{"name":"Sprint 2","desc":"Development","values":[{"from":1325695200000,"to":1328785200000,"label":"Development","customClass":"ganttGreen"}]},{"desc":"Showcasing","values":[{"from":1328785200000,"to":1328905200000,"label":"Showcasing","customClass":"ganttBlue"}]},{"name":"Release Stage","desc":"Training","values":[{"from":1330011200000,"to":1336611200000,"label":"Training","customClass":"ganttOrange"}]},{"desc":"Deployment","values":[{"from":1336611200000,"to":1338711200000,"label":"Deployment","customClass":"ganttOrange"}]},{"desc":"Warranty Period","values":[{"from":1336611200000,"to":1349711200000,"label":"Warranty Period","customClass":"ganttOrange"}]}]<br>
# 注意事项
鼠标悬停时显示的边框效果,可以自定义该属性 .fn-gantt-hint  修改该样式,
# 数据格式
```javascript
[
  {
    "name": "标题1",
    "desc": "标题1描述部分",
    "values": [
      {
        "from": 1323802400000,         //结束时间 毫秒
        "to": 1325685200000,           //开始时间 毫秒
        "desc": "鼠标悬停时的描述文字",
        "label": "甘特图项目的标题文字",
        "customClass": "ganttGreen"    //标记甘特图项目的颜色有ganttRed(#F9C4E1红色)、ganttGreen(#D8EDA3绿色)、ganttOrange(#FCD29A橙色),ganttPink(#ce74ce粉色)、ganttWathet(#7c7ce4浅蓝色)、ganttLightpink(#ffc0cb粉红色)、ganttDarkyellow(#ffff00深黄色)、ganttLightgrey(#a9a9a9浅灰色)如果不填写,默认为蓝色
      }
    ]
  }
]
```
