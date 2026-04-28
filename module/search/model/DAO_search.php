<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/lajaulav12/';
include($path . "model/connect.php");

class DAO_search {

    function search_category() {
        $conexion = connect::con();
        $stmt = $conexion->prepare(
            "SELECT id_category, cat_name 
            FROM categories 
            ORDER BY id_category ASC"
        );
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function search_fighters_by_category($category) {
        $conexion = connect::con();
        $stmt = $conexion->prepare(
            "SELECT id_fighter, fighter_name 
            FROM fighters 
            WHERE id_category = :category
            ORDER BY fighter_name ASC"
        );
        $stmt->bindParam(':category', $category);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function select_city($complete) {
        $like = $complete . '%';
        $conexion = connect::con();
        $stmt = $conexion->prepare(
            "SELECT id_city, city_name 
            FROM cities 
            WHERE city_name LIKE :complete 
            ORDER BY city_name ASC"
        );
        $stmt->bindParam(':complete', $like);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function select_city_by_category($complete, $category) {
        $like = $complete . '%';
        $conexion = connect::con();
        $stmt = $conexion->prepare(
            "SELECT DISTINCT ci.id_city, ci.city_name
            FROM cities ci
            INNER JOIN events e ON e.id_city = ci.id_city
            INNER JOIN fights f ON f.id_event = e.id_event
            WHERE f.id_category = :category
            AND ci.city_name LIKE :complete
            ORDER BY ci.city_name ASC"
        );
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':complete', $like);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function select_city_by_fighter($complete, $fighter) {
        $like = $complete . '%';
        $conexion = connect::con();
        $stmt = $conexion->prepare(
            "SELECT DISTINCT ci.id_city, ci.city_name
            FROM cities ci
            INNER JOIN events e ON e.id_city = ci.id_city
            INNER JOIN fights f ON f.id_event = e.id_event
            WHERE (f.id_fighter_1 = :fighter OR f.id_fighter_2 = :fighter)
            AND ci.city_name LIKE :complete
            ORDER BY ci.city_name ASC"
        );
        $stmt->bindParam(':fighter', $fighter);
        $stmt->bindParam(':complete', $like);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function select_city_by_category_and_fighter($complete, $category, $fighter) {
        $like = $complete . '%';
        $conexion = connect::con();
        $stmt = $conexion->prepare(
            "SELECT DISTINCT ci.id_city, ci.city_name
            FROM cities ci
            INNER JOIN events e ON e.id_city = ci.id_city
            INNER JOIN fights f ON f.id_event = e.id_event
            WHERE f.id_category = :category
            AND (f.id_fighter_1 = :fighter OR f.id_fighter_2 = :fighter)
            AND ci.city_name LIKE :complete
            ORDER BY ci.city_name ASC"
        );
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':fighter', $fighter);
        $stmt->bindParam(':complete', $like);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function select_city($complete){
        $like = $complete . '%';
        $conexion = connect::con();
        $stmt = $conexion->prepare("SELECT *
            FROM car c
            WHERE c.city LIKE :complete");
        $stmt->bindParam(':complete', $like);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}