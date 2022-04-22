(function (root, factory) {
  /* CommonJS */
  if (typeof exports == "object") module.exports = factory();
  /* AMD module */
  else if (typeof define == "function" && define.amd) define(factory);

  /* 修改: 将 wwclassName 改为元素标识 */
  else root.wwclassName = factory();
}(this, function () {
  "use strict";

  /* 修改: 将 wwclassName 改为元素标识 */
  var wwclassName = /*INSBEGIN:WWCLSNAME*/
    "gantt"
    /*INSEND:WWCLSNAME*/
    ;

  // BEGIN: 加载依赖部分
  // 无依赖资源请使用本函数
  function loadDependence(fncallback) {
    if (typeof fncallback === "function") {
      fncallback();
    }
  }

  // 有依赖资源使用本函数
  // 使用方式:
  //  - 将"插件名"设置为具体插件标识, 通常就是插件名称, 不可为中文. 如: swiper
  //  - 如libs中无该插件, 则申请添加该插件
  //  - 将"插件路径"设置为具体插件路径, 通常为js文件, 省略路径中, 开头的"/"和结尾的".js". 如: "/libs/qrcodejs/qrcode.js" 应写为 "libs/qrcodejs/qrcode"
  //  - require 函数第一个参数, 传入依赖资源数组. 通常为config中配置的`插件名`. 可能还包括css文件
  //   - css文件的格式, 以"css!"开头, 省略路径开头的"/"和路径结尾的".css". 如: "/libs/noty/lib/noty.css" 应写为 ""css!libs/noty/lib/noty""
  //  - require 函数第二个参数是个回调函数, 该函数可能会传入参数. 参数与前面数组位置对应. 如不清楚, 自行查阅 (requirejs)[http://requirejs.org/] 文档

  var loadDependence = function (fncallback) {
    // 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
    if (!window.wwload.gantt) {
      window.wwload.gantt = "wait";
      requirejs.config({
        paths: {
          "gantt": "libs/jQuery_Gantt/js/jquery.fn.gantt", // 示例: libs/qrcodejs/qrcode
          // "gantt-css": "libs/jQuery_Gantt/css/style"
        }
      });
      require(["gantt"], function () {
        window.wwload.gantt = true;
        replace();
        fncallback();
      });
    } else if (window.wwload.gantt === "wait") {
      setTimeout(function () {
        loadDependence(fncallback);
      }, 100);
    } else {
      replace();
      fncallback();
    }

    function replace() {
      loadDependence = function (fncallback) {
        fncallback();
      };
    }
  };

  // END: 加载依赖部分

  /*
  //*/


  // BEGIN: 元素处理类初始化。下方函数只在依赖被加载完毕后，执行一次。后续无论处理多少个元素，不再调用本函数。
  var init = function () {
    // 重写初始化函数
    init = function () {
      return true;
    };
    $.wwclass.addEvtinHandler(wwclassName, evtInHandler);

    /*如果是逻辑元素，需要监听所有新加元素的时间，请打开下方注释。与process的区别是： process传入的参数一定有wwclass，而checker是更低级的事件处理，如果依赖wwclass，则事件在这里被处理，在process也会被处理。相当于被调用了两次，因此，checker处理的内容，不要包括wwclass，实际上，你可以利用checker构建一个wwclass体系。
     简单来说： 不用wwclass又希望有代码附加在某类(使用特定样式类，特定属性，特定标签等等)元素上，就使用本机制。
    //$newRootElement是新加入的元素。includeSelf指示是否包含$container自身
    function checker($newRootElement, includeSelf){
      //每次有新元素加入时，无论其类型，都会调用本方法。页面的根container($(".container[-fluid]"))
     //下文的例子，用来示例如何探测所有新加入的input并加以处理，类似的可以处理图片等等。
     var $inputElement = includeSelf ? $newRootElement.find("input[data-xxx]").addBack("input") : $newRootElement.find("[input]");
     if($inputElement.length > 0){ //新加入的元素有input。
     }
    }
    $.wwclass.getwwchecker().push(checker);
    //*/

    // 如有初始化动作, 请在下方添加
  };
  // END: 元素首次初始化处理


  /*
   * @description 元素平滑:
   * 1. 页面显示元素时,如果元素出现明显的闪现现象,需要做如下处理:
   *  1. 编辑器: 添加设置项:`禁用平滑加载`.对应属性`data-disabled-smooth`.该属性只允许设置值为true,否则元素删除该属性
   *  2. 编译期: 添加处理:当属性`data-disabled-smooth`值为`非true`时,元素添加平滑处理.平滑处理目的是使得页面元素的加载更加自然.例如swiper1:将图片添加类hide隐藏,只显示第一张图片,去除元素加载闪现现象
   *  3. 运行期: 添加处理:元素初始化完毕之后,即属性`data-x-inited`属性值为true时,平滑处理的相关元素恢复.例如swiper1:将图片hide类删除,恢复图片正常显示
   *  4. 示例元素可查看轮播图(swiper1)元素
   *  5. 类似imagefill等,平滑处理后,只遗留一个空壳,此时添加处理类`转圈`.加载完毕之后,去掉该类.
  //*/
  /*
   * @description 元素加载状态:
   * 页面显示元素时,如果元素出现明显的有无到有现象,需要做如下处理:
   *  1. 编辑器: 添加设置项:`禁用自动添加加载状态`.对应属性`data-noblock`.该属性只允许设置值为true,否则元素删除该属性
   *  2. 编译期: 添加处理:当属性`data-noblock`值为`非true`时,元素添加加载状态.即设置`data-block="true"`
   *  3. 运行期: 添加处理:元素初始化完毕之后,即属性`data-x-inited`属性值为true时,元素放开加载状态.即设置`data-block="false"`
   *  4. 需要处理的元素，类似view、imagefill、qrcode等元素效果
  //*/
  /* @description 错误信息输出格式:
   *   $.wwclass.syslog(message,category,severity,from,opt);
   * 参数解释：
   *   message; // 必填: 日志信息
   *   from // 选填: 日志来源. 默认值为: 当前页地址
   *   category // 选填: category,日志类型(日志分类标识). 默认值为: fe,即 front end
   *   severity //  选填: severity,日志级别. 默认值为: debug.可选值为:emergency,alert,critical,error,warning,notice,info,debug
   *   opt //选填：参数为json格式的字符串
  //*/
  /*
   * @description 初始化每个元素
   * @param {jQuery object} $ele - 需要初始化的元素
   */
  function gantt($ele) {
    var config = {};
    config.demoSource = eval($ele.attr("data--source"));        //数据源:json数组或者json的url地址
    config.navigate = $ele.attr("data-navigate");    //导航类型:按钮和滚动条  buttons/scroll
    config.scale = $ele.attr("data-scale");          //显示单元格: months/weeks/days/hours
    config.maxscale = $ele.attr("data-maxscale");    //这里是设置最大比例。这里总共有四个参数：months/weeks/days/hours
    config.minscale = $ele.attr("data-minscale");    //这里是设置最小比例。这里总共有四个参数：months/weeks/days/hours
    config.itemsPerPage = eval($ele.attr("data-itemsperpage"));  //设置每页显示项目数
    config.scrollToToday = eval($ele.attr("data-scrolltotoday"));   //设置是否滚动到当天   false/true

    $ele.find(".gantt").gantt({
      source: config.demoSource,            //数据源：json数组或者返回json的url地址
      navigate: config.navigate,     //导航类型：按钮和滚动条  scroll/buttons
      scale: config.scale,           //显示单元  months/weeks/days/hours
      maxScale: config.maxscale,            //视图缩放最大单元 months/weeks/days/hours
      minScale: config.minscale,             //视图缩放最小单元 months/weeks/days/hours
      itemsPerPage: config.itemsPerPage,       //每页显示项目数
      scrollToToday: config.scrollToToday,     //是否滚动到当天  false/true
      onItemClick: function (data) {    //点击时执行的操作，参数是被点击项目相关联的数据对象
        //alert("Item clicked - show some details");
      },
      onAddClick: function (dt, rowId) {      //在空白格子点击时执行的函数,第一个参数是点击点对应时间的毫秒数，第二个参数对象的id
        //alert("Empty space clicked - add an item!");
      },
      onRender: function () {       //甘特图渲染完毕后执行的操作
        if (window.console && typeof console.log === "function") {
          console.log("chart rendered");
        }
      }
    });


  }




  function processElement($ele) {
    /* 如果本元素废弃, 请解开此处注释, 并完成代码
    console.error("扩展元素(" + $ele.attr("data--wwclass") + ")已废弃, 找对应产品更换为xxx实现本功能", $ele);
    //*/
    // 对 $ele 元素做对应处理
    /* @TODO:重要提示:在元素初始化完毕时，需要更新属性`data-x-inited`的值为true，初始值(默认)为false，并同时发出事件wwinited
    $.wwclass.helper.updateProp($ele, "data-x-inited", true);
    $.wwclass.helper.anijsTrigger($ele, "wwinited");
    //*/
    /* @TODO:所有正式发布的元素，请认真排查代码:不要带测试输出，只有出现异常，才允许输出错误.需要输出时，请解开此处注释，并完成代码。函数说明请查看上方
    $.wwclass.syslog(message,category,severity,from,opt);
    //*/
    //当需要使用依赖插件时，使用下方代码来获取。主文件只加载最小插件集合。此时，把同步风格的后续代码，改为函数，因此，依赖越多，函数越多。多到一定程度(独立依赖单元大于10)，可以引入when,bluebird等promise库(不推荐)。
    //loadDependence_XXXX(fnCallback);
    setTimeout(function () {
      $.wwclass.helper.updateProp($ele, "data-x-inited", true);
      $ele.find(".gantt").removeClass("hidden");
    }, 100);
    setTimeout(function () {
      gantt($ele);
    }, 500)

  }

  /*
   * @description 析构每个元素, 也就是该元素该删除时的处理代码
   * @param {jQuery object} $ele - 需要处理的元素
   */
  function finalizeElement($ele) {
    // 对 $ele 元素做对应处理
    /*
    @TODO: 销毁元素，destroy
    @TODO: 存入$ele.data()中的值清空。
    $ele.data("存入的键","");
    //*/
  }

  // BEGIN: 监听属性处理
  /*
   * @description 监听函数, 元素的控制属性(data--)改变时处理
   * @param {jQuery object} $ele - 控制属性改变的元素
   * @param {string} attribute - 控制属性的名称
   * @param {string} value - 控制属性改变为何值
   */
  var evtInHandler = function ($ele, attribute, value) {
    switch (attribute) {
      case "data--source":
        var config = {};
        config.navigate = $ele.attr("data-navigate");    //导航类型:按钮和滚动条  buttons/scroll
        config.scale = $ele.attr("data-scale");          //显示单元格: weeks/days
        config.maxscale = $ele.attr("data-maxscale");    //这里是设置最大比例。这里总共有四个参数：months/weeks/days/hours
        config.minscale = $ele.attr("data-minscale");    //这里是设置最小比例。这里总共有四个参数：months/weeks/days/hours
        config.itemsPerPage = eval($ele.attr("data-itemsperpage"));  //设置每页显示项目数
        config.scrollToToday = eval($ele.attr("data-scrolltotoday"));   //设置是否滚动到当天   false/true

        if (value !== "" || value != "undefined") {
          value = JSON.parse(value);
          $ele.find(".gantt").gantt({
            source: value,         //数据源：json数组或者返回json的url地址
            navigate: config.navigate,     //导航类型：按钮和滚动条  scroll/buttons
            scale: config.scale,           //显示单元  weeks/days
            maxScale: config.maxscale,            //视图缩放最大单元 months/weeks/days/hours
            minScale: config.minscale,             //视图缩放最小单元 months/weeks/days/hours
            itemsPerPage: config.itemsPerPage,       //每页显示项目数
            scrollToToday: config.scrollToToday,     //是否滚动到当天  false/true
          });
        }
        // 处理动作
        break;
      case "finalize":
        finalizeElement($ele);
        break;
      default:
        console.info("监听到 \"" + $ele.attr("data-wwclass") + "\" 元素的 \"" + attribute + "\" 属性值改变为 \"" + value + "\", 但是无对应处理动作.");
    }
  };
  // END: 监听属性处理

  // 以下部分不需要修改
  if (!$.wwclass) {
    console.error("Can not use without wwclass.js");
    return false;
  }

  var ret = /*INSBEGIN:WWCLSHANDLER*/
    function (set) {
      if (set.length > 0) {
        loadDependence(function () {
          init();
          $(set).each(function (index, targetDom) {
            processElement($(targetDom));
          });
        });
      }
    }
    /*INSEND:WWCLSHANDLER*/
    ;

  return ret;

}));
