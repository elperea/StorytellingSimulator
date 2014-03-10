#pragma strict

public var openCharacterWindow : boolean = false;
public var myName: String = "c";
private var can_drag : boolean = false;
private var no_click : boolean = false;
private var charRigidBody : Rigidbody;
private var charTransform : Transform;
private var first_click: float;
private var second_click: float;
private var delay: float = 0.5;
private var y_position : float;
private var gravitySetting : boolean;

function Start () {
}

function OnMouseDown() {
	if(!no_click){
		no_click = true;
		can_drag = true;
		first_click = Time.time;
		//Debug.Log("First click on "+CharacterName+".");
	}
	else if(no_click){
		no_click = false;
		second_click = Time.time;	
		if((second_click - first_click)<delay){
			Debug.Log("Double click on "+ myName +"! "+openCharacterWindow);
			openCharacterWindow = true;
			no_click = false;
		}
	}
}

function OnMouseUp(){
	can_drag = false;
}

function OnMouseDrag()
{
	//transform.position = Vector3(Input.mousePosition.x,UserGUI.y,Input.mousePosition.z);
}

	
	
