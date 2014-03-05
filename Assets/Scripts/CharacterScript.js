#pragma strict

static var openCharacterWindow : boolean = false;
private var no_click : boolean = false;
private var CharacterName: String="bar";
private var first_click: float;
private var second_click: float;
private var delay: float = 0.5;

function Start () {

}

function OnMouseDown() {
	if(!no_click){
		no_click = true;
		first_click = Time.time;
		//Debug.Log("First click on "+CharacterName+".");
	}
	else if(no_click){
		no_click = false;
		second_click = Time.time;	
		
		if((second_click - first_click)<delay){
			Debug.Log("Double click on "+CharacterName+"!");
			openCharacterWindow = true;
			no_click = false;
		}
	}
}

function OnMouseDrag()
{
	transform.position = Vector3(Input.mousePosition.x,UserGUI.y,Input.mousePosition.z);
}
	
