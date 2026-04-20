<?php
    $page = $_GET['page'] ?? 'homepage'; // Si no existe, usa 'homepage' por defecto

    switch($page){
        case "homepage":
            $_GET['op'] = 'view';
            include("module/home/controller/controller_home.php");
            break;
        case "shop":
            $_GET['op'] = 'list';
            include("module/shop/ctrl/ctrl_shop.php");
            break;
        case "404":
            include("view/inc/error" . $page . ".php");
            break;
        case "503":
            include("view/inc/error" . $page . ".php");
            break;
        default:
            $_GET['op'] = 'view';
            include("module/home/controller/controller_home.php");
            break;
    }
?>