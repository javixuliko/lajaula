<?php
// $data = 'hola crtl home';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/lajaulav12/';
include($path . "module/home/model/DAOHome.php");

@session_start();

switch ($_GET['op']) {
    case 'view':
        // $data = 'hola crtl home view';
        // die('<script>console.log('.json_encode( $data ) .');</script>');
        include("module/home/view/home.html");
        break;

    case 'homePageEventsImages':
        // echo json_encode("homePageCategory");
        // exit();
        try{
            $daohome = new DAOHome();
            $SelectEventImage = $daohome->select_all_event_images();
            // echo json_encode($SelectCategory);
            // exit();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectEventImage)){
            echo json_encode($SelectEventImage); 
        }
        else{
            echo json_encode("error");
        }
        break;

    case 'homePageFights':
        // echo json_encode("homePageCategory");
        // exit();
        try{
            $daohome = new DAOHome();
            $SelectFight = $daohome->select_all_fight();
            // echo json_encode($SelectCategory);
            // exit();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectFight)){
            echo json_encode($SelectFight); 
        }
        else{
            echo json_encode("error");
        }
        break;

    case 'homePageFighters':
        // echo json_encode("homePageCategory");
        // exit();
        try{
            $daohome = new DAOHome();
            $SelectFighter = $daohome->select_all_fighters();
            // echo json_encode($SelectCategory);
            // exit();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectFighter)){
            echo json_encode($SelectFighter); 
        }
        else{
            echo json_encode("error");
        }
        break;

    case 'homePageCategories':
        // echo json_encode("homePageCategory");
        // exit();
        try{
            $daohome = new DAOHome();
            $SelectCategory = $daohome->select_all_categories();
            // echo json_encode($SelectCategory);
            // exit();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectCategory)){
            echo json_encode($SelectCategory); 
        }
        else{
            echo json_encode("error");
        }
        break;

    case 'homePageCities':
        // echo json_encode("homePageCategory");
        // exit();
        try{
            $daohome = new DAOHome();
            $SelectCity = $daohome->select_all_cities();
            // echo json_encode($SelectCategory);
            // exit();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectCity)){
            echo json_encode($SelectCity); 
        }
        else{
            echo json_encode("error");
        }
        break;

    case 'homePageVenues':
        // echo json_encode("homePageCategory");
        // exit();
        try{
            $daohome = new DAOHome();
            $SelectVenue = $daohome->select_all_venues();
            // echo json_encode($SelectCategory);
            // exit();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectVenue)){
            echo json_encode($SelectVenue); 
        }
        else{
            echo json_encode("error");
        }
        break;

    default:
        include("view/inc/error404.php");
        break;
}