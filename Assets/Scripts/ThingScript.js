#pragma strict

public var userGUI: GameObject;
public var openThingWindow : boolean = false;

public var tempName: String="";
public var myName: String="c";
public var thingID: int;

public var thingWindow: Rect = Rect(10,10,300,300);

private var can_drag: boolean = false;
private var no_click : boolean = false;

private var first_click: float;
private var second_click: float;
private var delay: float = 0.5;

function Start () {

}

function OnMouseDown() {
	if(!no_click){
		no_click = true;
		first_click = Time.time;
		//Debug.Log("First click on "+thingName+".");
	}
	else if(no_click){
		no_click = false;
		second_click = Time.time;	
		if((second_click - first_click)<delay){
				Debug.Log("Double click on "+myName+"! "+openThingWindow);
				openThingWindow = true;
				no_click = false;
		}
	}
}

function OnMouseUp(){
	can_drag = false;
}

function OnGUI(){
	if(openThingWindow){
		thingWindow = GUI.Window(thingID,thingWindow,EditThing,"Editing Thing");
	}
}


function EditThing(windowID: int){
	GUI.Label(Rect(10,20,70,30),"Name");
	tempName = GUI.TextField(Rect(80,20,160,30),tempName,20);
	
	
	
	if (GUI.Button (Rect (thingWindow.width-160,thingWindow.height-40,70,30),"OK")){
			myName = tempName;
			openThingWindow = false;
		}

	if (GUI.Button (Rect (thingWindow.width-80,thingWindow.height-40,70,30),"Cancel")){
			openThingWindow = false;
		}
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}
