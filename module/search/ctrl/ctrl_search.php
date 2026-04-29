<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/lajaulav12/';
include($path . "module/search/model/DAO_search.php");

switch ($_GET['op']) {
    case 'search_category';
        $homeQuery = new DAO_search();
        $selSlide = $homeQuery -> search_category();
        if (!empty($selSlide)) {
            echo json_encode($selSlide);
        }
        else {
            echo "error";
        }
        break;

    case 'search_all_fighters':
        $homeQuery = new DAO_search();
        $selSlide = $homeQuery->search_all_fighters();
        if (!empty($selSlide)) {
            echo json_encode($selSlide);
        } else {
            echo "error";
        }
        break;

    case 'search_fighters';
        $homeQuery = new DAO_search();
        $selSlide = $homeQuery -> search_fighters_by_category($_POST['category']);        
        if (!empty($selSlide)) {
            echo json_encode($selSlide);
        }
        else {
            echo "error";
        }
        break;

    case 'autocomplete';
    try{
        $dao = new DAO_search();
        if (!empty($_POST['category']) && empty($_POST['fighter'])){
            $rdo = $dao->select_city_by_category($_POST['complete'], $_POST['category']);
        }else if(!empty($_POST['category']) && !empty($_POST['fighter'])){
            $rdo = $dao->select_city_by_category_and_fighter($_POST['complete'], $_POST['category'], $_POST['fighter']);
        }else if(empty($_POST['category']) && !empty($_POST['fighter'])){
            $rdo = $dao->select_city_by_fighter($_POST['complete'], $_POST['fighter']);
        }else {
            $rdo = $dao->select_city($_POST['complete']);
        }
    }catch (Exception $e){
        echo json_encode("catch");
        exit;
    }
    if(!$rdo){
        echo json_encode("rdo!!!");
        exit;
    }else{
        $dinfo = array();
        foreach ($rdo as $row) {
            array_push($dinfo, $row);
        }
        echo json_encode($dinfo);
    }
    break; 
}