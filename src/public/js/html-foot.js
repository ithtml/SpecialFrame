/**
 * @preserve Html foot script
 * @modify  VinLexn 20170308
 * @description 全局HTML页面底部脚本代码
 * @version 0.0.1
 */
GPHY_Loader.sync(['//oss.ythuayi.com/web/public/js/libs/jquery.min.js'],function(){
        $("body").css("background-color","#000");
    if(typeof GPHY_PageCallback === "function"){
        GPHY_PageCallback();
    }
});