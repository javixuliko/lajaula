<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/lajaulav12/';
include($path . "model/connect.php");

class DAOHome
{
	function select_all_event_images()
	{
		// echo json_encode("select_all_user");
        // exit();
		$sql = "SELECT * FROM events_images ORDER BY id_event ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_fight()
	{
		$sql = "SELECT f.*, 
					f1.id_fighter AS id_fighter1, f1.fighter_name AS fighter1_name,
					f2.id_fighter AS id_fighter2, f2.fighter_name AS fighter2_name
				FROM fights f
				LEFT JOIN fighters f1 ON f.id_fighter_1 = f1.id_fighter
				LEFT JOIN fighters f2 ON f.id_fighter_2 = f2.id_fighter
				ORDER BY f.id_fight ASC";
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

	function select_most_visited($limit = 6) {
		$conexion = connect::con();
		$sql = "SELECT e.id_event, e.event_name, e.event_date, e.base_price, e.visits,
					c.city_name, v.venue_name, o.org_name,
					(SELECT image_url FROM events_images WHERE id_event = e.id_event LIMIT 1) AS image_url
				FROM events e
				LEFT JOIN cities c ON e.id_city = c.id_city
				LEFT JOIN venues v ON e.id_venue = v.id_venue
				LEFT JOIN organizations o ON e.id_organization = o.id_organization
				WHERE e.status = 'activo'
				ORDER BY e.visits DESC
				LIMIT :limit";
		$stmt = $conexion->prepare($sql);
		$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}
}