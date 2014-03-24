#pragma strict

public var userGUI: GameObject;
public var Playwright: GameObject;
public var freshly_baked: boolean = false;

public var place: String="";
public var tempplace: String="";

public var myName: String="";
public var envID: int;
public var year: int;
public var day: int;
public var month: String=""; 

public var openEnvWindow: boolean = false;
public var envWindow: Rect = Rect(10,10,300,100);

function Start(){
	if(!freshly_baked){
	this.enabled = false;
	}
}

function OnGUI(){
	if(GUI.Button(Rect(Screen.width*1/2,Screen.height*5/6,100,Screen.height/6-20),"Edit Scene")){
		openEnvWindow = true;
	}
	if(openEnvWindow){
		envWindow = GUI.Window(envID,envWindow,EditEnv,"Editing Environment");
	}
}

function EditEnv(windowID: int){
	GUI.Label(Rect(10,20,70,30),"Place");
	//var placeEdit: TextEditor = GUIUtility.GetStateObject((TextEditor), GUIUtility.keyboardControl); 
	tempplace = GUI.TextField(Rect(80,20,160,30),tempplace,20);
	
	/*GUI.Label(Rect(10,60,70,30),"Sequence: "+Playwright.GetComponent(MotherScript).sequence);
	if(GUI.Button(Rect(10,100,200,30),"Switch to next scene for this sequence.>>")){
		var sceneRight: String = this.name + " switch right";
		Playwright.GetComponent(MotherScript).playSeq.push(sceneRight);
		Playwright.GetComponent(MotherScript).sequence++;
		userGUI.GetComponent(UserGUI).cam_z += 25;
		userGUI.GetComponent(UserGUI).cam_x += -25;
		userGUI.GetComponent(UserGUI).z += 25;
		userGUI.GetComponent(UserGUI).x += -25;
		openEnvWindow = false;
	}
	
	if(GUI.Button(Rect(10,140,200,30),"Switch to previous scene for this sequence.<<")){
		var sceneLeft: String = this.name + " switch left";
		Playwright.GetComponent(MotherScript).playSeq.push(sceneLeft);
		Playwright.GetComponent(MotherScript).sequence++;
		userGUI.GetComponent(UserGUI).cam_z += -25;
		userGUI.GetComponent(UserGUI).cam_x += 25;
		userGUI.GetComponent(UserGUI).z += -25;
		userGUI.GetComponent(UserGUI).x += 25;
		openEnvWindow = false;
	}*/
	
	if (GUI.Button (Rect (envWindow.width-160,envWindow.height-40,70,30),"OK")){
			place = tempplace;
			userGUI.GetComponent(UserGUI).disp_det = place;
			openEnvWindow = false;
	
		}
	
	if (GUI.Button (Rect (envWindow.width-80,envWindow.height-40,70,30),"Cancel")){
			openEnvWindow = false;
		}
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}

