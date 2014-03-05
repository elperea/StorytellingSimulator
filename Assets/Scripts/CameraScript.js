#pragma strict


function Start () {

}

function Update () {
	transform.position = Vector3(UserGUI.cam_x,UserGUI.cam_y,UserGUI.cam_z);
	
}