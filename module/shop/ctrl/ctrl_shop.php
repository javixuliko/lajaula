<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/lajaulav12/';
include($path . "module/shop/model/DAO_shop.php");

switch ($_GET['op']) {
    case 'list':
        include('module/shop/view/shop.html');
        break;

    case 'all_eventos':
        try {
            $limit  = (int) $_POST['limit'];
            $page   = (int) $_POST['page'];
            $offset = $limit * ($page - 1);
            $daoshop = new DAOShop();
            $Dates_Eventos = $daoshop->select_all_eventos($limit, $offset);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if (!empty($Dates_Eventos)) {
            echo json_encode($Dates_Eventos);
        } else {
            echo json_encode("error");
        }
        break;

    case 'filter':
        try {
            $limit  = (int) $_POST['limit'];
            $page   = (int) $_POST['page'];
            $offset = $limit * ($page - 1);
            $daoshop = new DAOShop();
            $Dates_Eventos = $daoshop->filter($_POST['filter'], $limit, $offset);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if (!empty($Dates_Eventos)) {
            echo json_encode($Dates_Eventos);
        } else {
            echo json_encode("error");
        }
        break;

    case 'filters':
        $dao = new DAOShop();
        echo json_encode($dao->get_filters());
        break;

    case 'details_eventos':
        try {
            $daoshop = new DAOShop();
            $Date_evento = $daoshop->select_one_evento($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_img = new DAOShop();
            $Date_images = $daoshop_img->select_imgs_evento($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_extras = new DAOShop();
            $Date_extras = $daoshop_extras->select_all_extras($_GET['id']);
        } catch (Exception $e) {
            $Date_extras = [];
        }
        if (!empty($Date_evento) && !empty($Date_images)) {
            $rdo = array();
            $rdo[0] = $Date_evento;
            $rdo[1] = $Date_images;
            $rdo[2] = $Date_extras;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;
    
    case 'count_events_related':
        $category = $_POST['category'];
        $current_id = (int) $_POST['current_id'];
        try {
            $dao = new DAOShop();
            $rdo = $dao->count_events_related($category, $current_id);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            echo json_encode($rdo);
        }
        break;

    case 'events_related':
        $category  = $_POST['category'];
        $loaded    = (int) $_POST['loaded'];
        $items     = (int) $_POST['items'];
        $current_id = (int) $_POST['current_id'];
        try {
            $dao = new DAOShop();
            $rdo = $dao->select_events_related($category, $loaded, $items, $current_id);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            echo json_encode($rdo);
        }
        break;

    default :
        include("module/exceptions/views/pages/error404.php");
        break;
}
