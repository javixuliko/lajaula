<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/lajaulav12/';
include($path . "model/connect.php");

class DAOHome
{
	function select_all_event_images()
	{
		// echo json_encode("select_all_user");
        // exit();
		$sql = "SELECT * FROM events_images ORDER BY id_image ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_fight()
	{
		// echo json_encode("select_all_user");
        // exit();
		$sql = "SELECT * FROM fights ORDER BY id_fight ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_cities()
	{
		// echo json_encode("select_all_user");
        // exit();
		$sql = "SELECT * FROM cities ORDER BY id_city ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_venues()
	{
		$sql = "SELECT v.*, c.city_name FROM venues v 
				LEFT JOIN cities c ON v.id_city = c.id_city 
				ORDER BY v.id_venue ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_fighters()
	{
		// echo json_encode("select_all_user");
        // exit();
		$sql = "SELECT * FROM fighters ORDER BY id_fighter ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_categories()
	{
		$sql = "SELECT * FROM categories ORDER BY id_category ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

}