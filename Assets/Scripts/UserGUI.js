#pragma strict

var environment: GameObject;
var environment_icon: GameObject;
var character: GameObject;
var thing: GameObject;
var rosterWindow: Rect = Rect(10,10,300,300);
var thingWindow: Rect = Rect(10,10,300,300);
var characterWindow: Rect = Rect(10,10,300,300);
var openWindow : boolean = false;
var editWindow : boolean = false;

static var x=0;
static var y=0;
static var z=0;
static var max_x=0;
static var max_y=0;
static var max_z=0;
static var cam_x=-10;
static var cam_y=8;
static var cam_z=-10;
static var scene_count = 0;
static var curr_scene = 0;

static var top_margin = 30;
static var obj_count = 0;

static var obj_array = new Array();
function OnGUI () {
	
	//GUI.Box(Rect(Screen.width*4/5-10, 10,Screen.width/5,Screen.height-50),"Roster");
	if(GUI.Button(Rect(Screen.width*4/5,top_margin,Screen.width/6,30),"+")){
		openWindow = true;
	}
	if(openWindow){
		rosterWindow = GUI.Window(0,rosterWindow,AddEntity,"Adding an Entity");
	}
	if(thing.GetComponent(ThingScript).openThingWindow){
		thingWindow = GUI.Window(1,thingWindow,EditThing,"Editing Thing");
	}
	if(character.GetComponent(CharacterScript).openCharacterWindow){
		characterWindow = GUI.Window(2,characterWindow,EditCharacter,"Editing Character");
	}
	//GUI.Box(Rect(Screen.width/6, Screen.height*5/6-10,Screen.width*3/5,Screen.height/6-10),"");
	
	var top = 30;
	//for(var i=0, top = 30; i<obj_count; i++, top+=30) {
	 for(var i : int = 0; i < obj_count; i++){
	 	//check if obj is character or not..
	 	var object : GameObject;
	 	object = obj_array[i];
	 	var te = object.transform.gameObject.name;
	 	//newAddedGO.name == string.Format("{0}(Clone)", myNeedPrefab.name
	 	
	 	
	 	//Debug.Log(te);
	 	//Debug.Log("(Clone)Thing");
	 	
	 	if (te == "Thing(Clone)") {
	 		if(GUI.Button(Rect(Screen.width*4/5,top,Screen.width/6,30), thing.GetComponent(ThingScript).myName)) {
		 		editWindow = true;
		 	}
	 	} else {
		 	if(GUI.Button(Rect(Screen.width*4/5,top,Screen.width/6,30), character.GetComponent(CharacterScript).myName)) {
		 		editWindow = true;
		 	}
	 	}
	 	
	 	
	 	top = top + 40;
	}
	
	if(editWindow){
		rosterWindow = GUI.Window(1,thingWindow,EditThing,"Editing Thing");
	} 
	if(curr_scene>1){
		if(GUI.Button(Rect(Screen.width/6+100,Screen.height*5/6,50,Screen.height/6-30),"<<")){
			cam_z += -25;
			cam_x += 25;
			z += -25;
			x += 25;
			curr_scene--;
			Debug.Log(curr_scene);
		}
	}
	if(curr_scene<scene_count){
		if(GUI.Button(Rect(Screen.width/6+160,Screen.height*5/6,50,Screen.height/6-30),">>")){
			cam_z += 25;
			cam_x += -25;
			z += 25;
			x += -25;
			curr_scene++;
			Debug.Log(curr_scene);
		}
	}
	if(GUI.Button(Rect(Screen.width/6+10,Screen.height*5/6,50,Screen.height/6-30),"+")){
			max_z+=25;
			max_x+=-25;
			z = max_z;
			x = max_x;
			cam_z=max_z-10;
			cam_x=max_x-10;
			Instantiate(environment, Vector3(max_x,max_y,max_z),Quaternion.identity);
			scene_count = scene_count+1;
			curr_scene = scene_count;
			Debug.Log(curr_scene);
	}
}

function AddEntity(windowID: int){

		//top_margin = top_margin + 40;
		if (GUI.Button (Rect (10,20,150,30), "Create Character")){
			var tempchar : GameObject;
			tempchar = Instantiate(character,Vector3(x,y+1,z),Quaternion.identity);
			obj_array.Push(tempchar);
			obj_count++;
			top_margin = top_margin + 40;
			openWindow = false;
		}
		if (GUI.Button (Rect (10,60,150,30), "Create Thing")){
			var tempchar2 : GameObject;
			tempchar2 = Instantiate(thing,Vector3(x,y+1,z),Quaternion.identity);
			obj_array.Push(tempchar2);
			obj_count++;
			top_margin = top_margin + 40;
			openWindow = false;
		}
		if (GUI.Button (Rect (rosterWindow.width-80,rosterWindow.height-40,70,30),"Cancel")){
			openWindow = false;
		}
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}

function EditCharacter(windowID: int){

	if (GUI.Button (Rect (rosterWindow.width-80,rosterWindow.height-40,70,30),"Cancel")){
			character.GetComponent(CharacterScript).openCharacterWindow = false;
		}
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}

function EditThing(windowID: int){



	if (GUI.Button (Rect (rosterWindow.width-80,rosterWindow.height-40,70,30),"Cancel")){
			thing.GetComponent(ThingScript).openThingWindow = false;
			editWindow = false;
		}
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}
