<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/lajaulav12/';
include($path . "model/connect.php");

class DAOShop{
    function select_all_eventos() {
        $sql = "SELECT e.*, c.city_name, c.country, v.venue_name, v.lat, v.longi, o.org_name, o.org_logo,
                    CONCAT('[\"', GROUP_CONCAT(DISTINCT ei.image_url SEPARATOR '\",\"'), '\"]') AS images,
                    GROUP_CONCAT(DISTINCT cat.cat_name SEPARATOR ',') AS categories
                FROM events e
                LEFT JOIN cities c ON e.id_city = c.id_city
                LEFT JOIN venues v ON e.id_venue = v.id_venue
                LEFT JOIN organizations o ON e.id_organization = o.id_organization
                LEFT JOIN events_images ei ON e.id_event = ei.id_event
                LEFT JOIN event_categories ec ON e.id_event = ec.id_event
                LEFT JOIN categories cat ON ec.id_category = cat.id_category
                LEFT JOIN event_fighters ef ON e.id_event = ef.id_event
                LEFT JOIN fighters f ON ef.id_fighter = f.id_fighter
                WHERE e.status = 'activo'
                GROUP BY e.id_event ORDER BY e.event_date ASC";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convertir el JSON string en array PHP
        $result = array_map(function($row) {
            $row['images'] = json_decode($row['images'], true);
            return $row;
        }, $rows);

        connect::close($conexion);
        return $result;
    }

    function filter($filter) {
        $sql = "SELECT e.*, c.city_name, c.country, v.venue_name, v.lat, v.longi, o.org_name, o.org_logo,
                    CONCAT('[\"', GROUP_CONCAT(DISTINCT ei.image_url SEPARATOR '\",\"'), '\"]') AS images,
                    GROUP_CONCAT(DISTINCT cat.cat_name SEPARATOR ',') AS categories
                FROM events e
                LEFT JOIN cities c ON e.id_city = c.id_city
                LEFT JOIN venues v ON e.id_venue = v.id_venue
                LEFT JOIN organizations o ON e.id_organization = o.id_organization
                LEFT JOIN events_images ei ON e.id_event = ei.id_event
                LEFT JOIN event_categories ec ON e.id_event = ec.id_event
                LEFT JOIN categories cat ON ec.id_category = cat.id_category
                LEFT JOIN event_fighters ef ON e.id_event = ef.id_event
                LEFT JOIN fighters f ON ef.id_fighter = f.id_fighter
                WHERE e.status = 'activo'";

        $tableMap = [
            'fighters'   => 'f.id_fighter',
            'categories' => 'cat.id_category',
            'cities'     => 'c.id_city',
            'price_max'  => 'e.base_price',
        ];

        $params = [];
        foreach ($filter as $i => $f) {
            $tabla = $f[0];
            $valor = $f[1];

            if (!isset($tableMap[$tabla])) continue;

            if ($tabla === 'price_max') {
                $placeholder = ":param{$i}";
                $sql .= " AND CAST(e.base_price AS UNSIGNED) <= $placeholder";
                $params[$placeholder] = intval($valor);
                continue;
            }

            $columna = $tableMap[$tabla];

            if (is_array($valor)) {
                $valor = array_map('intval', $valor);

                if (!empty($valor)) {
                    $placeholders = [];
                    foreach ($valor as $k => $v) {
                        $ph = ":param{$i}_{$k}";
                        $placeholders[] = $ph;
                        $params[$ph] = $v;
                    }

                    $sql .= " AND $columna IN (" . implode(',', $placeholders) . ")";
                }
            }

            else {
                $placeholder = ":param{$i}";
                $sql .= " AND $columna = $placeholder";
                $params[$placeholder] = intval($valor);
            }
        }

        $sql .= " GROUP BY e.id_event ORDER BY e.event_date ASC";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convertir el JSON string en array PHP
        $result = array_map(function($row) {
            $row['images'] = json_decode($row['images'], true);
            return $row;
        }, $rows);

        connect::close($conexion);
        return $result;
        //return $sql;
    }

    function get_filters() {
        $conexion = connect::con();

        $sql = "SELECT * FROM filters ORDER BY id_filter ASC";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $filters = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $sql2 = "SELECT * FROM filters_values ORDER BY id_filter ASC";
        $stmt2 = $conexion->prepare($sql2);
        $stmt2->execute();
        $values = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        connect::close($conexion);

        return [
            "filters" => $filters,
            "values" => $values
        ];
    }

	function select_one_evento($id) {
        $sql = "SELECT e.*, c.city_name, c.country, v.venue_name, v.address, v.capacity, v.lat, v.longi,
                       o.org_name, o.org_logo
                FROM events e
                LEFT JOIN cities c ON e.id_city = c.id_city
                LEFT JOIN venues v ON e.id_venue = v.id_venue
                LEFT JOIN organizations o ON e.id_organization = o.id_organization
                WHERE e.id_event = :id";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

	function select_imgs_evento($id) {
        $sql = "SELECT id_image, id_event, image_url
                FROM events_images
                WHERE id_event = :id";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function select_all_extras($id) {
        $sql = "SELECT ex.id_extra, ex.name, ex.icon
                FROM extras ex
                INNER JOIN events_extras ee ON ex.id_extra = ee.id_extra
                WHERE ee.id_event = :id";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
}
