<?php
/**
 * Created by PhpStorm.
 * User: zhouqianyu
 * Date: 2017/10/19
 * Time: 上午12:04
 */

namespace App;
/**
 * Class CustomerController
 * @package App\Http\Controllers
 * @auther zhouqianyu
 */
class WebpackLoader
{
    private static $assets;
    private static $assetsPath = './assets/assets/public/dist/';
    public static function loadAssets(){
        $assetsFile = APP_PATH.'/assets/webpack-assets.json';
        if (!is_file($assetsFile)){
            return false;
        }
        $json = file_get_contents($assetsFile);
        self::$assets = json_decode($json,true);
        return self::$assets;
    }
    public static function load($name){
        $map = self::loadAssets();
        return self::$assetsPath.$map[$name]['js'];
    }
}