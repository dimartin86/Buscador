<?php 

$rango = explode(';', $_POST['rango']);
$data = file_get_contents('data-1.json');
$arrdatos = json_decode($data);

$arrdatos2 = array();

foreach ($arrdatos as $key => $value) {
	$precio = str_replace('$', '', $value->Precio);
	$precio = str_replace(',', '', $precio);

	if (!empty($_POST['ciudad']) && !empty($_POST['tipo'])) {
		if ($value->Ciudad == $_POST['ciudad'] && $value->Tipo == $_POST['tipo'] && $precio >= $rango[0] && $precio <= $rango[1]) {
			array_push($arrdatos2, array('dir'=> $value->Direccion, 'ciudad'=> $value->Ciudad, 'tel'=>$value->Telefono, 'cod_postal'=> $value->Codigo_Postal, 'tipo'=> $value->Tipo, 'precio'=> $value->Precio));
		}		
	}
	else if(!empty($_POST['ciudad'])){
		if ($value->Ciudad == $_POST['ciudad'] && $precio >= $rango[0] && $precio <= $rango[1]) {
			array_push($arrdatos2, array('dir'=> $value->Direccion, 'ciudad'=> $value->Ciudad, 'tel'=>$value->Telefono, 'cod_postal'=> $value->Codigo_Postal, 'tipo'=> $value->Tipo, 'precio'=> $value->Precio));
		}
	}
	else if (!empty($_POST['tipo'])) {
		if ($value->Tipo == $_POST['tipo'] && $precio >= $rango[0] && $precio <= $rango[1]) {
			array_push($arrdatos2, array('dir'=> $value->Direccion, 'ciudad'=> $value->Ciudad, 'tel'=>$value->Telefono, 'cod_postal'=> $value->Codigo_Postal, 'tipo'=> $value->Tipo, 'precio'=> $value->Precio));
		}
	}
	else if($precio >= $rango[0] && $precio <= $rango[1]){
		array_push($arrdatos2, array('dir'=> $value->Direccion, 'ciudad'=> $value->Ciudad, 'tel'=>$value->Telefono, 'cod_postal'=> $value->Codigo_Postal, 'tipo'=> $value->Tipo, 'precio'=> $value->Precio));
	}
}

echo json_encode($arrdatos2);

