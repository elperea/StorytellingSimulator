#pragma strict

public var userGUI: GameObject;
public var openCharacterWindow : boolean = false;

public var tempName: String="";
public var myName: String = "c";
public var characterID: int;

public var characterWindow: Rect = Rect(10,10,400,300);

private var can_drag : boolean = false;
private var no_click : boolean = false;

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

function OnGUI(){
	if(openCharacterWindow){
		characterWindow = GUI.Window(characterID,characterWindow,EditCharacter,"Editing Character");
	}
}

function OnMouseUp(){
	can_drag = false;
}

function OnMouseDrag()
{
	//transform.position = Vector3(Input.mousePosition.x,UserGUI.y,Input.mousePosition.z);
}

function EditCharacter(windowID: int){
	GUI.Label(Rect(10,20,70,30),"Name");
	tempName = GUI.TextField(Rect(80,20,160,30),tempName,20);
	
	if (GUI.Button (Rect (characterWindow.width-160,characterWindow.height-40,70,30),"OK")){
			myName = tempName;
			openCharacterWindow = false;
		}
	if (GUI.Button (Rect (characterWindow.width-80,characterWindow.height-40,70,30),"Cancel")){
			openCharacterWindow = false;
		}
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}
